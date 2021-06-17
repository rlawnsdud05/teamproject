//export 연습

const a = 1;
const b = 2;

//1. 객체로 export하기
export { a };

//2. default로 export 하기 = default export하면 {}없이 import 가능하다
export default b;

//3. 초기화와 동시에 export하기
export const c = 3;

