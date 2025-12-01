function isWorkTime(workStartString, workEndString, meetingStartString, meetingTime) {
  const workStart = parseTime(workStartString);
  const workEnd = parseTime(workEndString);
  const meetingStart = parseTime(meetingStartString);
  const meetingEnd = addMinutes(meetingStart, meetingTime);
  if (compareTime(workStart, meetingStart) === 1) { return false; }
  if (compareTime(workEnd, meetingEnd) === -1) { return false; }
  return true;
}

function parseTime(time) {
  const separatorIndex = time.indexOf(':');
  const hoursString = time.slice(0, separatorIndex);
  const minutesString = time.slice(separatorIndex + 1);
  return {
    hours: parseInt(hoursString, 10),
    minutes: parseInt(minutesString, 10)
  };
}

function addMinutes(time, minutes) {
  const minutesSum = time.minutes + minutes;
  const newTime = {};
  newTime.hours = time.hours + Math.floor(minutesSum / 60);
  newTime.minutes = minutesSum % 60;
  return newTime;
}

function compareTime(a, b) {
  if (a.hours > b.hours) {return 1;}
  if (a.hours === b.hours && a.minutes > b.minutes) {return 1;}
  if (a.hours === b.hours && a.minutes === b.minutes) {return 0;}
  return -1;
}
