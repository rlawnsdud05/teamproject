//import 연습
import v, { a, c as d } from './exExercise';

//알 수 있는 점
//default로 export한 경우
//{ } 없이 import 가능하다. & 사용할 수 있는 변수명도 import하는 쪽에서 마음대로 지을 수 있다.
console.log(v);
console.log(a);
console.log(c);
//2.import 할 시 {}안에 import할 것 넣어줘야함 변수명도 그래도 사용해야 하지만 바꾸고 싶다면 as 원하는 변수명 을 써서 변수명을 바꿔서 사용할 수 있다.
