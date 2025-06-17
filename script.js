let alarmTime = null;
let alarmTimeout = null;
let is24Hour = false;

const currentTimeDisplay = document.getElementById("current-time");
const alarmPopup = document.getElementById("alarm-popup");
const alarmAudio = document.getElementById("alarm-audio");

function updateTime() {
  const now = new Date();

  const formatToggle = document.getElementById("format-toggle").value;
  is24Hour = formatToggle === "24";

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let displayHours = is24Hour ? hours : ((hours % 12) || 12);
  const period = hours >= 12 ? "PM" : "AM";

  const timeString = `${pad(displayHours)}:${pad(minutes)}:${pad(seconds)}${is24Hour ? "" : " " + period}`;
  currentTimeDisplay.textContent = timeString;

  const currentAlarmCompare = `${pad(displayHours)}:${pad(minutes)} ${period}`;
  if (alarmTime === currentAlarmCompare && alarmPopup.style.display !== "flex") {
    triggerAlarm();
  }
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function setAlarm() {
  const hour = parseInt(document.getElementById("alarm-hour").value);
  const minute = parseInt(document.getElementById("alarm-minute").value);
  const period = document.getElementById("alarm-period").value;

  if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
    alert("Please enter a valid time.");
    return;
  }

  alarmTime = `${pad(hour)}:${pad(minute)} ${period}`;
  alert(`Alarm set for ${alarmTime}`);
}

function triggerAlarm() {
  alarmPopup.style.display = "flex";
  alarmAudio.play();
}

function stopAlarm() {
  alarmPopup.style.display = "none";
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  alarmTime = null;
}

setInterval(updateTime, 1000);
