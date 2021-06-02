import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ContactForm = ({ name, phone, eMail, onInputAdd }) => {

	return (
		<div>
			<TextField type='text' label="이름" inputRef={name} />
			<TextField type='text' label="전화번호" inputRef={phone} />
			<TextField type='text' label="e-mail" inputRef={eMail} />
			{/* 
							<input type='text' placeholder='이름' ref={name} />
							<input type='text' placeholder='전화번호' ref={phone} />
							<input type='text' placeholder='e-mail' ref={eMail} />*/}
			{/*왜 onClick에서 함수 내용에 함수를 넣어야하지? */}
			<Button color='primary' onClick={() => { onInputAdd(); }}>입력</Button>
			{/* <button onClick={() => {onInputAdd();}}>입력</button>*/}
		</div>
	);
}

export default ContactForm;