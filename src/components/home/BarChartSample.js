import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartSample = ({ data }) => {

	const pm10Color = (val) => {
		let color = "#329fff";

		if (val > 30 && val <= 80) {
			color = "#00c73c";
		} else if (val > 80 && val <= 150) {
			color = "#fd9b5a";
		} else if (val > 150) {
			color = "#ff5959";
		}

		return color;
	};

	const pm25Color = (val) => {
		let color = "#329fff";

		if (val > 15 && val <= 35) {
			color = "#00c73c";
		} else if (val > 35 && val <= 75) {
			color = "#fd9b5a";
		} else if (val > 75) {
			color = "#ff5959";
		}

		return color;
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
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
				{/* x축에 name 속성 */}
				<XAxis dataKey="sido" fontSize='12px' />
				<YAxis />
				<Tooltip />{/*마우스 오버하면 나오는 것 */}
				<Legend />{/* 범례라고 하는 부분=데이터의 계열읠 표시 */}
				<Bar dataKey="pm10" >
					{
						data.map((entry, index) => (
							<Cell key={`pm10-${index}`} fill={pm10Color(entry.pm10)} />
						))
					}

				</Bar>{/*bar의 색상 */}
				<Bar dataKey="pm25">
					{
						data.map((entry, index) => (
							<Cell key={`pm25-${index}`} fill={pm25Color(entry.pm25)} />
						))
					}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
export default BarChartSample;