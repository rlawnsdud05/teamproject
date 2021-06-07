import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';


const ContactForm = () => {

	const dispatch = useDispatch();

	const inputName = useRef();
	const inputPhone = useRef();
	const inputEmail = useRef();

	const add = () => {
		
		//dispatch <= action
		dispatch({
			type: "ADD_PERSONINFO", 
			payload: { id: new Date().getTime(), name: inputName.current.value, phone: inputPhone.current.value, eMail: inputEmail.current.value}
		});

		inputName.current.value = '';
		inputPhone.current.value = '';
		inputEmail.current.value = '';

	}


	return (
		<div>
			<TextField type='text' label="이름" inputRef={inputName} />
			<TextField type='text' label="전화번호" inputRef={inputPhone} />
			<TextField type='text' label="e-mail" inputRef={inputEmail} />
			
			{/*왜 onClick에서 함수 내용에 함수를 넣어야하지? */}
			<Button color='primary' onClick={() => { add(); }}>입력</Button>
			
		</div>
	);
}

export default ContactForm;