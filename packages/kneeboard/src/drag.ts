let _initialized = false;

function debounce(func: Function, timeout = 300) {
  let timer: number;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function initDrag() {
  if (_initialized) return;
  _initialized = true;
  const containers = document.querySelectorAll(".container");

  setupDraggables();

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
      const draggable = document.querySelector(".dragging")?.parentElement!;
      if (!draggable) return;

      if (afterElement == null) {
        debounce(() => container.appendChild(draggable), 500);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });

  function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")].map(
      (e) => e.parentElement
    );
    return draggableElements.reduce(
      (closest, child, index) => {
        const box = child.getBoundingClientRect();
        const nextBox =
          draggableElements[index + 1] && draggableElements[index + 1].getBoundingClientRect();
        const inRow = y - box.bottom <= 0 && y - box.top >= 0; // check if this is in the same row
        const offset = x - (box.left + box.width / 2);
        if (inRow) {
          if (offset < 0 && offset > closest.offset) {
            return {
              offset: offset,
              element: child,
            };
          } else {
            if (
              // handle row ends,
              nextBox && // there is a box after this one.
              y - nextBox.top <= 0 && // the next is in a new row
              closest.offset === Number.NEGATIVE_INFINITY // we didn't find a fit in the current row.
            ) {
              return {
                offset: 0,
                element: draggableElements[index + 1],
              };
            }
            return closest;
          }
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  }
}

// do this on re-render because new contents appear
export function setupDraggables() {
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach((draggable) => {
    draggable.title = "drag and drop";

    draggable.ondragstart = () => {
      draggable.classList.add("dragging");
    };

    draggable.ondragend = () => {
      draggable.classList.remove("dragging");
    };
  });
}
