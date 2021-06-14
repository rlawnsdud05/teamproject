import axios from 'axios';

const contactApi = {

	add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/contacts`, data),
	save: (data) => axios.put(`${process.env.REACT_APP_API_BASE}/contacts/${data.id}`, data),
	remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/contacts`)

}
export default contactApi;