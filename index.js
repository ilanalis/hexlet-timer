const addTimerButton = document.getElementById('add-timer');
const timeInput = document.getElementById('time-input');
const timersBlock = document.getElementById('timers');
const template = document.getElementById('template');

addTimerButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTimer(timeInput.value)
})

function addTimer(time) {
    const newTimer = template.content.firstElementChild.cloneNode(true);
    const deleteTimerButton = newTimer.querySelector('.delete-timer-button');
    let timeCopy = time;

    appendText(newTimer, timeCopy);
    timersBlock.appendChild(newTimer);
    makeTimerVisible(newTimer);
    const intervalId = setInterval(()=>{
        timeCopy = timeCopy - 1;
        appendText(newTimer, timeCopy)
    }, 1000);

    setTimeout(()=>{
        removeChildNode(newTimer);
        clearInterval(intervalId);
    }, time*1000 + 500);

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

function makeTimerVisible(newTimer) {
    setTimeout(() => {
        newTimer.classList.remove('hidden');
        newTimer.classList.add('visible');
    }, 10); // Задержка на выполнение анимации
}

function removeChildNode(node) {
    node.classList.remove('visible');
    node.classList.add('hidden');
    setTimeout(()=>{
        node.parentNode.removeChild(node);
    }, 200)
}

function appendText(node, text){
    node.querySelector('.timer-text').innerText = formatTime(text);
}