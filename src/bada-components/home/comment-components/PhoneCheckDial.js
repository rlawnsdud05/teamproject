//dialogue
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { useState } from 'react';

const PhoneCheckDial = ({ isOpen }) => {

	//const [open, setOpen] = useState(isOpen);
	//console.log(activation);

	return (
		<div>

			<Dialog open={isOpen} aria-labelledby="form-dialog-title">

				<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary">
						Cancel
					</Button>
					<Button color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default PhoneCheckDial;