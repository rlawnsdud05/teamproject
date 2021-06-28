import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import BarChart from './BarChartSample';
import LineChart from './LineChartSample';
import sidoKorName from './data/sidoKorName';
import sourceSample from './data/source';
import { useEffect, useState } from 'react';
import ResponsiveTable from './ResponsiveTableSample';
import api from '../../api/opendata';


const useStyles = makeStyles((theme) => ({
	//내부 페이퍼 스타일을 지정
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	container: {
		[theme.breakpoints.up('lg')]: {
			marginTop: '80px',
		},
	},

}));


const transformSidoData = (source) => {
	if (source.length === 0) return [];

	//가장 최근 데이터
	const sourceData = source.slice(0, 2);

	const transData = [];
	for (let name in sidoKorName) {
		const item = {
			sido: sidoKorName[name],
			pm10: parseInt(sourceData[0][name]),
			pm25: parseInt(sourceData[1][name]),
		}
		transData.push(item);
	}
	return transData;
}

const transfromLocationData = (source, sido) => {
	if (source.length === 0) return [];
	const transData = [];
	let item = {};
	source.forEach((record, index) => {
		if (index % 2 === 0) {
			item.dataTime = record.dataTime.substr(11, 5);
			item.pm10 = parseInt(record[sido]);
		} else {
			item.pm25 = parseInt(record[sido]);
			transData.unshift(item);
			item = {};
		}

	});
	return transData;
}
const transformSidoTableData = (source) => {
	if (source.length === 0) return [];
	return source.map((item) => {
		let newItem = { 시간: item.dataTime.substr(5, 11), 구분: item.itemCode }
		for (let name in sidoKorName) {
			let val = item[name];
			newItem[sidoKorName[name]] = parseInt(val);
		}
		return newItem;
	});

}

const Home = () => {

	const [sido, setSido] = useState("seoul");
	const [source, setSource] = useState([]);

	//백엔드에서 받아온 데이터를 세팅함
	useEffect(() => {
		const getData = async () => {
			//await 키워드 : promise 처리가 완료될 때 까지 대기

			// async-await, ES8, ES2017
			const result = await api.fetchDustHourly();

			setSource(result.data);
		}
		getData();
	},
		[]
	);


	const classes = useStyles();

	return (
		//Grid 컨테이너 선언
		<Grid container spacing={1} className={classes.container}>
			{/* Grid 아이템 선언 lg 사이즈 이상일 때 2칸, */}
			{/* 1행 */}
			<Hidden mdDown>
				<Grid item lg={1} />
			</Hidden>
			<Grid item xs={12} sm={7} lg={5}>
				<Paper className={classes.papaer} style={{ height: '20vh' }}>
					<h3>시도별 미세먼지 현황</h3>
					<BarChart data={transformSidoData(source)} />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={5} lg={6}>
				<h3>
					<Select
						value={sido}
						onChange={(event) => {
							setSido(event.target.value);
						}}
					>
						{Object.keys(sidoKorName).map((sido) => (
							<MenuItem key={`menu-${sido}`} value={sido}>

								{sidoKorName[sido]}
							</MenuItem>
						))

						}
					</Select>
					미세먼지 현황
				</h3>
				<Paper className={classes.papaer} style={{ height: '20vh' }}>
					<LineChart data={transfromLocationData(source, sido)} />
				</Paper>
			</Grid>


			{/* 2행 */}
			<Hidden mdDown>
				<Grid item lg={1} />
			</Hidden>
			<Grid item xs={12} sm={12} lg={5}>

				<Paper className={classes.paper} style={{ height: '20vh' }}>
					{/* <ResponsiveTable data={transformSidoTableData(source)} /> */}
				</Paper>
			</Grid>
			<Hidden mdDown>
				<Grid item lg={6} />
			</Hidden>
		</Grid >
	);
}

export default Home;