import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SeaWaterLineChart = ({ data }) => {
	return (

		<LineChart width={730} height={250} data={data}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="조사일자" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="장구균수" stroke="#8884d8" />
			<Line type="monotone" dataKey="대장균수" stroke="#82ca9d" />
		</LineChart>

	);
}
export default SeaWaterLineChart;