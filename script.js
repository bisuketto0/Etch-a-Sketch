//Create the grid
function createGrid() {
  const gridCtn = document.querySelector('.grid-container')
  let gridSize = 16
  //Set number of rows and columns
  gridCtn.style.cssText = 
 `grid-template-rows: repeat(${gridSize}, auto);
  grid-template-columns: repeat(${gridSize}, auto);`
  //Create the grid squares
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridSqr = document.createElement('div')
    if ((i + 1) == gridSize**2) {
      gridSqr.classList.add('grid')
      gridSqr.classList.add('grid-border-bottom')
      gridSqr.classList.add('grid-border-right')
      gridCtn.appendChild(gridSqr)
    }  else if ((i + 1) > (gridSize**2 - gridSize)) {
      gridSqr.classList.add('grid')
      gridSqr.classList.add('grid-border-bottom')
      gridCtn.appendChild(gridSqr)
    } else if ((i + 1) % gridSize == 0) {
      gridSqr.classList.add('grid')
      gridSqr.classList.add('grid-border-right')
      gridCtn.appendChild(gridSqr)
    } else {
      gridSqr.classList.add('grid')
      gridCtn.appendChild(gridSqr)
    }
  }
}

//Delete the grid
function deleteGrid() {
  const gridCtn = document.querySelector('.grid-container')
  const gridSqrNum = gridCtn.childElementCount
  if (gridSqrNum > 0) gridCtn.innerHTML = ''
}