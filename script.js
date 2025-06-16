// script.js
document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('time-display');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const stopAlarmButton = document.getElementById('stop-alarm');
    const alarmStatus = document.getElementById('alarm-status');
    let alarmTimeout;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function checkAlarm() {
        const now = new Date();
        const alarmTime = new Date(now.toDateString() + ' ' + alarmTimeInput.value);

        if (now >= alarmTime) {
            alarmStatus.textContent = 'Alarm is ringing!';
            stopAlarmButton.disabled = false;
            // You can add sound or other effects here
        } else {
            const timeUntilAlarm = alarmTime - now;
            alarmTimeout = setTimeout(checkAlarm, timeUntilAlarm);
        }
    }

    setAlarmButton.addEventListener('click', function() {
        if (!alarmTimeInput.value) {
            alert('Please set a valid time for the alarm.');
            return;
        }

        clearTimeout(alarmTimeout);
        alarmStatus.textContent = 'Alarm set for ' + alarmTimeInput.value;
        stopAlarmButton.disabled = true;
        checkAlarm();
    });

    stopAlarmButton.addEventListener('click', function() {
        clearTimeout(alarmTimeout);
        alarmStatus.textContent = 'Alarm stopped.';
        stopAlarmButton.disabled = true;
    });

    setInterval(updateTime, 1000);
    updateTime();
});