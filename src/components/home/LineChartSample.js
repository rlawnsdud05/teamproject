import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartSample = ({ data }) => {
	console.log(data);
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="dataTime" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="pm10" stroke="#8884d8" activeDot={{ r: 8 }} />
				<Line type="monotone" dataKey="pm25" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default LineChartSample;