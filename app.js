let newX = JSON.parse(localStorage.getItem("cardPositionX"));
let newY = JSON.parse(localStorage.getItem("cardPositionY"));

let startX, startY;
let initialMouseX, initialMouseY;

let isDragging = false;

let mouseX = 0;
let mouseY = 0;

let cardPosition =  {
    x: JSON.parse(localStorage.getItem("cardPositionX")) || 0,
    y: JSON.parse(localStorage.getItem("cardPositionY")) || 0
};

requestAnimationFrame(() => {
    yellowCard.style.left = cardPosition.x + 'px';
    yellowCard.style.top = cardPosition.y + 'px';
});

const cardGroup = [];

const yellowCardGroup = [];
cardGroup.push(yellowCardGroup);
const blueCardGroup = [];
cardGroup.push(blueCardGroup);
const redCardGroup = [];
cardGroup.push(redCardGroup);
const orangeCardGroup = [];
cardGroup.push(orangeCardGroup);

const blueCardCreation = document.getElementById("note-picker_blue");
const orangeCardCreation = document.getElementById("note-picker_orange");
const yellowCardCreation = document.getElementById("note-picker_yellow");
const redCardCreation = document.getElementById("note-picker_red");


const yellowCard = document.getElementById("card_yellow");
const yellowCardText = document.getElementById("card-yellow_text");
const yellowCardDelete = document.getElementById("yellow-card_delete");

yellowCardDelete.style.display = "none";

yellowCardText.value = localStorage.getItem("yellowCardText");

yellowCard.style.top = cardPosition.x + 'px'
yellowCard.style.left = cardPosition.y + 'px'

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX; 
    mouseY = event.clientY; 
})

document.addEventListener("mouseover", (event) => {
    const hoveredElement = event.target;
    if (hoveredElement.matches(".card-blue, .card-yellow")) {
        mouseDown(hoveredElement)
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

    initialMouseX = mouseX;
    initialMouseY = mouseY;

    startX = rect.left;
    startY = rect.top;
    
    // Add event listeners correctly
    document.addEventListener('mousemove', (e) => mouseMove(element));
    document.addEventListener('mouseup', () => mouseUp(element));
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

    element.addEventListener("click", function(){
        mouseUp(element)
    });
}


function mouseUp(element) {
    isDragging = false;
    // Remove event listeners
    document.removeEventListener('mousemove', (e) => mouseMove(e, element));
    document.removeEventListener('mouseup', () => mouseUp(element));
}

// Initialize position from localStorage if needed
function initializeCardPosition(element) {
    const savedX = localStorage.getItem("cardPositionX");
    const savedY = localStorage.getItem("cardPositionY");
    
    if (savedX && savedY) {
        element.style.left = `${JSON.parse(savedX)}px`;
        element.style.top = `${JSON.parse(savedY)}px`;
    }
}

yellowCardText.addEventListener("input", function() {

    localStorage.setItem("yellowCardText", yellowCardText.value);

})

blueCardCreation.addEventListener("click", createBlueCard)
yellowCardCreation.addEventListener("click", createYellowCard)

function createBlueCard() {

    const newDiv = document.createElement("div");
    const newDivID = `card-blue${Math.floor(Math.random() * 100)}`;
    newDiv.id = newDivID;
    newDiv.classList.add("card-blue")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "What's your next best idea?";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = "blue-card_delete";
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const blueCardDelete = document.getElementById("blue-card_delete");
    blueCardDelete.style.display = "none";

    blueCardGroup.push(newDiv)

    console.log(blueCardGroup)
    console.log(cardGroup);
    
}

function createYellowCard() {

    const newDiv = document.createElement("div");
    const newDivID = `card-yellow${Math.floor(Math.random() * 100)}`;
    newDiv.id = newDivID;
    newDiv.classList.add("card-yellow")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Express yourself!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = "yellow-card_delete";
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const yellowCardDelete = document.getElementById("yellow-card_delete");
    yellowCardDelete.style.display = "none";

    yellowCardGroup.push(newDiv)

}





// things to do within the file
// - adding additional colors of post its and more than one post it
// - zoom in and out of board
// - type into post it notes
// - delete post it notes
// - profile/auth for app
// - cloud saving