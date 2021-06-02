import { Save } from "@material-ui/icons";
import { useRef, useState } from "react";
import ContactForm from "../contact-render-scope/ContactForm";
import ContactList from "../contact-render-scope/ContactList";


const ContactContainer = () => {

	const [contactList, setContactList] = useState([]);

	const name = useRef();
	const phone = useRef();
	const eMail = useRef();
	const tbody = useRef();

	const handleInputAdd = () => {
		console.log(name.current.value);
		setContactList([{ name: name.current.value, phone: phone.current.value, eMail: eMail.current.value }, ...contactList]);
		name.current.value = '';
		phone.current.value = '';
		eMail.current.value = '';
	}

	const handleInputRemove = (outerIndex) => {
		//console.log('삭제');
		setContactList(contactList.filter((personInfo, innerIndex) => innerIndex !== outerIndex));
	}

	const handleInputModify = (outerIndex) => {

		setContactList(contactList.map((personInfo, innerIndex) => {

			if (outerIndex === innerIndex) {
				personInfo.isEdit = true;
			}

			return personInfo;
		}));
	}

	const handleInputSave = (outerIndex) => {
		setContactList(contactList.map((personInfo, innerIndex) => {
			//console.log(tbody);
			console.log(tbody.current);
			//console.log(tbody.current.children[outerIndex]);
			//console.log(tbody.current.children[outerIndex].children[0]);
			//console.log(tbody.current.children[outerIndex].children[0].querySelector('input').value);

			if (outerIndex === innerIndex) {
				personInfo.name = tbody.current.children[outerIndex].children[0].querySelector('input').value;
				personInfo.phone = tbody.current.children[outerIndex].children[1].querySelector('input').value;
				personInfo.eMail = tbody.current.children[outerIndex].children[2].querySelector('input').value;
				delete personInfo.isEdit;
			}

			return personInfo;
		}));
	}

	const handleInputCancel = (outerIndex) => {
		setContactList(contactList.map((personInfo, innerIndex) => {
			if (outerIndex === innerIndex) {
				personInfo.isEdit = false;
			}
			return personInfo
		}));
	}

	return (
		<>
			<ContactForm
				name={name}
				phone={phone}
				eMail={eMail}
				onInputAdd={handleInputAdd}
			/>

			<ContactList
				tbody={tbody}
				contactList={contactList}
				onInputRemove={handleInputRemove}
				onInputModify={handleInputModify}
				onInputSave={handleInputSave}
				onInputCancel={handleInputCancel}
			/>



		</>
	);

}

export default ContactContainer;