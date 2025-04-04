let currentMoveHandler; 
let currentUpHandler;

let startX = 0;
let startY = 0;
let initialMouseX, initialMouseY;

let isDragging = false;
let isActive = false;
let isHover = false

let mouseX = 0;
let mouseY = 0;

function initialGroupSetting() {
    console.log("function active");

    // Check if localStorage already contains the key "cardPositionGroup"
    let storedValue = localStorage.getItem("cardPositionGroup");

    if (!storedValue || storedValue === "null") {
        console.log("no local detected");
        // If not present or invalid, initialize it as an empty array
        localStorage.setItem("cardPositionGroup", JSON.stringify([]));
        storedValue = JSON.stringify([]); // Reset the value
    } else {
        console.log("local detected");
    }

    // Parse and assign to cardPositions
    cardPositions = JSON.parse(storedValue);
}

let cardPositions;

initialGroupSetting();


// cardPositions.splice(0, 6)
// localStorage.clear("cardPositionGroup")

console.log(cardPositions)


function UpdateCardPosition(colorIndex, cardIndex, position) {
    requestAnimationFrame(() => {

        if (cardPositions[colorIndex]) {
            cardPositions[colorIndex].style.left = position.x + 'px';
        }

        if (cardPositions[colorIndex]) {
            cardPositions[colorIndex].style.left = position.y + 'px';
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
    mouseX = event.pageX;
    mouseY = event.pageY;
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

        cardElement.classList.remove("card-selected");
        let smTopLeftDiv = cardElement.querySelector(".selected-sm_box-top_left");
        let smTopRightDiv = cardElement.querySelector(".selected-sm_box-top_right");
        let smBottomLeftDiv = cardElement.querySelector(".selected-sm_box-bottom_left");
        let smBottomRightDiv = cardElement.querySelector(".selected-sm_box-bottom_right");

        smTopLeftDiv.remove();
        smTopRightDiv.remove();
        smBottomLeftDiv.remove();
        smBottomRightDiv.remove();

        console.log("drag stopped")
        
        // Remove event listeners
        document.removeEventListener('mousemove', currentMoveHandler);
        document.removeEventListener('mouseup', currentUpHandler);
        
        currentMoveHandler = null;
        currentUpHandler = null;
    } else {
        console.log("movement")
        cardElement.classList.add("card-selected");
        const topLeftSM = document.createElement("div");
        const topRightSM = document.createElement("div");
        const bottomLeftSM = document.createElement("div");
        const bottomRightSM = document.createElement("div");

        topLeftSM.classList.add("selected-sm_box-top_left");
        topRightSM.classList.add("selected-sm_box-top_right");
        bottomLeftSM.classList.add("selected-sm_box-bottom_left");
        bottomRightSM.classList.add("selected-sm_box-bottom_right");


        cardElement.appendChild(topLeftSM);
        cardElement.appendChild(topRightSM);
        cardElement.appendChild(bottomLeftSM);
        cardElement.appendChild(bottomRightSM);

        mouseDown(cardElement);
        cardTextValue(cardElement)
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

            isActive = false;
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

    initialMouseX = event.pageX;
    initialMouseY = event.pageY;

    startX = rect.left + window.pageXOffset;
    startY = rect.top + window.pageYOffset;

    currentMoveHandler = () => mouseMove(element);
    
    document.addEventListener('mousemove', currentMoveHandler);
}

function mouseMove(element) {
    if (!isDragging) return;

    const cardID = element.id;

    const deltaX = mouseX - initialMouseX;
    const deltaY = mouseY - initialMouseY;
    
    const newLeft = startX + deltaX;
    const newTop = startY + deltaY;

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;

    if (cardPositions) {
        const cardIndex = cardPositions.findIndex(card => card.id === cardID); 

        if (cardIndex !== -1) {
            cardPositions[cardIndex].xAxis = newLeft;
            cardPositions[cardIndex].yAxis = newTop;
        }
    
    }

    if (cardPositions) {
        const existingCardIndex = cardPositions.findIndex(card => card.id === cardID);

        if (existingCardIndex !== -1) {
            // Update existing card position
            cardPositions[existingCardIndex].xAxis = newLeft;
            cardPositions[existingCardIndex].yAxis = newTop;
            cardPositions[existingCardIndex].id = cardPositions[existingCardIndex].id;
        } else {
            // Add new card position
            cardPositions.push({id: cardID, xAxis: newLeft, yAxis: newTop});
        }
    }

    // Update localStorage
    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));

}

function cardTextValue(element) {
    
    const textArea = element.querySelector(".card-text");
    const cardID = element.id;

    if (cardPositions) {
        const cardIndex = cardPositions.findIndex(card => card.id === cardID); 

        if (cardIndex !== -1) {
            cardPositions[cardIndex].text = textArea.value;
        }
    
    }
}

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
    console.log(newDivID)
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

    const newCardObject = {
        id: newDivID,
        xAxis: mouseX,
        yAxis: mouseY,
    };
    cardPositions.push(newCardObject);

    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));
    
}


function createYellowCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-yellow${randomID}`; 
    newDiv.id = newDivID;
    newDiv.classList.add("card-yellow")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Go crazy with notetaking!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `yellow-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const yellowCardDelete = document.getElementById(`yellow-card_delete${randomID}`);

    const newCardObject = {
        id: newDivID,
        xAxis: mouseX,
        yAxis: mouseY,
    };
    cardPositions.push(newCardObject);

    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));

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

    const newCardObject = {
        id: newDivID,
        xAxis: mouseX,
        yAxis: mouseY,
    };
    cardPositions.push(newCardObject);

    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));

}

function createRedCard() {

    const newDiv = document.createElement("div");
    const randomID = Math.floor(Math.random() * 100)
    const newDivID = `card-red${randomID}`; 
    newDiv.id = newDivID;
    newDiv.classList.add("card-red")
    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("card-text")
    newTextArea.placeholder = "Go note take yourself!";
    newDiv.appendChild(newTextArea);

    const newIconBox = document.createElement("div");
    newIconBox.id = `red-card_delete${randomID}`;
    newIconBox.classList.add("card-icon");
    newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
    newDiv.appendChild(newIconBox);

    const currentContainer = document.getElementById("container");
    currentContainer.appendChild(newDiv)
    const redCardDelete = document.getElementById(`red-card_delete${randomID}`);

    const newCardObject = {
        id: newDivID,
        xAxis: mouseX,
        yAxis: mouseY,
    };
    cardPositions.push(newCardObject);

    localStorage.setItem("cardPositionGroup", JSON.stringify(cardPositions));

}

function loadCardPositions() {

    const storedPositions = JSON.parse(localStorage.getItem('cardPositionGroup'));

    if (cardPositions) {
        storedPositions.forEach(cardPosition => {

            const storedID = cardPosition.id || "";

            const blueDetection = storedID.includes("blue");
            const yellowDetection = storedID.includes("yellow");
            const redDetection = storedID.includes("red");
            const orangeDetection = storedID.includes("orange");

            if (blueDetection) {
                console.log("blue card has been detected here!")
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
                newTextArea.value = `${cardPosition.text}`;

                // need to add conditional logic so that when there is no text it reverts to placeholder value for the textarea

                if (cardPositions.length > 0) {
                    const lastCardIndex = cardPositions.length - 1;
                    cardPositions[lastCardIndex].xAxis = cardPosition.xAxis;
                    cardPositions[lastCardIndex].yAxis = cardPosition.yAxis;
                    cardPositions[lastCardIndex].text = cardPosition.text;
                }
            }

            if (yellowDetection) {
                console.log("yellow card has been detected here!")

                let newDiv = document.createElement("div");
                const newDivID = cardPosition.id;
                newDiv.id = newDivID;
                newDiv.classList.add("card-yellow")
                const newTextArea = document.createElement("textarea");
                newTextArea.classList.add("card-text")
                newTextArea.placeholder = "Go crazy with notetaking!";
                newDiv.appendChild(newTextArea);

                const newIconBox = document.createElement("div");
                newIconBox.id = `yellow-card_delete${newDivID}`;
                newIconBox.classList.add("card-icon");
                newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
                newDiv.appendChild(newIconBox);

                const currentContainer = document.getElementById("container");
                currentContainer.appendChild(newDiv)
                const yellowCardDelete = document.getElementById(`yellow-card_delete${newDivID}`);
                yellowCardDelete.style.display = "none";

                newDiv.style.left = `${cardPosition.xAxis}px`;
                newDiv.style.top = `${cardPosition.yAxis}px`;
                newTextArea.value = `${cardPosition.text}`;

                if (cardPositions.length > 0) {
                    const lastCardIndex = cardPositions.length - 1;
                    cardPositions[lastCardIndex].xAxis = cardPosition.xAxis;
                    cardPositions[lastCardIndex].yAxis = cardPosition.yAxis;
                    cardPositions[lastCardIndex].text = cardPosition.text;
                }

            }

            if (redDetection) {
                console.log("red card has been detected here!")

                let newDiv = document.createElement("div");
                const newDivID = cardPosition.id;
                newDiv.id = newDivID;
                newDiv.classList.add("card-red")
                const newTextArea = document.createElement("textarea");
                newTextArea.classList.add("card-text")
                newTextArea.placeholder = "Go note take yourself!";
                newDiv.appendChild(newTextArea);

                const newIconBox = document.createElement("div");
                newIconBox.id = `red-card_delete${newDivID}`;
                newIconBox.classList.add("card-icon");
                newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
                newDiv.appendChild(newIconBox);

                const currentContainer = document.getElementById("container");
                currentContainer.appendChild(newDiv)
                const redCardDelete = document.getElementById(`red-card_delete${newDivID}`);
                redCardDelete.style.display = "none";

                newDiv.style.left = `${cardPosition.xAxis}px`;
                newDiv.style.top = `${cardPosition.yAxis}px`;
                newTextArea.value = `${cardPosition.text}`;

                if (cardPositions.length > 0) {
                    const lastCardIndex = cardPositions.length - 1;
                    cardPositions[lastCardIndex].xAxis = cardPosition.xAxis;
                    cardPositions[lastCardIndex].yAxis = cardPosition.yAxis;
                    cardPositions[lastCardIndex].text = cardPosition.text;
                }

            }

            if (orangeDetection) {
                console.log("orange card has been detected here!")

                let newDiv = document.createElement("div");
                const newDivID = cardPosition.id;
                newDiv.id = newDivID;
                newDiv.classList.add("card-orange")
                const newTextArea = document.createElement("textarea");
                newTextArea.classList.add("card-text")
                newTextArea.placeholder = "Express yourself!";
                newDiv.appendChild(newTextArea);

                const newIconBox = document.createElement("div");
                newIconBox.id = `orange-card_delete${newDivID}`;
                newIconBox.classList.add("card-icon");
                newIconBox.innerHTML += '<i class="iconoir-trash-solid"></i>';
                newDiv.appendChild(newIconBox);

                const currentContainer = document.getElementById("container");
                currentContainer.appendChild(newDiv)
                const orangeCardDelete = document.getElementById(`orange-card_delete${newDivID}`);
                orangeCardDelete.style.display = "none";

                newDiv.style.left = `${cardPosition.xAxis}px`;
                newDiv.style.top = `${cardPosition.yAxis}px`;
                newTextArea.value = `${cardPosition.text}`;

                if (cardPositions.length > 0) {
                    const lastCardIndex = cardPositions.length - 1;
                    cardPositions[lastCardIndex].xAxis = cardPosition.xAxis;
                    cardPositions[lastCardIndex].yAxis = cardPosition.yAxis;
                    cardPositions[lastCardIndex].text = cardPosition.text;
                }

            }

        });
    }
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

function initialCameraView() {

    const canvasContainer = document.getElementById("container");

    const containerWidth = canvasContainer.offsetWidth;
    const containerHeight = canvasContainer.offsetHeight;

    // Center the view
    window.scrollTo({
        left: (containerWidth / 2),
        top: (containerHeight / 2),
        behavior: 'smooth'
    });
}

document.addEventListener("DOMContentLoaded", function(){
    loadCardPositions();
    initialCameraView();
});

const container = document.getElementById("container")
document.addEventListener("keydown", canvasZoom);

// console.log(container)


function canvasZoom(e) {

    console.log("zoom function triggered")

    if(e.code === "Equal") {
        console.log("increase action")
        container.classList.add("canvas_scale_1");
    } else if (e.code === "Minus") {
        console.log("decrease action")
        container.classList.add("canvas_scale-1");
    };

};


// things to do within the file
// - zoom in and out of board
// - profile/auth for app
// - cloud saving