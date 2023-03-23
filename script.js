const gridCtn = document.querySelector('.grid-container')

//Number of rows and columns
let gridSize = 16

//Create the grid
function createGrid(gridSize) {
  //Set number of rows and columns
  gridCtn.style.cssText = 
 `grid-template-rows: repeat(${gridSize}, auto);
  grid-template-columns: repeat(${gridSize}, auto);`

  //Create the grid squares
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridSqr = document.createElement('div')
    if ((i + 1) == gridSize ** 2) {
      gridSqr.classList.add('grid')
      gridSqr.classList.add('grid-border-bottom')
      gridSqr.classList.add('grid-border-right')
      gridCtn.appendChild(gridSqr)
    }  else if ((i + 1) > (gridSize ** 2 - gridSize)) {
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

function init() {
  deleteGrid()
  createGrid(gridSize)
  listen()
  listenRange()
}

init()

function listenRange() {
  //Listen to the range value and create grid
  const gridRange = document.querySelector('.grid-range')
  gridRange.addEventListener('mouseup', gridValue => {
    gridSize = gridValue.target.value
    reInit()
  })
}

function reInit() {
  deleteGrid()
  createGrid(gridSize)
  listen()
}

//set default color
let color = '#000000'

//set default buttons
let pen = true
let eraser = false
let rainbow = false
let shading = false

function drawClick(e) {
  e.preventDefault(e)
  e.target.style.backgroundColor = color
}

function draw(e) {
  if (e.buttons) {
    e.target.style.backgroundColor = color
  }
}

//Listens to events
function listen() {
  //Listen for drawing on the grid
  const gridSquares = document.querySelectorAll('.grid')
  gridSquares.forEach(element => {
    element.addEventListener('mousedown', drawClick)
    element.addEventListener('mouseenter', draw)
  })

  //Listen for color picker
  const colorPicker = document.querySelector('#color-picker')
  colorPicker.addEventListener('input', e => {
    color = e.target.value
  })
}

function toggleButtons() {

}