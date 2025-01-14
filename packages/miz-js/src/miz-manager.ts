/* global zip, document, URL, MouseEvent, alert, prompt, Range, getSelection */
// adapted from zip.js demo
// TODO: needs complete rewrite

import * as zip from "@zip.js/zip.js";
import * as ace from "../lib/ace/ace.js";
window.define = ace.define;
import "../lib/ace/theme-cobalt.js";
import "../lib/ace/mode-lua.js";
import { downloadBlob } from "@dcs-web-editor-mono/utils";

export let fs = new zip.fs.FS();
export const fileSystem = fs;

let aceEditor;
let selectedDirectory,
  selectedFile,
  selectedLabel,
  selectedLabelValue,
  selectedDrag,
  hoveredElement,
  movingSeparator,
  movingSeparator2;
let progressExport,
  tree,
  listing,
  editorWindow,
  previews,
  saveEditor,
  separator,
  separator2,
  imagePreview,
  imageEdit,
  audioPreview,
  htmlPreview;
export const model = {
  addDirectory(name, parent) {
    return parent.addDirectory(name);
  },
  addFile(name, blob, parent) {
    const exists = parent.getChildByName(name);

    if (exists) {
      const overwrite = confirm(`File ${name} already exists, overwrite ?`);
      if (overwrite) this.remove(exists);
      else return;
    }

    return parent.addBlob(name, blob);
  },
  addFileSystemEntry(directoryEntry, parent) {
    return parent.addFileSystemEntry(directoryEntry);
  },
  getRoot() {
    return fs.root;
  },
  getById(id) {
    return fs.getById(id);
  },
  async remove(entry) {
    await fs.remove(entry);
  },
  move(entry, target) {
    console.log("move", target);

    fs.move(entry, target);
  },
  rename(entry, name) {
    entry.rename(name);
  },
  async exportZip(entry, options) {
    console.log("exportZip", entry);

    const blob = await entry.exportBlob(options);
    return URL.createObjectURL(blob);
  },
  async importZip(blob, targetEntry = model.getRoot(), options) {
    console.log("importZip", blob, targetEntry);

    await targetEntry.importBlob(blob, options);
  },
  async getData(entry, options) {
    const data = await entry.getData();
    return data;
  },
  async getBlob(entry, options) {
    return await entry.exportBlob(options);
  },
  async getBlobURL(entry, options, type?) {
    const blob = await entry.getBlob(type ?? zip.getMimeType(entry.filename), options);
    return URL.createObjectURL(blob);
  },
};

export function reset() {
  fs = new zip.fs.FS();
  setTimeout(() => {
    selectedFile = null;
    selectedDirectory = null;
    showPreview(null);
    refreshTree();
    refreshListing();
  }, 100);
  return fs;
}

export function initialize(_aceEditor, editorId) {
  if (aceEditor) {
    console.warn("ACE already initialized");
    return;
  }
  aceEditor = _aceEditor;

  // polyfill
  if (typeof TransformStream == "undefined") {
    const script = document.createElement("script");
    script.src = "lib/web-streams-polyfill.min.js";
    document.body.appendChild(script);
  }

  progressExport = document.getElementById("progress-export-zip");
  tree = document.getElementById("tree");
  listing = document.getElementById("listing");
  editorWindow = document.getElementById(editorId);
  previews = document.getElementById("previews");
  saveEditor = document.getElementById("save-editor");
  separator = document.getElementById("separator");
  separator2 = document.getElementById("separator2");
  imagePreview = document.getElementById("image-preview");
  imageEdit = document.getElementById("image-edit");
  htmlPreview = document.getElementById("html-preview");
  audioPreview = document.getElementById("audio-preview");

  // files
  listing.addEventListener(
    "click",
    async (event) => {
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
    },
    false
  );

  // directories
  tree.addEventListener(
    "click",
    async (event) => {
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
    },
    false
  );

  // Drag & Drop Event
  tree.addEventListener(
    "drop",
    async (event) => {
      const target = getFileElement(event.target);
      stopEvent(event);
      if (target) {
        const targetNode = getFileNode(target);
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
          const item = event.dataTransfer.items[0];
          const file = event.dataTransfer.files[0];

          if (
            item &&
            file &&
            !item.type.includes("miz") &&
            !file.name.endsWith(".miz") &&
            item.webkitGetAsEntry !== undefined
          ) {
            const fileEntry = await item.webkitGetAsEntry();
            const entry = await model.addFileSystemEntry(fileEntry, targetNode);
            console.log("drop", entry);
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
          if (
            targetNode != srcNode &&
            targetNode != srcNode.parent &&
            !targetNode.isDescendantOf(srcNode)
          ) {
            model.move(srcNode, targetNode);
            targetNode.expanded = target.open = true;
            refreshTree();
            refreshListing();
          } else {
            hoveredElement.classList.remove("drag-over");
          }
        }
      }
    },
    false
  );

  tree.addEventListener(
    "dragover",
    (event) => {
      if (hoveredElement) {
        hoveredElement.classList.remove("drag-over");
      }
      hoveredElement = getFileElement(event.target);
      if (hoveredElement) {
        hoveredElement.classList.add("drag-over");
      }
      stopEvent(event);
    },
    false
  );

  tree.addEventListener(
    "dragstart",
    (event) => {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("Text", "");
      selectedDrag = selectedDirectory;
    },
    false
  );

  listing.addEventListener(
    "drop",
    (event) => {
      if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
        const entries = Array.from(event.dataTransfer.files).map((file) =>
          model.addFile(file.name, file, getFileNode(selectedDirectory))
        );

        refreshListing();
        selectFile(findFileElement(entries[0].id));
      }
      stopEvent(event);
    },
    false
  );
  listing.addEventListener("dragover", stopEvent, false);
  listing.addEventListener(
    "dragstart",
    (event) => {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("Text", "");
      if (!event.dataTransfer || !event.dataTransfer.files || !event.dataTransfer.files.length) {
        selectedDrag = selectedFile;
      }
    },
    false
  );

  // Move Separators
  document.addEventListener("dragstart", (event) => {
    if (event.target == separator) {
      stopEvent(event);
    }
    if (event.target == separator2) {
      stopEvent(event);
    }
  });

  separator.addEventListener(
    "mousedown",
    () => {
      movingSeparator = true;
    },
    false
  );
  separator2.addEventListener(
    "mousedown",
    () => {
      movingSeparator2 = true;
    },
    false
  );

  separator.parentElement.addEventListener(
    "mousemove",
    (event) => {
      if (movingSeparator) {
        const treeWidth = event.clientX - tree.parentElement.offsetLeft;
        const explorerWidth = tree.parentElement.parentElement.offsetWidth;
        // console.log('explorerWidth', explorerWidth);
        // console.log('treeWidth', treeWidth);

        tree.parentElement.style.setProperty("min-width", treeWidth - 4 + "px");
        listing.parentElement.style.setProperty("max-width", explorerWidth - treeWidth - 4 + "px");
      }
    },
    false
  );
  separator2.parentElement.addEventListener(
    "mousemove",
    (event) => {
      if (movingSeparator2) {
        const listingWidth = event.clientX - listing.parentElement.offsetLeft;
        const explorerWidth = tree.parentElement.parentElement.offsetWidth;
        // console.log('explorerWidth', explorerWidth);
        // console.log('listingWidth', listingWidth, listing.innerHTML.width);
        const width = explorerWidth - listingWidth - 4;
        if (listingWidth > listing.clientWidth * 2) return;
        listing.parentElement.style.setProperty("max-width", listingWidth - 4 + "px");
        editorWindow.style.setProperty("max-width", width + "px");
      }
    },
    false
  );

  document.addEventListener(
    "mouseup",
    () => {
      movingSeparator = false;
    },
    false
  );
  document.addEventListener(
    "mouseup",
    () => {
      movingSeparator2 = false;
    },
    false
  );

  saveEditor.addEventListener("click", () => {
    const content = aceEditor.getValue();
    const node = getFileNode(selectedFile);
    node?.replaceText && node.replaceText(content);
  });

  progressExport.style.opacity = 0;
  expandTree();
  refreshTree();
}

export function getFileNode(element) {
  return element ? model.getById(element.dataset.fileId) : model.getRoot();
}

export function findFileElement(id) {
  return document.querySelector('[data-file-id="' + id + '"]');
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
    node.children.forEach((child) => expandTree(child));
  }
}

// Download miz
export function onexport(isFile, setName = "example.miz", options = {}, cb = false as boolean | Function) {
  return async (event) => {
    const target = event.target;

    if (!target.download) {
      const node = isFile ? getFileNode(selectedFile) : model.getRoot();
      let fileName = "";

      if (options.instant) {
        fileName = setName;
      } else {
        fileName = prompt(
          "Filename",
          isFile ? node.name : node.parent ? node.name + ".miz" : setName
        );
      }

      if (fileName) {
        fileName = fileName.match(/.miz$/) ? fileName : fileName + ".miz";
        progressExport.style.opacity = 1;
        progressExport.value = 0;
        progressExport.max = 0;
        let blobURL;

        try {
          blobURL = isFile
            ? await model.getBlobURL(node, { onprogress, bufferedWrite: true })
            : await model.exportZip(node, {
                onprogress,
                relativePath: true,
                bufferedWrite: true,
              });
        } catch (error) {
          alert(error);
        }

        if (blobURL) {
          if (cb) {
            const blob = await model.getBlob(node, { onprogress, relativePath: true, bufferedWrite: true });
            await cb(fileName, blob)
          }
          progressExport.style.opacity = 0;

          downloadBlob(blobURL, fileName);

          URL.revokeObjectURL(blobURL);
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

function ondelete(isFile) {
  return async (event) => {
    const node = getFileNode(isFile ? selectedFile : selectedDirectory);
    const confirmed = confirm(
      "Remove " + (isFile ? node.name : node.parent ? node.name : "file") + " ?"
    );

    if (confirmed) {
      let blobURL;
      try {
        blobURL = isFile ? await model.remove(node) : await model.remove(node);
      } catch (error) {
        alert(error);
      }
      refreshTree();
    }
  };
}

async function editFile() {
  const node = getFileNode(selectedFile);
  const entry = await model.getData(node);
  const name = entry.name ?? entry.filename ?? node.name;

  const textWriter = new zip.TextWriter();

  // Entry or Blob
  let text = entry.getData
    ? await entry.getData(textWriter)
    : (await entry.text)
    ? entry.text()
    : entry;

  if (name.match(/(\.jpg)$/i)) {
    const blob = await model.getBlobURL(node, {}, "image/jpg");
    imagePreview.src = blob;
    showPreview(imagePreview);
    // imageEdit.children[0].href=`https://www.photopea.com#%7B%22files%22:%5B%22${blob}%22%5D%7D`
    return;
  }
  if (name.match(/(\.png)$/i)) {
    const blob = await model.getBlobURL(node, {}, "image/png");
    imagePreview.src = blob;
    showPreview(imagePreview);
    // imageEdit.children[0].href=`https://www.photopea.com#%7B%22files%22:%5B%22${blob}%22%5D%7D`
    return;
  }

  if (name.match(/(\.ogg)$/i)) {
    const blob = await model.getBlobURL(node, {}, "audio/ogg");
    audioPreview.src = blob;
    showPreview(audioPreview);
    return;
  }

  if (name.match(/(\.mp3)$/i)) {
    const blob = await model.getBlobURL(node, {}, "audio/mpeg");
    audioPreview.src = blob;
    showPreview(audioPreview);
    return;
  }

  if (name.match(/(\.wav)$/i)) {
    const blob = await model.getBlobURL(node, {}, "audio/wav");
    audioPreview.src = blob;
    showPreview(audioPreview);
    return;
  }

  if (name.match(/(\.html)$/i)) {
    let doc;
    if (htmlPreview.contentDocument) {
      doc = htmlPreview.contentDocument;
    } else {
      doc = htmlPreview.contentWindow.document;
    }

    doc.body.innerHTML = text;
    showPreview(htmlPreview);
    return;
  }

  imagePreview.src = "";
  showPreview(editorWindow);
  saveEditor.style.display = "block";

  aceEditor.session.setValue(text);
}

function showPreview(preview) {
  if (audioPreview) audioPreview.style.display = "none";
  if (htmlPreview) htmlPreview.style.display = "none";
  if (imagePreview) imagePreview.style.display = "none";
  if (saveEditor) saveEditor.style.display = "none";
  if (editorWindow) editorWindow.style.display = "none";
  if (preview) preview.style.display = "block";
}

function onnewDirectory() {
  let name = "New Folder";
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

export function selectFile(fileElement) {
  resetSelectedFile();
  resetSelectedLabel(true);
  fileElement.className = "selected";
  fileElement.draggable = true;
  selectedFile = fileElement;

  // open selected file in editor
  setTimeout(() => {
    editFile(fileElement);
  }, 100);
}

export function selectDirectory(directoryElement) {
  resetSelectedDir();
  resetSelectedLabel(true);
  directoryElement.className = "selected";
  directoryElement.draggable = true;
  selectedDirectory = directoryElement;
  refreshListing();
}

export function findFileNode(name: string) {
  return [].slice
    .call(document.querySelectorAll(".file-label"))
    .find((e) => e.textContent.match(name));
}

export function selectRoot() {
  selectDirectory(document.querySelector('#tree details[data-file-id="0"]'));
}

export function selectMissionLua() {
  const missionLua = findFileNode("mission")!;
  selectFile(missionLua.parentElement);
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
    return new Promise((resolve) => {
      const node = getFileNode(nodeElement);
      labelElement.onkeydown = (event) => {
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
export function refreshTree(node, element) {
  let details;
  if (!node) {
    node = model.getRoot();
    element = tree;
    element && (element.innerHTML = "");
  }
  if (node.directory) {
    details = document.createElement("details");
    const summary = document.createElement("summary");
    const summaryContent = document.createElement("span");
    const label = document.createElement("span");
    const newDirectory = document.createElement("a");
    const exportDirectory = document.createElement("a");
    details.dataset.fileId = node.id;
    details.open = true; // node == model.getRoot() || node.expanded;
    if (selectedDirectory && selectedDirectory.dataset.fileId == node.id) {
      selectDirectory(details);
    }
    summaryContent.classList.add("dir-summary-content");
    summary.classList.add("dir-summary");
    if (!node.children.find((child) => child.directory)) {
      summary.classList.add("dir-summary-empty");
    }
    if (node.parent) {
      label.textContent = "🗀" + node.name;
    } else {
      label.textContent = `.miz`;
    }
    label.className = "dir-label";
    summaryContent.appendChild(label);

    newDirectory.className = "newdir-button button";
    newDirectory.title = "Create a new folder";
    newDirectory.textContent = "✅";
    newDirectory.addEventListener("click", onnewDirectory, false);
    summaryContent.appendChild(newDirectory);

    exportDirectory.className = "save-button button";
    exportDirectory.title = "Download mission .miz";
    exportDirectory.textContent = "⏬";
    exportDirectory.addEventListener("click", onexport(false), false);
    summaryContent.appendChild(exportDirectory);

    summary.appendChild(summaryContent);
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
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .forEach((child) => refreshTree(child, details));
}

// files
export function refreshListing() {
  const node = getFileNode(selectedDirectory);
  listing.innerHTML = "";
  node.children
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .forEach((child) => {
      if (!child.directory) {
        const li = document.createElement("li");
        const label = document.createElement("span");
        li.dataset.fileId = child.id;
        if (selectedFile && selectedFile.dataset.fileId == child.id) {
          selectFile(li);
        }
        label.className = "file-label";
        label.textContent = child.name;
        li.appendChild(label);

        const deleteFile = document.createElement("a");
        deleteFile.className = "delete-button button";
        deleteFile.title = "Remove this file";
        deleteFile.textContent = "❌";
        deleteFile.addEventListener("click", ondelete(true), false);
        li.appendChild(deleteFile);

        const exportFile = document.createElement("a");
        exportFile.className = "save-button button";
        exportFile.title = "Download this file";
        exportFile.textContent = "⏬";
        exportFile.addEventListener("click", onexport(true), false);
        li.appendChild(exportFile);

        listing.appendChild(li);
      }
    });
}
