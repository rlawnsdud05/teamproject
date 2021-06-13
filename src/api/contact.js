import axios from 'axios';

const contactApi = {

	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/contacts`)

}
export default contactApi;