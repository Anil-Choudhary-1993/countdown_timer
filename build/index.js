"use strict";
const DateTimer = document.querySelector("input[name='date-timer'");
const TimerDetails = document.querySelector(".timer-details");
const DaysContent = TimerDetails === null || TimerDetails === void 0 ? void 0 : TimerDetails.querySelector(".days");
const HoursContent = TimerDetails === null || TimerDetails === void 0 ? void 0 : TimerDetails.querySelector(".hours");
const MinutesContent = TimerDetails === null || TimerDetails === void 0 ? void 0 : TimerDetails.querySelector(".minutes");
const SecondsContent = TimerDetails === null || TimerDetails === void 0 ? void 0 : TimerDetails.querySelector(".seconds");
const ClearButton = document.querySelector(".clear");
const HelperElement = document.querySelector(".helper");
let timer;
function showTimerHelper(show) {
    HelperElement.className = show ? "helper-show" : "helper-hide";
}
function showTimerDetails(show) {
    TimerDetails.className = show ? "timer-started" : "timer-cleared";
}
function reset() {
    showTimerDetails(false);
    showTimerHelper(true);
    DateTimer.value = "";
    clearInterval(timer);
    sessionStorage.removeItem("selected_date");
}
const savedDate = sessionStorage.getItem("selected_date");
if (savedDate && timer === undefined) {
    DateTimer.value = savedDate;
    startClock(savedDate);
    showTimerHelper(false);
}
else {
    showTimerHelper(true);
}
DateTimer === null || DateTimer === void 0 ? void 0 : DateTimer.addEventListener("change", function (e) {
    e.preventDefault();
    clearInterval(timer);
    startClock(this.value);
    showTimerHelper(false);
    showTimerDetails(true);
});
ClearButton === null || ClearButton === void 0 ? void 0 : ClearButton.addEventListener("click", function (e) {
    updateContent();
    reset();
});
function startClock(date) {
    sessionStorage.setItem("selected_date", date);
    function startTimer() {
        const time = timeRemaining(date);
        updateContent(time.days, time.hours, time.minutes, time.seconds);
    }
    startTimer();
    timer = setInterval(startTimer, 1000);
}
function getClassName(value, element) {
    return ![value, undefined, "", null].includes(element.innerHTML) ? "change-effect" : "";
}
function updateContent(days = "0", hours = "0", minutes = "0", seconds = "0") {
    DaysContent.className = getClassName(days, DaysContent);
    HoursContent.className = getClassName(hours, HoursContent);
    MinutesContent.className = getClassName(minutes, MinutesContent);
    SecondsContent.className = getClassName(seconds, SecondsContent);
    DaysContent.innerHTML = days;
    HoursContent.innerHTML = hours;
    MinutesContent.innerHTML = minutes;
    SecondsContent.innerHTML = seconds;
    if (days === "0" && hours === "0" && minutes === "0" && seconds === "0") {
        reset();
    }
}
function timeRemaining(date) {
    let seconds = Math.floor((Date.parse(date) - new Date().getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    if (days < 0) {
        return {
            days: "0",
            hours: "0",
            minutes: "0",
            seconds: "0",
        };
    }
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    return {
        days: `0${days}`.slice(-2),
        hours: `0${hours}`.slice(-2),
        minutes: `0${minutes}`.slice(-2),
        seconds: `0${seconds}`.slice(-2),
    };
}
