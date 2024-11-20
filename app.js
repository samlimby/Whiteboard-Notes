let newX = JSON.parse(localStorage.getItem("cardPositionX"));
let newY = JSON.parse(localStorage.getItem("cardPositionY"));

let currentMoveHandler; 
let currentUpHandler;

let startX, startY;
let initialMouseX, initialMouseY;

let isDragging = false;

let mouseX = 0;
let mouseY = 0;

let cardPosition =  {
    x: JSON.parse(localStorage.getItem("cardPositionX")) || 0,
    y: JSON.parse(localStorage.getItem("cardPositionY")) || 0
};

const cardGroup = [];

const yellowCardGroup = [];
cardGroup.push(yellowCardGroup);
const blueCardGroup = [];
cardGroup.push(blueCardGroup);
const redCardGroup = [];
cardGroup.push(redCardGroup);
const orangeCardGroup = [];
cardGroup.push(orangeCardGroup);

function UpdateCardPosition(colorIndex, cardIndex, position) {
    requestAnimationFrame(() => {

        if (cardGroup[colorIndex] && cardGroup[colorIndex][cardIndex]) {
            cardGroup[colorIndex][cardIndex].style.left = position.x + 'px';
        }

        if (cardGroup[colorIndex] && cardGroup[colorIndex][cardIndex]) {
            cardGroup[colorIndex][cardIndex].style.left = position.y + 'px';
        }
    });
}

const blueCardCreation = document.getElementById("note-picker_blue");
const orangeCardCreation = document.getElementById("note-picker_orange");
const yellowCardCreation = document.getElementById("note-picker_yellow");
const redCardCreation = document.getElementById("note-picker_red");


const yellowCard = document.getElementById("card_yellow");
const yellowCardText = document.getElementById("card-yellow_text");
const yellowCardDelete = document.getElementById("yellow-card_delete");

// yellowCardDelete.style.display = "none";

// yellowCardText.value = localStorage.getItem("yellowCardText");

// yellowCard.style.top = cardPosition.x + 'px'
// yellowCard.style.left = cardPosition.y + 'px'

// for (let i = 0; i < cardGroup.length; i++) {           // Loop through color groups
//     for (let j = 0; j < cardGroup[i].length; j++) {    // Loop through cards in each color group
//         const container = document.getElementById("container");
//         container.appendChild(cardGroup[i][j]);         // Add each card to container
//     }
// }

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX; 
    mouseY = event.clientY; 
})

document.addEventListener("click", (event) => {
    const hoveredElement = event.target;
    
    // Check if clicked element is a card or its child elements
    const cardElement = hoveredElement.closest(".card-blue, .card-yellow");
    
    if (!cardElement) return; // Exit if not clicking on a card
    
    if (isDragging) {
        // If we're dragging and click on a card, stop the drag
        isDragging = false;
        console.log("drag stopped")
        
        // Remove event listeners
        document.removeEventListener('mousemove', currentMoveHandler);
        document.removeEventListener('mouseup', currentUpHandler);
        
        currentMoveHandler = null;
        currentUpHandler = null;
    } else {
        // If we're not dragging, start a new drag operation
        mouseDown(cardElement);
    }
});

// // Card hover effects
// yellowCard.addEventListener("mouseenter", function(){
//     yellowCardDelete.style.display = "block";
// })

// yellowCard.addEventListener("mouseleave", function(){
//     yellowCardDelete.style.display = "none";
// });

function mouseDown(element) {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    console.log("issue")

    initialMouseX = mouseX;
    initialMouseY = mouseY;

    startX = rect.left;
    startY = rect.top;

    currentMoveHandler = () => mouseMove(element);
    // currentUpHandler = () => mouseUp(element);
    
    document.addEventListener('mousemove', currentMoveHandler);
    // document.addEventListener('mouseup', currentUpHandler);  
}

function mouseMove(element) {
    if (!isDragging) return;

    const rect = element.getBoundingClientRect();

    const deltaX = mouseX - initialMouseX;
    const deltaY = mouseY - initialMouseY;
    
    const newLeft = startX + deltaX;
    const newTop = startY + deltaY;

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;

    localStorage.setItem("cardPositionX", JSON.stringify(newLeft));
    localStorage.setItem("cardPositionY", JSON.stringify(newTop));

}


// function mouseUp(element) {
//     if (!isDragging) return;
    
//     isDragging = false;
    
//     // Remove the specific handlers we stored
//     document.removeEventListener('mousemove', currentMoveHandler);
//     document.removeEventListener('mouseup', currentUpHandler);
    
//     currentMoveHandler = null;
//     currentUpHandler = null;
// }

// Initialize position from localStorage if needed
function initializeCardPosition(element) {
    const savedX = localStorage.getItem("cardPositionX");
    const savedY = localStorage.getItem("cardPositionY");
    
    if (savedX && savedY) {
        element.style.left = `${JSON.parse(savedX)}px`;
        element.style.top = `${JSON.parse(savedY)}px`;
    }
}

// yellowCardText.addEventListener("input", function() {

//     localStorage.setItem("yellowCardText", yellowCardText.value);

// })

blueCardCreation.addEventListener("click", createBlueCard)
yellowCardCreation.addEventListener("click", createYellowCard)

function createBlueCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-blue${randomID}`;
    newDiv.id = newDivID;
    newDiv.classList.add("card-blue")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "What's your next best idea?";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `yellow-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const blueCardDelete = document.getElementById(`blue-card_delete${randomID}`);
    // blueCardDelete.style.display = "none";

    blueCardGroup.push(newDiv)

    console.log(blueCardGroup)
    console.log(cardGroup);
    
}

function createYellowCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-yellow${randomID}`; 
    newDiv.id = newDivID;
    newDiv.classList.add("card-yellow")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Express yourself!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `yellow-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const yellowCardDelete = document.getElementById(`yellow-card_delete${randomID}`); 
    // yellowCardDelete.style.display = "none";

    yellowCardGroup.push(newDiv)

}





// things to do within the file
// - adding additional colors of post its and more than one post it
// - zoom in and out of board
// - type into post it notes
// - delete post it notes
// - profile/auth for app
// - cloud saving