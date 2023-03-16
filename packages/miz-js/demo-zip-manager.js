/* global zip, document, URL, MouseEvent, alert, prompt, Range, getSelection */

(() => {

	if (typeof TransformStream == "undefined") {
		const script = document.createElement("script");
		script.src = "lib/web-streams-polyfill.min.js";
		document.body.appendChild(script);
	}

	const model = (() => {

		const fs = new zip.fs.FS();

		return {
			addDirectory(name, parent) {
				return parent.addDirectory(name);
			},
			addFile(name, blob, parent) {
        const exists = fs.getChildByName(name);
        
        if (exists) {
          const overwrite = confirm(`File ${name} already exists, overwrite ?`)
          if(overwrite) this.remove(exists);
          else return;
        } 

        return parent.addBlob(name, blob);
			},
			addFileSystemEntry(directoryEntry, parent) {
        console.log('addFileSystemEntry', directoryEntry);
				return parent.addFileSystemEntry(directoryEntry);
			},
			getRoot() {
				return fs.root;
			},
			getById(id) {
				return fs.getById(id);
			},
			remove(entry) {
				fs.remove(entry);
			},
			move(entry, target) {
        console.log('move', target);

				fs.move(entry, target);
			},
			rename(entry, name) {
				entry.rename(name);
			},
			async exportZip(entry, options) {
        console.log('exportZip', entry);

				const blob = await entry.exportBlob(options);
				return URL.createObjectURL(blob);
			},
			async importZip(blob, targetEntry, options) {
        console.log('importZip', targetEntry);

				await targetEntry.importBlob(blob, options);
			},
      async getData(entry, options) {
        const data = await entry.getData();
        return data;
      },
			async getBlobURL(entry, options) {
				const blob = await entry.getBlob(zip.getMimeType(entry.filename), options);
				return URL.createObjectURL(blob);
			}
		};
	})();

	(() => {
		const progressExport = document.getElementById("progress-export-zip");
		const tree = document.getElementById("tree");
		const listing = document.getElementById("listing");
		const editorWindow = document.getElementById("editor");
		const separator = document.getElementById("separator");
		const separator2 = document.getElementById("separator2");
		let selectedDirectory, selectedFile, selectedLabel, selectedLabelValue, selectedDrag, hoveredElement, movingSeparator, movingSeparator2;

    // files
		listing.addEventListener("click", async event => {
			const target = event.target;
			if (target.className == "file-label") {
				event.preventDefault();
				const li = target.parentElement;
				if (!li.classList.contains("selected")) {
					selectFile(target.parentElement);
				} else {
					li.draggable = false;
					let state;
					try {
						state = await editName(target, selectedFile);
					} catch (error) {
						// ignored
					}
					if (state == "deleted") {
						resetSelectedFile();
					}
					if (state == "canceled" || state == "deleted") {
						refreshListing();
					}
				}
			} else {
				refreshListing();
			}
		}, false);

    // directories
		tree.addEventListener("click", async event => {
			const target = event.target;
			if (target.className == "dir-label") {
				const details = target.parentElement.parentElement.parentElement;
				event.preventDefault();
				if (!details.classList.contains("selected")) {
					selectDirectory(details);
				} else if (getFileNode(selectedDirectory).parent) {
					details.draggable = false;
					let state;
					try {
						state = await editName(target, selectedDirectory);
					} catch (error) {
						// ignored
					}
					if (state == "deleted") {
						resetSelectedDir();
						selectDirectory(details.parentElement);
						refreshTree();
						refreshListing();
					} else if (state == "canceled") {
						refreshTree();
					}
				}
			} else if (target.className == "dir-summary") {
				const node = getFileNode(target.parentElement);
				// node.expanded = !node.expanded;
				if (selectedDirectory) {
					const selectedNode = getFileNode(selectedDirectory);
					if (selectedNode.isDescendantOf(node)) {
						resetSelectedDir();
					}
				}
			}
		}, false);

		tree.addEventListener("drop", async event => {
			const target = getFileElement(event.target);
			stopEvent(event);
			if (target) {
				const targetNode = getFileNode(target);
				if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
					const item = event.dataTransfer.items[0];
					const file = event.dataTransfer.files[0];
          
					if (item && file && !item.type.includes("miz") && !file.name.endsWith(".miz") && item.webkitGetAsEntry !== undefined) {
						const fileEntry = await item.webkitGetAsEntry();
						const entry = await model.addFileSystemEntry(fileEntry, targetNode);
            console.log('drop', entry);
						if (fileEntry.isDirectory) {
							selectDirectory(target);
							expandTree(targetNode);
						}
						refreshTree();
						refreshListing();
						if (fileEntry.isDirectory) {
							selectDirectory(findFileElement(entry.id));
						}
					} else {
						const file = item.getAsFile();
						try {
							await model.importZip(file, targetNode);
						} catch (error) {
							alert(error);
						}
						selectDirectory(target);
						expandTree(targetNode);
						refreshTree();
						refreshListing();
					}
				} else {
					const srcNode = getFileNode(selectedDrag);
					if (targetNode != srcNode && targetNode != srcNode.parent && !targetNode.isDescendantOf(srcNode)) {
						model.move(srcNode, targetNode);
						targetNode.expanded = target.open = true;
						refreshTree();
						refreshListing();
					} else {
						hoveredElement.classList.remove("drag-over");
					}
				}
			}
		}, false);
		tree.addEventListener("dragover", event => {
			if (hoveredElement) {
				hoveredElement.classList.remove("drag-over");
			}
			hoveredElement = getFileElement(event.target);
			if (hoveredElement) {
				hoveredElement.classList.add("drag-over");
			}
			stopEvent(event);
		}, false);
		tree.addEventListener("dragstart", event => {
			event.dataTransfer.effectAllowed = "copy";
			event.dataTransfer.setData("Text", "");
			selectedDrag = selectedDirectory;
		}, false);

		listing.addEventListener("drop", event => {
			if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
				const entries = Array.from(event.dataTransfer.files).map(file => model.addFile(file.name, file, getFileNode(selectedDirectory)));

				refreshListing();
				selectFile(findFileElement(entries[0].id));
			}
			stopEvent(event);
		}, false);
		listing.addEventListener("dragover", stopEvent, false);
		listing.addEventListener("dragstart", event => {
			event.dataTransfer.effectAllowed = "copy";
			event.dataTransfer.setData("Text", "");
			if (!event.dataTransfer || !event.dataTransfer.files || !event.dataTransfer.files.length) {
				selectedDrag = selectedFile;
			}
		}, false);

		document.addEventListener("dragstart", event => {
			if (event.target == separator) {
				stopEvent(event);
			}
			if (event.target == separator2) {
				stopEvent(event);
			}
		});

		separator.addEventListener("mousedown", () => {
			movingSeparator = true;
		}, false);
		separator2.addEventListener("mousedown", () => {
			movingSeparator2 = true;
		}, false);

		separator.parentElement.addEventListener("mousemove", event => {
			if (movingSeparator) {
				const treeWidth = event.clientX - tree.parentElement.offsetLeft;
				const explorerWidth = tree.parentElement.parentElement.offsetWidth;
				tree.parentElement.style.setProperty("max-width", (treeWidth - 4) + "px");
				listing.parentElement.style.setProperty("max-width", (explorerWidth - treeWidth - 4) + "px");
			}
		}, false);
		separator2.parentElement.addEventListener("mousemove", event => {
			if (movingSeparator2) {
				const treeWidth = event.clientX - tree.parentElement.offsetLeft;
				const explorerWidth = listing.parentElement.parentElement.offsetWidth;
				listing.parentElement.style.setProperty("max-width", (treeWidth - 4) + "px");
				editorWindow.style.setProperty("max-width", (explorerWidth - treeWidth - 4) + "px");
			}
		}, false);
		
    document.addEventListener("mouseup", () => {
			movingSeparator = false;
		}, false);
    document.addEventListener("mouseup", () => {
			movingSeparator2 = false;
		}, false);

		progressExport.style.opacity = 0;
		expandTree();
		refreshTree();

		function getFileNode(element) {
			return element ? model.getById(element.dataset.fileId) : model.getRoot();
		}

		function findFileElement(id) {
			return document.querySelector("[data-file-id=\"" + id + "\"]");
		}

		function getFileElement(element) {
			while (element && !element.dataset.fileId) {
				element = element.parentElement;
			}
			return element;
		}

		function stopEvent(event) {
			event.stopPropagation();
			event.preventDefault();
		}

		function expandTree(node) {
			if (!node) {
				node = model.getRoot();
			}
			if (node.directory) {
				node.expanded = true;
				node.children.forEach(child => expandTree(child));
			}
		}

		function onexport(isFile) {
			return async event => {
				const target = event.target;
				if (!target.download) {
					const node = getFileNode(isFile ? selectedFile : selectedDirectory);
					const filename = prompt("Filename", isFile ? node.name : node.parent ? node.name + ".miz" : "example.miz");
					if (filename) {
						progressExport.style.opacity = 1;
						progressExport.value = 0;
						progressExport.max = 0;
						let blobURL;
						try {
							blobURL = isFile ?
								await model.getBlobURL(node, { onprogress, bufferedWrite: true }) :
								await model.exportZip(node, { onprogress, relativePath: true, bufferedWrite: true });
						} catch (error) {
							alert(error);
						}
						if (blobURL) {
							const clickEvent = new MouseEvent("click");
							progressExport.style.opacity = 0;
							target.href = blobURL;
							target.download = filename;
							target.dispatchEvent(clickEvent);
							URL.revokeObjectURL(blobURL);
							target.href = "";
							target.download = "";
							event.preventDefault();
						}
					}
				}
			};

			function onprogress(index, end) {
				progressExport.value = index;
				progressExport.max = end;
			}
		}


    async function editFile() {
			const node = getFileNode(selectedFile);
      
      const entry = await model.getData(node);
      const textWriter = new zip.TextWriter();

      // Entry or Blob
      let text = entry.getData ?
       await entry.getData(textWriter)
       :
       await entry.text()

      editor.session.setValue(text);
    }

		function onnewDirectory() {
			let name = ("New Folder");
			if (getFileNode(selectedDirectory).getChildByName(name)) {
				let index = 2;
				while (getFileNode(selectedDirectory).getChildByName(name + " (" + index + ")")) {
					index++;
				}
				name += " (" + index + ")";
			}
			if (name) {
				try {
					const entry = model.addDirectory(name, getFileNode(selectedDirectory));
					refreshTree();
					selectDirectory(findFileElement(entry.id));
					getFileNode(selectedDirectory).expanded = selectedDirectory.open = true;
				} catch (error) {
					alert(error);
				}
			}
		}

		function selectFile(fileElement) {
      
      resetSelectedFile();
			resetSelectedLabel(true);
			fileElement.className = "selected";
			fileElement.draggable = true;
			selectedFile = fileElement;

      // open selected file in editor
      setTimeout(() => {
        editFile(fileElement);
      }, 100)
		}

		function selectDirectory(directoryElement) {
			resetSelectedDir();
			resetSelectedLabel(true);
			directoryElement.className = "selected";
			directoryElement.draggable = true;
			selectedDirectory = directoryElement;
			refreshListing();
		}

		function resetSelectedFile() {
			if (selectedFile) {
				selectedFile.classList.remove("selected");
				selectedFile.draggable = false;
			}
		}

		function resetSelectedDir() {
			if (selectedDirectory) {
				selectedDirectory.classList.remove("selected");
				selectedDirectory.draggable = false;
				resetSelectedFile();
			}
		}

		function resetSelectedLabel(resetValue) {
			if (selectedLabel) {
				selectedLabel.contentEditable = "false";
				selectedLabel.scrollLeft = 0;
				selectedLabel.blur();
				if (resetValue) {
					selectedLabel.textContent = selectedLabelValue;
				}
				selectedLabel = null;
			}
		}

		async function editName(labelElement, nodeElement) {
			if (labelElement.contentEditable != "true") {
				labelElement.contentEditable = "true";
				const range = new Range();
				range.setStartBefore(labelElement.childNodes[0]);
				range.setEndAfter(labelElement.childNodes[0]);
				const selection = getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				labelElement.focus();
				selectedLabel = labelElement;
				selectedLabelValue = labelElement.textContent;
				return new Promise(resolve => {
					const node = getFileNode(nodeElement);
					labelElement.onkeydown = event => {
						const cancel = event.keyCode == 27;
						if (event.keyCode == 13 || cancel) {
							if (labelElement.textContent) {
								resetSelectedLabel(cancel);
								model.rename(node, labelElement.textContent);
							} else {
								model.remove(node);
								resolve("deleted");
							}
							event.preventDefault();
							resolve(cancel ? "canceled" : "");
						}
					};
				});
			}
		}

    // directories
		function refreshTree(node, element) {
			let details;
			if (!node) {
				node = model.getRoot();
				element = tree;
				element.innerHTML = "";
			}
			if (node.directory) {
				details = document.createElement("details");
				const summary = document.createElement("summary");
				const summaryContent = document.createElement("span");
				const label = document.createElement("span");
				const newDirectory = document.createElement("a");
				const exportDirectory = document.createElement("a");
				details.dataset.fileId = node.id;
				details.open = true // node == model.getRoot() || node.expanded;
				if (selectedDirectory && selectedDirectory.dataset.fileId == node.id) {
					selectDirectory(details);
				}
				summaryContent.classList.add("dir-summary-content");
				summary.classList.add("dir-summary");
				if (!node.children.find(child => child.directory)) {
					summary.classList.add("dir-summary-empty");
				}
				if (node.parent) {
					label.textContent = '🗀' + node.name;
				} else {
					label.textContent = "<mission>";
				}
				label.className = "dir-label";
				newDirectory.className = "newdir-button button";
				newDirectory.title = "Create a new folder";
				newDirectory.textContent = "+";
				newDirectory.addEventListener("click", onnewDirectory, false);
				exportDirectory.className = "save-button button";
				exportDirectory.title = "Download .miz";
				exportDirectory.textContent = "⇩";
				exportDirectory.addEventListener("click", onexport(false), false);
				summary.appendChild(summaryContent);
				summaryContent.appendChild(label);
				summaryContent.appendChild(newDirectory);
				summaryContent.appendChild(exportDirectory);
				details.appendChild(summary);
				element.appendChild(details);
			}
			if (!node.parent) {
				if (node.children.length == 0) {
					tree.parentElement.classList.add("empty");
					selectDirectory(details);
				} else {
					tree.parentElement.classList.remove("empty");
				}
			}
			node.children
				.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
				.forEach(child => refreshTree(child, details));
		}

    // files
		function refreshListing() {
			const node = getFileNode(selectedDirectory);
			listing.innerHTML = "";
			node.children
				.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
				.forEach(child => {
					if (!child.directory) {
						const li = document.createElement("li");
						const label = document.createElement("span");
						const exportFile = document.createElement("a");
						li.dataset.fileId = child.id;
						if (selectedFile && selectedFile.dataset.fileId == child.id) {
							selectFile(li);
						}
						label.className = "file-label";
						label.textContent = child.name;
						exportFile.className = "save-button button";
						exportFile.title = "Download this file";
						exportFile.textContent = "⇩";
						exportFile.addEventListener("click", onexport(true), false);
						li.appendChild(label);
						li.appendChild(exportFile);
						listing.appendChild(li);
					}
				});
		}
	})();

})();