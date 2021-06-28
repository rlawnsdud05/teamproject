import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SeaWaterBarChart = ({ data }) => {
	return (

		<BarChart width={730} height={250} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="해수욕장명" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="장구균수" fill="#8884d8" />
			<Bar dataKey="대장균수" fill="#82ca9d" />
		</BarChart>
	);
}
export default SeaWaterBarChart;