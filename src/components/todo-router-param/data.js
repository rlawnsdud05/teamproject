
const list = [
	{ id: 1, memo: "React 공부하기" },
	{ id: 2, memo: "Javascript 연습하기" },
];

// javascript 객체를 export할 때 list 안에 list가 들어있다.
// {list : list} -> 속성과 속성값의 이름이 동일하면 중괄호 안에 이름만 적어주면됨
export { list };