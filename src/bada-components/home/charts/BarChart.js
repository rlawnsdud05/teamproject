import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SeaWaterBarChart = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height="80%">
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="해수욕장명" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="장구균수" fill="#8884d8" />
				<Bar dataKey="대장균수" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer >
	);
}
export default SeaWaterBarChart;