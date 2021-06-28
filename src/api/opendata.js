import axios from "axios";

const openDataApi = {
	fetchDustHourly: () => axios.get(`${process.env.REACT_APP_API_BASE}/opendata/dust/hourly`),
	fetchSeaWaterMonthly: () => axios.get(`${process.env.REACT_APP_API_BASE}/opendata/seawater/monthly`),
}

export default openDataApi;