// Exporting module
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

// 1. export 로 내보내기
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq }; // 2)

// 2. default 로 내보내기
// : 변수명이 아닌, function value 그 자체를 내보낸댜.

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
