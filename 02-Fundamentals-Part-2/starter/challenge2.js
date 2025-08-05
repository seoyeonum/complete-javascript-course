/*
CHALLENGE #2
Steven wants you to improve his tip calculator, using the same rules as before — tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

Your tasks:

Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

And now let's use arrays! So, create an array called bills containing the test data below.

Create an array called tips containing the tip value for each bill, calculated from the function you created before.

BONUS: Create an array totals containing the total values, so the bill + tip.

TEST DATA: 125, 555, and 44.



👋 OPTIONAL: You can watch my solution in video format in the next lecture
*/

/* Write your code below. Good luck! 🙂 */

// const calcTip = (billValue) => {
//   billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
// };
// → 중괄호를 쓰면 block function 이 되므로 return 이 필요함
// 아무것도 쓰지 않았으므로 undefined 를 반환하는 것!
// 반면, 아래와 같이 중괄호 없이 쓰면 암시적 반환(implicit return)이 적용됨

const calcTip = (billValue) =>
  billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
// console.log(calcTip(100));

const bills = new Array(125, 555, 44);
// console.log(bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(tips);

// BONUS
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips);
console.log(totals);
