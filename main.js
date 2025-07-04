//TRACK CURRENT MODE
let isRandomColorMode = false;

function createGrid(gridSize) {
    //CREATE N*N GRID USING FLEX
    const gridContainer = document.getElementById("grid-container")

    //CLEAR EXISTING GRID
    gridContainer.innerHTML = ''

    //CALCULATE AVAILABLE SPACE
    const availableWidth = window.innerWidth
    const availableHeight = window.innerHeight - 10 //SUBTRACT BUTTON HEIGHT

    //CALCULATE DIMENSIONS OF EACH ITEM
    const itemWidth = (availableWidth / gridSize)
    const itemHeight = (availableHeight / gridSize)

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement('div')
            gridItem.classList.add('grid-item')
            gridItem.style.width = `${itemWidth}px`
            gridItem.style.height = `${itemHeight}px`
            gridContainer.appendChild(gridItem)
        }
    }
    setInteractionMode();
}

//SINGLE COLOR GRID INTERACTION
function gridInteraction() {
    //ON CLICK + DRAG CHANGES COLOR PERMANENTLY
    const gridItem = document.querySelectorAll('.grid-item')
    let isMouseDown = false
    gridItem.forEach(item => {
        let opacity = 0

        //WHEN MOUSE POINTER ENTERS A GRID CELL
        item.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                let computedStyle = window.getComputedStyle(item)
                let currentOpacity = parseFloat(computedStyle.opacity)
                opacity = Math.min(currentOpacity + 0.1, 1.0);
                item.style.opacity = opacity;
                item.classList.add('active')
            }
        })

        //WHEN THE FIRST GRID CELL IS PRESSED
        item.addEventListener('mousedown', () => {
            item.classList.add('active')
        })

        //INCREASE COLOR OPACITY ON CLICK
        item.addEventListener('click', () => {
            let computedStyle = window.getComputedStyle(item)
            let currentOpacity = parseFloat(computedStyle.opacity)
            item.style.opacity = Math.min(currentOpacity + 0.1, 1.0);
            item.classList.add('active')
        })
    })

    //TRACK MOUSE STATE GLOBALLY
    document.addEventListener('mousedown', () => isMouseDown = true)
    document.addEventListener('mouseup', () => isMouseDown = false)

    //PREVENT DRAG SELECTION(CLICK + DRAG)
    document.addEventListener('dragstart', (e) => e.preventDefault())
}

//GENERATE RANDOM COLOR
function generateRandomColor() {
    let R = Math.floor(Math.random() * 256)
    let G = Math.floor(Math.random() * 256)
    let B = Math.floor(Math.random() * 256)
    let color = []
    color.push(R)
    color.push(G)
    color.push(B)
    return color
}

//RANDOM COLOR GRID INTERACTION
function randomColorGridInteraction() {
    //ON CLICK + DRAG CHANGES COLOR PERMANENTLY
    const gridItem = document.querySelectorAll('.grid-item')
    let isMouseDown = false
    gridItem.forEach(item => {
        let opacity
        //WHEN MOUSE POINTER ENTERS A GRID CELL
        item.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                let computedStyle = window.getComputedStyle(item)
                let currentOpacity = parseFloat(computedStyle.opacity)
                const generatedColor = generateRandomColor()
                opacity = Math.min(currentOpacity + 0.1, 1.0);
                let colorValue = `rgb(${generatedColor[0]}, ${generatedColor[1]}, ${generatedColor[2]}`
                item.style.background = colorValue;
                item.style.opacity = opacity
            }
        })

        //INCREASE COLOR OPACITY ON CLICK
        item.addEventListener('click', () => {
            let computedStyle = window.getComputedStyle(item)
            let currentOpacity = parseFloat(computedStyle.opacity)
            opacity = Math.min(currentOpacity + 0.1, 1.0);
            const assignedColor = generateRandomColor()
            let colorValue = `rgb(${assignedColor[0]}, ${assignedColor[1]}, ${assignedColor[2]}`
            item.style.background = colorValue;
            item.style.opacity = opacity
        })
    })

    //TRACK MOUSE STATE GLOBALLY
    document.addEventListener('mousedown', () => isMouseDown = true)
    document.addEventListener('mouseup', () => isMouseDown = false)

    //PREVENT DRAG SELECTION(CLICK + DRAG)
    document.addEventListener('dragstart', (e) => e.preventDefault())
}

//CHANGE INTERACTION MODE BASED ON CLICK OF BUTTON
function setInteractionMode(){
    //FIRST REMOVE ALL EXISTING EVENT LISTENERS TO AVOID DUPLICATES
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.replaceWith(item.cloneNode(true))  //QUICK WAY TO REMOVE ALL LISTENERS
    });

    if(isRandomColorMode){
        randomColorGridInteraction();
    }
    else{
        gridInteraction();
    }
}

//GRID SIZE SELECT
const gridSizeButton = document.getElementById('grid-size');
let gridSize = 16;

gridSizeButton.addEventListener('click', () => {
    let correctInput = null;
    while (correctInput === null || isNaN(correctInput) || correctInput < 1 || correctInput > 100) {
        const input = prompt('Select the size of your grid: \n(Note: Enter value between 1 and 100)');

        if (input === null) {
            return;
        }

        correctInput = parseInt(input)

        if (isNaN(correctInput) || correctInput < 1 || correctInput > 100) {
            alert('Please enter a valid number between 1 and 100');
        }
    }
    gridSize = correctInput;
    createGrid(gridSize);
})

// READJUST GRID WHEN WINDOWS SIZE CHANGES
window.addEventListener('resize', function () {
    if (gridSize > 0) {
        createGrid(gridSize);
    }
});

//CLEAR THE SCREEN BUT MAINTAIN GRID SIZE
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', () => {
    createGrid(gridSize);
})

//RANDOM BUTTON
const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click', () => {
    isRandomColorMode = !isRandomColorMode;
    setInteractionMode();
})

//INITIALIZE WHEN DOM LOADS
document.addEventListener('DOMContentLoaded', () => {
    createGrid(gridSize);
})