const initialState = [
  {
    id: 1,
    name: '홍길동',
    phone: '010-0000-0000',
    eMail: 'hong@gmail.com',
  },
  {
    id: 2,
    name: '고길동',
    phone: '010-1111-1111',
    eMail: 'Ko@gmail.com',
  },
];


const contact = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_PERSONINFO":
      return [{ ...action.payload }, ...state];
    case "SAVE_MODEFIED_PERSONINFO":
      return state.map((personInfo) => personInfo.id === action.payload.id ? { ...action.payload } : personInfo);
    case "REMOVE_PERSONINFO":
      return state.filter((personInfo) => personInfo.id !== action.payload);
    default:
      return state;
  }


}

export default contact;