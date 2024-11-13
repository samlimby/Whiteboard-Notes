let newX = JSON.parse(localStorage.getItem("cardPositionX"));
let newY = JSON.parse(localStorage.getItem("cardPositionY"));

let cardPosition =  {
    x: JSON.parse(localStorage.getItem("cardPositionX")) || 0,
    y: JSON.parse(localStorage.getItem("cardPositionY")) || 0
};

requestAnimationFrame(() => {
    yellowCard.style.left = cardPosition.x + 'px';
    yellowCard.style.top = cardPosition.y + 'px';
});

let startX, startY;

const yellowCardGroup = [];

const yellowCard = document.getElementById("card-yellow");

yellowCard.style.top = cardPosition.x + 'px'
yellowCard.style.left = cardPosition.y + 'px'

yellowCard.addEventListener('mousedown', mouseDown)

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    const deltaX = startX - e.clientX;
    const deltaY = startY - e.clientY;
  
    startX = e.clientX;
    startY = e.clientY;

    const newTop = yellowCard.offsetTop - deltaY;
    const newLeft = yellowCard.offsetLeft - deltaX;
    
    yellowCard.style.top = newTop + 'px';
    yellowCard.style.left = newLeft + 'px';

    localStorage.setItem("cardPositionX", JSON.stringify(newLeft));
    localStorage.setItem("cardPositionY", JSON.stringify(newTop));
}

function mouseUp() {
    document.removeEventListener('mousemove', mouseMove);
}



// things to do within the file
// - localStorage save
// - adding additional colors of post its
// - zoom in and out of board
// - type into post it notes
// - delete post it notes
// - profile/auth for app
// - cloud saving