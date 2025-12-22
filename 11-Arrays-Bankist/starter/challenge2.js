// Coding Challenge #2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula:
if the dog is <= 2 years old, humanAge = 2 * dogAge.
If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  // 1. 사람 나이로 변환
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + 4 * age));
  console.log(humanAges);

  // 2. (사람 나이) 18세 미만 나이 배제
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);

  // 3. 평균 나이 구하기
  // (방법1)
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  // (방법2)
  // 아래와 같이 각 값을 길이로 나눈 뒤 더해줘도 평균을 구할 수 있다.
  // 2 3. (2+3)/2 = 2.5. 2/2 + 3/2 = 2.5
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
