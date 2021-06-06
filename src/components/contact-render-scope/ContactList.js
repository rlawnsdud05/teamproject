import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ContactItem from './ContactItem';

const ContactList = ({ tbody, contactList, onInputRemove, onInputModify, onInputSave, onInputCancel }) => {

	return (
		<div>
			<TableContainer component={Paper}>

				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>이름</TableCell>
							<TableCell align="center">전화번호</TableCell>
							<TableCell align="center">e-mail</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>

					<TableBody ref={tbody}>
						{contactList.map((personInfo, outerIndex) => (

							/*입력된 데이터 뿌려지는 테이블 목록 */
							<ContactItem
								outerIndex={outerIndex}
								personInfo={personInfo}
								onInputRemove={onInputRemove}
								onInputModify={onInputModify}
								onInputSave={onInputSave}
								onInputCancel={onInputCancel}
							/>
						))}
					</TableBody>

				</Table>


			</TableContainer>
		</div>
	);
}

export default ContactList;