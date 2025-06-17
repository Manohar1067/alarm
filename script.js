let alarmTimeout;
let alarmAudio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
alarmAudio.loop = true;

function updateCurrentTime() {
  const format = document.getElementById("formatSelector").value;
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  let display;

  if (format === "12") {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    display = `${hours}:${minutes}:${seconds} ${ampm}`;
  } else {
    display = `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  }

  document.getElementById("currentTime").textContent = display;
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime();

function setAlarm() {
  const hour = parseInt(document.getElementById("alarmHour").value);
  const minute = parseInt(document.getElementById("alarmMinute").value);
  const amPm = document.getElementById("amPm").value;
  const status = document.getElementById("status");

  if (isNaN(hour) || isNaN(minute)) {
    alert("Please enter a valid alarm time.");
    return;
  }

  let alarmHour = hour % 12;
  if (amPm === "PM") alarmHour += 12;

  const now = new Date();
  const alarmTime = new Date(now);
  alarmTime.setHours(alarmHour, minute, 0, 0);

  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const timeToAlarm = alarmTime - now;

  clearTimeout(alarmTimeout);
  status.textContent = `✅ Alarm set for ${alarmTime.toLocaleTimeString()}`;

  alarmTimeout = setTimeout(() => {
    ringAlarm();
  }, timeToAlarm);
}

function ringAlarm() {
  document.getElementById("status").textContent = "⏰ Alarm ringing!";
  document.getElementById("alarmPopup").style.display = "flex";

  alarmAudio.play().catch((err) => {
    console.error("Autoplay failed:", err);
    alert("Please click the screen once to allow sound.");
  });
}

function stopAlarm() {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  document.getElementById("alarmPopup").style.display = "none";
  document.getElementById("status").textContent = "🔕 Alarm stopped";
}
