const DateTimer: HTMLInputElement = document.querySelector("input[name='date-timer'")!;
const TimerDetails: HTMLDivElement = document.querySelector(".timer-details")!;
const DaysContent: HTMLSpanElement = TimerDetails?.querySelector(".days")!;
const HoursContent: HTMLSpanElement = TimerDetails?.querySelector(".hours")!;
const MinutesContent: HTMLSpanElement = TimerDetails?.querySelector(".minutes")!;
const SecondsContent: HTMLSpanElement = TimerDetails?.querySelector(".seconds")!;
const ClearButton: HTMLButtonElement = document.querySelector(".clear")!;
const HelperElement: HTMLDivElement = document.querySelector(".helper")!;

let timer: number | undefined;

function showTimerHelper(show: boolean) {
    HelperElement.className = show ? "helper-show" : "helper-hide";
}

function showTimerDetails(show: boolean) {
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
} else {
    showTimerHelper(true);
}


DateTimer?.addEventListener("change", function (this: HTMLDataElement, e) {
    e.preventDefault();
    clearInterval(timer);
    startClock(this.value);
    showTimerHelper(false);
    showTimerDetails(true);
})

ClearButton?.addEventListener("click", function (e) {
    updateContent();
    reset();
})

type Time = {
    days: string,
    hours: string,
    minutes: string,
    seconds: string,
};

function startClock(date: string): void {
    sessionStorage.setItem("selected_date", date);
    function startTimer() {
        const time: Time = timeRemaining(date);
        updateContent(time.days, time.hours, time.minutes, time.seconds)
    }
    startTimer();
    timer = setInterval(startTimer, 1000);
}

function getClassName(value: string, element: HTMLSpanElement): string {
    return ![value, undefined, "", null].includes(element.innerHTML) ? "change-effect" : "";
}

function updateContent(days: string = "0", hours: string = "0", minutes: string = "0", seconds: string = "0"): void {
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

function timeRemaining(date: string): Time {
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
        }
    }

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return {
        days: `0${days}`.slice(-2),
        hours: `0${hours}`.slice(-2),
        minutes: `0${minutes}`.slice(-2),
        seconds: `0${seconds}`.slice(-2),
    }
}