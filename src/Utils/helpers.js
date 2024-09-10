import {
  add,
  addDays,
  differenceInSeconds,
  format,
  isAfter,
  isSameSecond,
  parseISO,
  startOfISOWeek,
} from "date-fns";
import { STATUS } from "./constants";
export function estimateCompletedAt(startAt, duration) {
  // Parse the startAt string to a Date object
  const startDate = parseISO(startAt);

  // Split the duration string into hours, minutes, and seconds
  const [hours, minutes, seconds] = duration.split(":").map(Number);

  // Add the duration to the start date
  const completedAt = add(startDate, {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  // Return the completed date
  return completedAt;
}

export function getCompletionStatus(estimatedCompletedAt, actualCompletedAt) {
  // Parse the date strings to Date objects
  const estimatedDate = parseISO(estimatedCompletedAt);
  const actualDate = parseISO(actualCompletedAt);

  // Compare the dates
  if (
    isAfter(actualDate, estimatedDate) &&
    !isSameSecond(actualDate, estimatedDate)
  ) {
    return "OVERDUE";
  } else {
    return "PUNCTUAL";
  }
}

export function timeLeft(estimatedCompletedAt) {
  // Parse the estimatedCompletedAt string to a Date object if it's not already
  const estimatedDate =
    typeof estimatedCompletedAt === "string"
      ? parseISO(estimatedCompletedAt)
      : estimatedCompletedAt;

  // Get the current time
  const now = new Date();

  // Calculate the difference in seconds
  let diffInSeconds = differenceInSeconds(estimatedDate, now);

  if (diffInSeconds <= 0) {
    return "00:00:00";
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds %= 3600;
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  // Format the time components to ensure two digits
  const formatTime = (time) => time.toString().padStart(2, "0");

  // Return the formatted string
  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

export function getDaysInCurrentWeek() {
  const today = new Date();
  const startOfWeek = startOfISOWeek(today); // Get the start of the week (Monday)
  const days = [];

  // Loop through the week (0 to 6)
  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfWeek, i); // Get each day of the week
    days.push(format(day, "yyyy-MM-dd")); // Convert to Unix timestamp and add to array
  }

  return days;
}

export function calculateStudyTime(schedules) {
  return schedules.map((daySchedules) => {
    if (daySchedules.length === 0) {
      // If the day is empty, return 0
      return 0;
    }

    // Calculate total study time for the day
    const totalStudyTime = daySchedules.reduce((total, schedule) => {
      if (schedule.completed) {
        const startAt = new Date(schedule.startAt);
        const completedAt = new Date(schedule.completedAt);

        // Calculate the difference in milliseconds
        const timeDiff = completedAt - startAt; // in milliseconds

        // Add the time difference to the total (convert to hours)
        return total + timeDiff;
      }
      return total; // If not completed, return total unchanged
    }, 0);

    // Convert milliseconds to hours (or any other unit you need)
    return totalStudyTime ? totalStudyTime / (1000 * 60 * 60) : 0; // Convert to hours
  });
}

export function calculateTotalTasks(schedules) {
  return schedules.reduce((total, daySchedules) => {
    return total + daySchedules.length; // Add the number of tasks for each day
  }, 0);
}

const SUNDAY_VALUES = 1;
export function calculateTotalTasksForToday(schedules) {
  // Get the current day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday) so subtract the sunday
  const dayIndex = new Date().getDay() - SUNDAY_VALUES;
  return schedules[dayIndex].length;
}

export function calculateTaskStatusCounts(schedules) {
  const dayIndex = new Date().getDay() - SUNDAY_VALUES;
  const todaySchedule = schedules[dayIndex];

  const statusCounts = {
    TIMEOUT: 0,
    IN_PROCESS: 0,
    COMPLETED: 0,
    IS_PENDING: 0,
  };

  // Iterate through today's tasks and count statuses
  todaySchedule.forEach((task) => {
    switch (task.status) {
      case STATUS.COMPLETED:
        statusCounts.COMPLETED += 1;
        break;
      case STATUS.TIMEOUT:
        statusCounts.TIMEOUT += 1;
        break;
      case STATUS.IS_PENDING:
        statusCounts.IS_PENDING += 1;
        break;
      case STATUS.IN_PROCESS:
        statusCounts.IN_PROCESS += 1;
        break;
      default:
        break;
    }
  });

  return statusCounts;
}
