import axios from "axios";

const seaCommentApi = {
	add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/seawater-comment`, data),
	modify: (data) => axios.put(`${process.env.REACT_APP_API_BASE}/seawater-comment/${data.id}`, data),
	remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/seawater-comment/${id}`),
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/seawater-comment`),
}

export default seaCommentApi;