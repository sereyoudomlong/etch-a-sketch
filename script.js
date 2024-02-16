var CANVAS_WIDTH_HEIGHT = 600;
var CURRENT_PEN_COLOR = "red";
var CURRENT_GRID_SIZE = 64;

function generateGrid(gridSize) {
  var amountOfGrids = gridSize;
  var gridWidthAndHeight = CANVAS_WIDTH_HEIGHT / amountOfGrids;

  //Add in the canvas to draw
  const canvas = document.querySelector("#canvas");
  canvas.setAttribute(
    "style",
    `width: ${CANVAS_WIDTH_HEIGHT}px; height: ${CANVAS_WIDTH_HEIGHT}px`
  );
  for (let i = 0; i < amountOfGrids; i++) {
    for (let j = 0; j < amountOfGrids; j++) {
      const div = document.createElement("div");
      let divAmountInOneRow = (1 / amountOfGrids) * 100;
      div.setAttribute(
        "style",
        `width: ${gridWidthAndHeight}px; 
          height: ${gridWidthAndHeight}px; 
          flex-basis: ${divAmountInOneRow}%;
          `
      );

      div.addEventListener(
        "mouseover",
        (e) => (e.target.style.backgroundColor = CURRENT_PEN_COLOR)
      );
      canvas.appendChild(div);
    }
  }
}

function showCurrentGridSize() {
  const teller = document.getElementById("size-teller");
  teller.textContent = `Current Grid Size: ${CURRENT_GRID_SIZE}x${CURRENT_GRID_SIZE}`;
}

function resetCanvas(canvasNode) {
  var children = canvasNode.children;
  for (let i = 0; i < children.length; i++) {
    children[i].style.backgroundColor = "white";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateGrid(CURRENT_GRID_SIZE);
  showCurrentGridSize();

  // Add in the heading for changing color
  const changeColorText = document.createElement("p");
  changeColorText.textContent = "Change Pen color";
  changeColorText.className = "heading";
  document.body.appendChild(changeColorText);

  // Add in the color picking option
  const colorPickerContainer = document.createElement("div");
  colorPickerContainer.className = "row-container";
  document.body.appendChild(colorPickerContainer);

  // only take in css supported color
  var colors = [
    "red",
    "green",
    "blue",
    "black",
    "yellow",
    "pink",
    "purple",
    "white",
  ];
  for (let i = 0; i < colors.length; i++) {
    let colorDiv = document.createElement("div");
    colorDiv.classList.add("color-changer");
    colorDiv.style.backgroundColor = colors[i];
    colorDiv.addEventListener("click", function () {
      CURRENT_PEN_COLOR = colors[i];
    });

    colorPickerContainer.appendChild(colorDiv);
  }

  //set grid size
  const gridButton = document.getElementById("grid-size");
  const canvas = document.getElementById("canvas");
  gridButton.addEventListener("click", function () {
    size = prompt("Enter grid size (e.g. 6 is 6x6 grid, max 128):");

    if (size != null) {
      CURRENT_GRID_SIZE = size;
      while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
      }
      generateGrid(CURRENT_GRID_SIZE);
      showCurrentGridSize();
    }
  });

  const resetButton = document.getElementById("reset-canvas");
  resetButton.onclick = function () {
    resetCanvas(canvas);
  };
});
