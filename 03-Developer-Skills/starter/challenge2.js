/*
Coding Challenge #2 with AI

Let's say you're building a time tracking application for freelancers.
At same point in building this app, you need a funtion
that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Wheter the week was full-time *worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]

GOOD LUCK 😀
*/

// Make more specific words
/*
I'm building a time tracking application for freelancers.
write a function called analyzeWorkWeek that receives an array of daily work hours for a certain week,
and returns an object with the following data.
1. Total hours worked
2. Average daily hours (round to one decimal place)
3. The day with the most hours worked (asume monday is day 0 in the array)
4. Number of days worked (days with more than 0 hours)
5. Whether the week was full-time (worked 35 hours or more)
*/

function analyzeWorkWeek(dailyHours) {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Validation: must have exactly 7 days
  if (!Array.isArray(dailyHours) || dailyHours.length !== 7) {
    throw new Error('Input must be an array of exactly 7 daily work hours.');
  }

  // 1. Total hours worked
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);

  // 2. Average daily hours (rounded to one decimal place)
  const averageDailyHours = Number((totalHours / dailyHours.length).toFixed(1));

  // 3. The day with the most hours worked
  const maxHours = Math.max(...dailyHours);
  const dayWithMostHours = daysOfWeek[dailyHours.indexOf(maxHours)];

  // 4. Number of days worked (more than 0 hours)
  const daysWorked = dailyHours.filter(hours => hours > 0).length;

  // 5. Full-time check (35 hours or more)
  const isFullTime = totalHours >= 35;

  return {
    totalHours,
    averageDailyHours,
    dayWithMostHours,
    daysWorked,
    isFullTime,
  };
}

// Example usage:
const sampleWeek = [7.5, 8, 6.5, 0, 8.5, 5, 0];
console.log(analyzeWorkWeek(sampleWeek));

const sampleWeek2 = [7.5, 8, 6.5, 0, 5];
console.log(analyzeWorkWeek(sampleWeek2));
