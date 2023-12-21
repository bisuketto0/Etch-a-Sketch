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
    gridCtn.appendChild(gridSqr)
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
  gridRange.addEventListener('mouseup', value => {
    gridSize = value.target.value
    const gridValue = document.querySelector('.grid-range-value')
    gridValue.textContent = `${gridSize} X ${gridSize}`
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

//default rainbow value
let randomHsl = 0

//Draw on the first click
function drawClick(e) {
  e.preventDefault(e)
  if (pen) {
    e.target.style.backgroundColor = color
  } else if (eraser) {
    e.target.style.backgroundColor = 'rgb(255, 255, 255)'
  } else if (rainbow) {
    if (randomHsl === 360) randomHsl = 0
    e.target.style.backgroundColor = HSLToRGB(randomHsl, 100, 50)
    randomHsl++
  } else if (shading) {
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
      if (randomHsl === 360) randomHsl = 0
      e.target.style.backgroundColor = HSLToRGB(randomHsl, 100, 50)
      randomHsl++
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

//function to convert HSL to RGB
function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `rgb(${255 * f(0)}, ${255 * f(8)}, ${255 * f(4)})`;
};

// function getRainbowColor(i) {
//   const rainbow = ['rgb(255, 0, 0)', 'rgb(255, 127, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(75, 0, 130)', 'rgb(148, 0, 211)', ]
//   return rainbow[i]
// }

function clear() {
  const gridSquares = document.querySelectorAll('.grid')
  gridSquares.forEach(gridSqr => {
    gridSqr.style.backgroundColor = 'rgb(255, 255, 255)'
  })
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

  //Listen for clear button
  const clearBtn = document.querySelector('#clear')
  clearBtn.addEventListener('click', clear)

  //Listen for buttons
  const buttons = document.querySelectorAll('.btn')

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
      } else if (button.target.id === 'pen') {
        pen = true
        eraser = false
        rainbow = false
        shading = false
      }
      //Select button
      if (pen) {
        buttons.forEach(button => button.className = '')
        button.target.className = 'selected'
      } else if (eraser) {
        buttons.forEach(button => button.className = '')
        button.target.className = 'selected'
      } else if (rainbow) {
        buttons.forEach(button => button.className = '')
        button.target.className = 'selected'
      } else if (shading) {
        buttons.forEach(button => button.className = '')
        button.target.className = 'selected'
      }
    })
  })
  
}