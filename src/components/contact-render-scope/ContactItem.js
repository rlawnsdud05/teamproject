import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ContactItem = ({ outerIndex, personInfo, onInputRemove, onInputModify, onInputSave, onInputCancel }) => {

	return (
		<TableRow key={outerIndex}>
			<TableCell scope="row">
				{personInfo.isEdit ? <TextField defaultValue={personInfo.name} /> : personInfo.name}

				{/*{personInfo.isEdit ? <input defaultValue={personInfo.name} /> : personInfo.name}*/}
			</TableCell>
			<TableCell align="center">{personInfo.isEdit ? <TextField defaultValue={personInfo.phone} /> : personInfo.phone}</TableCell>
			<TableCell align="center">{personInfo.isEdit ? <TextField defaultValue={personInfo.eMail} /> : personInfo.eMail}</TableCell>
			<TableCell align="center" >
				{!personInfo.isEdit && <Button color="primary" onClick={() => { onInputModify(outerIndex); }}>수정</Button>}
				{personInfo.isEdit && <Button color="primary" onClick={() => { onInputSave(outerIndex); }}>저장</Button>}
				{personInfo.isEdit && <Button color="primary" onClick={() => { onInputCancel(outerIndex); }}>취소</Button>}
				{!personInfo.isEdit && <Button color="primary" onClick={() => { onInputRemove(outerIndex); }}>삭제</Button>}
			</TableCell>
		</TableRow>
	);
}

export default ContactItem;