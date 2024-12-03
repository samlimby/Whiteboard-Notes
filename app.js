let currentMoveHandler; 
let currentUpHandler;

let startX = 0;
let startY = 0;
let initialMouseX, initialMouseY;

let isDragging = false;
let isHover = false

let mouseX = 0;
let mouseY = 0;

let cardPositions = JSON.parse(localStorage.getItem("cardPositionGroup"));
const blueCardGroup = [];

function initialGroupSetting() {
    console.log("function active");
    if (!cardPositions || cardPositions.length === 0) {
      cardPositions = [blueCardGroup];
      localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));
    } else {
      cardPositions = JSON.parse(localStorage.getItem("cardPositionGroup"));
    }
  }

initialGroupSetting()

const cardGroup = [];

// localStorage.clear("cardPositionGroup")

const yellowCardGroup = [];
cardGroup.push(yellowCardGroup);

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

// yellowCardText.value = localStorage.getItem("yellowCardText")

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX; 
    mouseY = event.clientY; 
})

document.addEventListener("click", function(event) {
    cardClick(event);
});

function cardClick(event) {
    const hoveredElement = event.target;
    
    const cardElement = hoveredElement.closest(".card-blue, .card-yellow, .card-orange, .card-red" || ".card-text");
    
    if (!cardElement) return; 
    
    if (isDragging) {
        isDragging = false;
        console.log("drag stopped")
        
        // Remove event listeners
        document.removeEventListener('mousemove', currentMoveHandler);
        document.removeEventListener('mouseup', currentUpHandler);
        
        currentMoveHandler = null;
        currentUpHandler = null;
    } else {
        console.log("movement")
        mouseDown(cardElement);
    }
}

document.addEventListener("mouseover", (event) => {
    const hoveredElement = event.target

    const cardElement = hoveredElement.closest(".card-blue, .card-yellow, .card-orange, .card-red" || ".card-text");

    if (!cardElement) return;

    const cardDelete = cardElement.querySelector(".card-icon");

    if (cardElement) {
        console.log("delete visible")
        cardDelete.style.display = "block";

        cardDelete.addEventListener("click", function(){
            cardDeleteAction();
            !cardElement
            document.removeEventListener('mousemove', currentMoveHandler);
            document.removeEventListener('mouseup', currentUpHandler);
            
            currentMoveHandler = null;
            currentUpHandler = null;
        });
    };
})

document.addEventListener("mouseout", (event) => {
    const hoveredElement = event.target

    const cardElement = hoveredElement.closest(".card-blue, .card-yellow, .card-orange, .card-red" || ".card-text");

    if (!cardElement) return;

    const cardDelete = cardElement.querySelector(".card-icon");

    if (cardElement) {

        cardDelete.style.display = "none";
    }
})

function mouseDown(element) {
    isDragging = true;
    const rect = element.getBoundingClientRect();

    console.log("moving card")

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

    console.log(blueCardGroup)
    console.log(cardPositions)

    const cardID = element.id;
    const last2 = cardID.slice(-2);

    const blueNameString = `card-blue${last2}`;

    // const blueSub = "blue";

    // console.log(cardID)
    // console.log(cardID.includes(blueSub)); // detecting blue goes to true

    // const rect = element.getBoundingClientRect();

    const deltaX = mouseX - initialMouseX;
    const deltaY = mouseY - initialMouseY;
    
    const newLeft = startX + deltaX;
    const newTop = startY + deltaY;

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;


    // Update blueCardGroup
    const blueCardIndex = blueCardGroup.findIndex(card => card.id === blueNameString);

    if (blueCardIndex !== -1) {
        blueCardGroup[blueCardIndex].xAxis = newLeft;
        blueCardGroup[blueCardIndex].yAxis = newTop;
    }

    if (cardPositions) {
        const existingCardIndex = cardPositions.findIndex(card => card.id === cardID);

        if (existingCardIndex !== -1) {
            // Update existing card position
            cardPositions[existingCardIndex].xAxis = newLeft;
            cardPositions[existingCardIndex].yAxis = newTop;
        } else {
            // Add new card position
            cardPositions.push({id: cardID, xAxis: newLeft, yAxis: newTop});
        }
    }

    // Update localStorage
    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));

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
orangeCardCreation.addEventListener("click", createOrangeCard)
redCardCreation.addEventListener("click", createRedCard)

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
    newIconBox.id = `blue-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const blueCardDelete = document.getElementById(`blue-card_delete${randomID}`);
    blueCardDelete.style.display = "none";

    // let serizalizedIdY = JSON.stringify(randomID) + "yAxis";
    // let serizalizedIdX = JSON.stringify(randomID) + "xAxis";

    let positionX = mouseMove(newDiv)

    // localStorage.setItem("xAxis", JSON.stringify(startX));
    // localStorage.setItem("yAxis", JSON.stringify(startY));

    // let yAxis = JSON.parse(localStorage.getItem("xAxis"));
    // let xAxis = JSON.parse(localStorage.getItem("yAxis"));

    // Object.defineProperty(newDiv, "yAxis", {value: yAxis});
    // Object.defineProperty(newDiv, "xAxis", {value: xAxis});

    blueCardGroup.push(newDiv)
    
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

function createOrangeCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-orange${randomID}`; 
    newDiv.id = newDivID;
    newDiv.classList.add("card-orange")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Express yourself!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `orange-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const orangeCardDelete = document.getElementById(`orange-card_delete${randomID}`); 
    // yellowCardDelete.style.display = "none";

    yellowCardGroup.push(newDiv)

}

function createRedCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-red${randomID}`; 
    newDiv.id = newDivID;
    newDiv.classList.add("card-red")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Express yourself!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `red-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const redCardDelete = document.getElementById(`red-card_delete${randomID}`); 
    // yellowCardDelete.style.display = "none";

    yellowCardGroup.push(newDiv)

}

function loadCardPositions() {

    const storedPositions = JSON.parse(localStorage.getItem('cardPositionGroup')) || [];

    storedPositions.forEach(cardPosition => {

        let newDiv = document.createElement("div");
        const newDivID = cardPosition.id;
        newDiv.id = newDivID;
        newDiv.classList.add("card-blue")
        const newTextArea = document.createElement("textarea");
        newTextArea.classList.add("card-text")
        newTextArea.placeholder = "What's your next best idea?";
        newDiv.appendChild(newTextArea);
    
        const newIconBox = document.createElement("div");
        newIconBox.id = `blue-card_delete${newDivID}`;
        newIconBox.classList.add("card-icon");
        newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
        newDiv.appendChild(newIconBox);
    
        const currentContainer = document.getElementById("container");
        currentContainer.appendChild(newDiv)
        const blueCardDelete = document.getElementById(`blue-card_delete${newDivID}`);
        blueCardDelete.style.display = "none";
        
        newDiv.style.left = `${cardPosition.xAxis}px`;
        newDiv.style.top = `${cardPosition.yAxis}px`;

        if (blueCardGroup.length > 0) {
            const lastCardIndex = blueCardGroup.length - 1;
            blueCardGroup[lastCardIndex].xAxis = cardPosition.xAxis;
            blueCardGroup[lastCardIndex].yAxis = cardPosition.yAxis;
        }
    });
}

function cardDeleteAction() {
    const hoveredElement = event.target;
    const cardElement = hoveredElement.closest(".card-blue, .card-yellow, .card-orange, .card-red" || ".card-text");
  
    if (cardElement) {
      const cardID = cardElement.id;
      const cardIndex = cardPositions.findIndex(card => card.id === cardID);
  
      if (cardIndex !== -1) {
        // Remove the card from the cardPositions array
        cardPositions.splice(cardIndex, 1);
        localStorage.setItem('cardPositionGroup', JSON.stringify(cardPositions));

        console.log("card removed")
        isDragging = true;

        cardElement.remove();

        console.log(isDragging)
        cardClick()

      }
    }
}


document.addEventListener('DOMContentLoaded', loadCardPositions, initialGroupSetting);





// things to do within the file
// - adding additional colors of post its and more than one post it
// - zoom in and out of board
// - type into post it notes
// - delete post it notes
// - profile/auth for app
// - cloud saving