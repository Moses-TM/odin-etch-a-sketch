//CREATE 16 * 16 GRID USING FLEX
const gridContainer = document.getElementById("grid-container")
let gridSize = 16

for(let i = 0; i < gridSize; i++){
    for (let j =0; j < gridSize; j++){
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
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
    item.addEventListener('mouseenter', () => {
        if (isMouseDown){
            item.classList.add('active')
        }
    })

    item.addEventListener('mousedown', () => {
        item.classList.add('active')
    })
})

//TRACK MOUSE STATE GLOBALLY
document.addEventListener('mousedown', () => isMouseDown = true)
document.addEventListener('mouseup', () => isMouseDown = false)

//PREVENT DRAG SELECTION(CLICK + DRAG)
document.addEventListener('dragstart' , (e) => e.preventDefault())