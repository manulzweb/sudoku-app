let timerSeconds = 0;
let timerInterval = null;

export function startTimer(callback) {
    stopTimer();
    timerSeconds = 0;
    if (callback) callback('00:00');
    
    timerInterval = setInterval(() => {
        timerSeconds++;
        if (callback) callback(getCurrentTime());
    }, 1000);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

export function getCurrentTime() {
    const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const s = String(timerSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}
