let newX = 0, newY = 0, startX = 0, startY = 0;

const yellowCard = document.getElementById("card-yellow");

yellowCard.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
};

function mouseMove(e){
    newX = startX - e.clientX 
    newY = startY - e.clientY 
  
    startX = e.clientX
    startY = e.clientY

    yellowCard.style.top = (yellowCard.offsetTop - newY) + 'px'
    yellowCard.style.left = (yellowCard.offsetLeft - newX) + 'px'
};

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
};