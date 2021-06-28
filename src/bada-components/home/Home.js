import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

//데이터 뿌려지는 요소
import SeaWaterBarChart from './BarChart';
import SeaWaterLineChart from './LineChart';
import SeaWaterTable from './Table';
import SeaWaterList from './List';


//ajax
import api from '../../api/opendata';

//dataSample
import sourceSample from './sourceSample';

//style 설정
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

//연도별 시별 데이터(ex/ 2016년 부산시)
const transformSidoData = (source, sido, month) => {

	let transformedData = [];
	//1. 시도 데이터 가져오기
	//console.log(source);

	const sidoData = source.filter((item) => item.sido_nm === sido && (new Date(Number(item.res_date)).getMonth() + 1) == month);

	//2. 차트 형태로 데이터구조 변경하기
	for (let elem of sidoData) {
		const item = {
			해수욕장명: elem['sta_nm'],
			장구균수: Number(elem['res1']),
			대장균수: Number(elem['res2']),
			조사년도: new Date(Number(elem['res_date'])),
		}

		transformedData.push(item);

	}

	//console.log('data 가공 \n' + transformedData);
	return transformedData;

}

//해수욕장별 데이터(ex 해운대)
const transformStationData = (source, station) => {
	const transformedData = [];

	//console.log(source);

	//1.해수욕장 별 데이터 가져오기
	const stationData = source.filter((item) => item.sta_nm === station);
	//console.log(stationData);

	for (let elem of stationData) {
		const res_date = new Date(Number(elem['res_date']));

		const item = {
			조사일자: res_date.getFullYear() + '/' + (res_date.getMonth() + 1) + '/' + res_date.getDate(),
			대장균수: elem['res1'],
			장구균수: elem['res2'],
		}
		transformedData.push(item);
	}

	//console.log(transformedData);

	return transformedData;
}

const transformTableData = (source, sido, month) => {

	let transformedData = [];
	//1. 시도 데이터 가져오기
	//console.log(source);

	const sidoData = source.filter((item) => item.sido_nm === sido && (new Date(Number(item.res_date)).getMonth() + 1) == month);
	console.log(sidoData);
	//2. 차트 형태로 데이터구조 변경하기
	for (let elem of sidoData) {
		const item = {
			해수욕장명: elem['sta_nm'],
			장구균수: Number(elem['res1']),
			대장균수: Number(elem['res2']),
			적합여부: elem['res_yn'],
		}

		transformedData.push(item);

	}

	console.log('data 가공 \n' + transformedData);
	return transformedData;

}

const Home = () => {
	const [source, setSource] = useState(sourceSample);
	const [sido, setSido] = useState('부산');
	const [station, setStation] = useState('해운대');
	const [month, setMonth] = useState('5');


	// useEffect(() => {
	// 	//console.log('ajax시작');
	// 	const getData = async () => {
	// 		const result = await api.fetchSeaWaterMonthly();

	// 		setSource(result.data);

	// 	};
	// 	getData();
	// }
	// 	, []
	// );



	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Hidden lgDown>
					<Grid item lg={1}>
						<Paper className={classes.paper}>lg=1</Paper>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper}>

						<SeaWaterBarChart data={transformSidoData(source, sido)} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={5} lg={5}>
					<Paper className={classes.paper}>

						<SeaWaterLineChart data={transformStationData(source, station)} />

					</Paper>
				</Grid>

				<Hidden lgDown>
					<Grid item lg={1}>
						<Paper className={classes.paper}>lg=1</Paper>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper}>
						<SeaWaterTable data={transformTableData(source, sido, month)} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={5} lg={5}>
					<Paper className={classes.paper}>
						<SeaWaterList />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;