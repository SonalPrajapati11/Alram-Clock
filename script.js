// Selecting necessary DOM elements
const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

// Initializing variables
let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");

// Populating the hour select dropdown with options
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating the minute select dropdown with options
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating the AM/PM select dropdown with options
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Setting up the current time display
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Playing the ringtone if the alarm time matches the current time
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

// Function to set/clear the alarm
function setAlarm() {
    if (isAlarmSet) { // If alarm is already set, clear it
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) { // If a valid time is not selected, show an alert
        return alert("Please, select a valid time to set Alarm!");
    }

    // Set the alarm and update UI accordingly
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

// Event listener to call the setAlarm function when the "Set Alarm" button is clicked
setAlarmBtn.addEventListener("click", setAlarm);
