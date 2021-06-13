import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';

const ContactTableRow = ({personInfo}) => {

	const [isEdit, setIsEdit] = useState(personInfo.isEdit);

	const inputName = useRef();
	const inputPhone = useRef();
	const inputEmail = useRef();


	//1. 수정할 값 state 업데이트 = dispatch action(수정할 값)
	const dispatch = useDispatch();

	
	const save = (id) => {
		console.log(id);
		dispatch({
			type: "SAVE_MODEFIED_PERSONINFO", 
			payload: { id: id, name: inputName.current.value, phone: inputPhone.current.value, eMail: inputEmail.current.value }
		});
	}

	const remove = (id) => {
		console.log(id);
		dispatch({
			type: "REMOVE_PERSONINFO",
			payload: id
		});
	}

	
	

	return (
		<TableRow>

			<TableCell scope="row">{isEdit ? <TextField inputRef={inputName} defaultValue={personInfo.name} /> : personInfo.name}</TableCell>
			<TableCell align="center">{isEdit ? <TextField inputRef={inputPhone} defaultValue={personInfo.phone} /> : personInfo.phone}</TableCell>
			<TableCell align="center">{isEdit ? <TextField inputRef={inputEmail} defaultValue={personInfo.eMail} /> : personInfo.eMail}</TableCell>

			<TableCell align="center" >
				{!isEdit && <Button color="primary" onClick={() => { setIsEdit(true); }}>수정</Button>}
				{!isEdit && <Button color="primary" onClick={() => { remove(personInfo.id); }}>삭제</Button>}

				{/* 수정모드 시 나타나는 버튼 */}
				{isEdit && <Button color="primary" onClick={() => { save(personInfo.id); setIsEdit(false); }}>저장</Button>}
				{isEdit && <Button color="primary" onClick={() => { setIsEdit(false); }}>취소</Button>}
			</TableCell>

		</TableRow>
	);
}

export default ContactTableRow;