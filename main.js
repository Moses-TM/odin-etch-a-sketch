//CREATE N*N GRID USING FLEX
const gridContainer = document.getElementById("grid-container")

function createGrid(gridSize) {
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
    // CHECK NUMBER OF ITEMS IN CONTAINER
    // const divCount = gridContainer.querySelectorAll('div')
    // console.log(divCount.length)

    //ON CLICK + DRAG CHANGES COLOR PERMANENTLY
    const gridItem = document.querySelectorAll('.grid-item')
    let isMouseDown = false
    gridItem.forEach(item => {
        let opacity = 0
        item.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                let computedStyle = window.getComputedStyle(item)
                let currentOpacity = parseFloat(computedStyle.opacity)
                opacity = Math.min(currentOpacity + 0.1, 1.0);
                item.style.opacity = opacity;
                item.classList.add('active')
            }
        })

        item.addEventListener('mousedown', () => {
            item.classList.add('active')
        })

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

//INITIAL GRID
createGrid(16)


//GRID SIZE SELECT
const gridSizeButton = document.getElementById('grid-size')
let gridSize = 16

gridSizeButton.addEventListener('click', () => {
    let correctInput = null;
    while (correctInput === null || isNaN(correctInput) || correctInput < 1 || correctInput > 100) {
        const input = prompt('Select the size of your grid: \nNote: Enter value between 1 and 100')

        if (input === null) {
            return
        }

        correctInput = parseInt(input)

        if (isNaN(correctInput) || correctInput < 1 || correctInput > 100) {
            alert('Please enter a valid number between 1 and 100')
        }
    }
    gridSize = correctInput
    createGrid(gridSize)
})

// READJUST GRID WHEN WINDOWS SIZE CHANGES
window.addEventListener('resize', function () {
    if (gridSize > 0) {
        createGrid(gridSize);
    }
});

//CLEAR THE SCREEN BUT MAINTAIN GRID SIZE
const resetButton = document.getElementById('reset-btn')
resetButton.addEventListener('click', () => {
    createGrid(gridSize)
})