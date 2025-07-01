const gridContainer = document.getElementById("grid-container")
let gridSize = 16

for(let i = 0; i < gridSize; i++){
    for (let j =0; j < gridSize; j++){
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridContainer.appendChild(gridItem)
    }
}

// Check number of items in container
// const divCount = gridContainer.querySelectorAll('div')
// console.log(divCount.length)