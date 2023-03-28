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
    gridSqr.style.backgroundColor = 'rgb(255, 255, 255)'
    gridSqr.classList.add('grid')
    if ((i + 1) == gridSize ** 2) {
      gridSqr.classList.add('grid-border-bottom')
      gridSqr.classList.add('grid-border-right')
      gridCtn.appendChild(gridSqr)
    }  else if ((i + 1) > (gridSize ** 2 - gridSize)) {
      gridSqr.classList.add('grid-border-bottom')
      gridCtn.appendChild(gridSqr)
    } else if ((i + 1) % gridSize == 0) {
      gridSqr.classList.add('grid-border-right')
      gridCtn.appendChild(gridSqr)
    } else {
      gridCtn.appendChild(gridSqr)
    }
  }
}

//Delete the grid
function deleteGrid() {
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

function reInit() {
  deleteGrid()
  createGrid(gridSize)
  listen()
}

function listenRange() {
  //Listen to the range value and create grid
  const gridRange = document.querySelector('.grid-range')
  gridRange.addEventListener('mouseup', gridValue => {
    gridSize = gridValue.target.value
    reInit()
  })
}

//Set default color
let color = '#000000'

//Set default buttons
let pen = true
let eraser = false
let rainbow = false
let shading = false

//Draw on the first click
function drawClick(e) {
  e.preventDefault(e)
  if (pen) {
    e.target.style.backgroundColor = color
  } else if (eraser) {
    e.target.style.backgroundColor = 'rbg(255, 255, 255)'
  } else if (rainbow) {
    let rainbowColor = getRandomColor()
    e.target.style.backgroundColor = rainbowColor
  } else if (shading) {
    //
    const sqrColor = e.target.style.backgroundColor
    const sqrColors = sqrColor.slice(4, sqrColor.length - 1).split(',')
    let R = sqrColors[0], 
    G = sqrColors[1], 
    B = sqrColors[2]
    const r = Math.ceil(R * 0.1), 
    g = Math.ceil(G * 0.1), 
    b = Math.ceil(B * 0.1)
    e.target.style.backgroundColor = `rgb(${R - r }, ${G - g}, ${B - b})`
  }
}

//Draw when hovering and mousedown
function draw(e) {
  if (e.buttons) {
    if (pen) {
      e.target.style.backgroundColor = color
    } else if (eraser) {
      e.target.style.backgroundColor = 'rgb(255, 255, 255)'
    } else if (rainbow) {
      let rainbowColor = getRandomColor()
      e.target.style.backgroundColor = rainbowColor
    } else if (shading) {
      const sqrColor = e.target.style.backgroundColor
      const sqrColors = sqrColor.slice(4, sqrColor.length - 1).split(',')
      let R = sqrColors[0], 
      G = sqrColors[1], 
      B = sqrColors[2]
      const r = Math.ceil(R * 0.1), 
      g = Math.ceil(G * 0.1), 
      b = Math.ceil(B * 0.1)
      e.target.style.backgroundColor = `rgb(${R - r}, ${G - g}, ${B - b})`
    }
  }
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
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

  //Listen for buttons
  const buttons = document.querySelectorAll('button')

  buttons.forEach(button => {
    button.addEventListener('click', button => {
      //Select mode
      if (button.target.id === 'eraser') {
        pen = false
        eraser = true
        rainbow = false
        shading = false
      } else if (button.target.id === 'rainbow') {
        pen = false
        eraser = false
        rainbow = true
        shading = false
      } else if (button.target.id ==='shading') {
        pen = false
        eraser = false
        rainbow = false
        shading = true
      } else {
        pen = true
        eraser = false
        rainbow = false
        shading = false
      }
      //Select button
      if (pen) {
        buttons[0].className = 'selected'
        buttons[1].className = ''
        buttons[2].className = ''
        buttons[3].className = ''
      } else if (eraser) {
        buttons[0].className = ''
        buttons[1].className = 'selected'
        buttons[2].className = ''
        buttons[3].className = ''
      } else if (rainbow) {
        buttons[0].className = ''
        buttons[1].className = ''
        buttons[2].className = 'selected'
        buttons[3].className = ''
      } else if (shading) {
        buttons[0].className = ''
        buttons[1].className = ''
        buttons[2].className = ''
        buttons[3].className = 'selected'
      }
    })
  })
  
}