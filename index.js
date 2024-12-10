const addTimerButton = document.getElementById('add-timer');
const timeInput = document.getElementById('time-input');
const timersBlock = document.getElementById('timers');
const template = document.getElementById('template');

addTimerButton.addEventListener('click', () => {
    addTimer(timeInput.value)
})

function addTimer(time) {
    const newTimer = template.content.firstElementChild.cloneNode(true);
    const deleteTimerButton = newTimer.querySelector('.timer__delete-timer');
    let timeCopy = time;

    appendText(newTimer, timeCopy);
    timersBlock.appendChild(newTimer);

    const intervalId = setInterval(()=>{
        timeCopy = timeCopy - 1;
        appendText(newTimer, timeCopy)
    }, 1000);

    setTimeout(()=>{
        removeChildNode(newTimer);
        clearInterval(intervalId);
    }, time*1000 + 1000);

    deleteTimerButton.addEventListener('click', () => {
        removeChildNode(newTimer);
        clearInterval(intervalId);
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
}

function removeChildNode(node) {
    node.parentNode.removeChild(node);
}

function appendText(node, text){
    node.querySelector('.timer__text').innerText = formatTime(text);
}