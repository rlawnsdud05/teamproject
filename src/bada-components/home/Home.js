import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

//데이터 뿌려지는 요소
import SeaWaterBarChart from './charts/BarChart';
import SeaWaterLineChart from './charts/LineChart';
import SeaWaterTable from './data-display/Table';

//user comment 부분
import CommentList from './comment-components/CommentList';
import CommentInputForm from './comment-components/CommentInputForm';




//dataSample
import sourceSample from '../data/sourceSample';


//selectBox
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Divider } from '@material-ui/core';



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
	'@global': {
		'.MuiTypography-root': {
			fontSize: '1.3rem',
			fontWeight: 'bold',
		},
		'.MuiTextField-root': {
			margin: '2px',
		},
	},


}));

//연도별 시별 데이터(ex/ 2016년 부산시)
const transformSidoData = (source, sido, month) => {

	let transformedData = [];
	//1. 시도 데이터 가져오기
	//console.log(source);

	const sidoData = source.filter((item) => item.sido_nm === sido && (new Date(Number(item.res_date)).getMonth() + 1) === Number(month));

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
	//console.log('--------sourceData 체크' + source);

	const sidoData = source.filter((item) => item.sido_nm === sido && (new Date(Number(item.res_date)).getMonth() + 1) === Number(month));
	//console.log('-----------table data 가공 시작----------');
	//console.log(sidoData);
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

	//console.log('data 가공 \n' + transformedData);
	return transformedData;

}



const Home = () => {
	const [source, setSource] = useState(sourceSample);
	const [sido, setSido] = useState('부산');
	const [station, setStation] = useState('해운대');
	const [month, setMonth] = useState('5');
	const [year, setYear] = useState('2016');


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
					<Paper className={classes.paper} style={{ height: "45vh" }}>
						<Box>

							<FormControl className={classes.formControl}>

								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={year}
									onChange={(event) => {
										setYear(event.target.value);
									}}

								>
									<MenuItem value={10} >2016</MenuItem>

								</Select>
								<FormHelperText>년도</FormHelperText>
							</FormControl>


							<FormControl>

								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={year}
									onChange={(event) => {
										setSido(event.target.value);
									}}
								>
									<MenuItem value={10} disableGutters='true' >부산</MenuItem>

								</Select>
								<FormHelperText>시도명</FormHelperText>
							</FormControl>
							<Typography display='inline'>
								해수욕장 수질
							</Typography>
						</Box>
						<SeaWaterBarChart data={transformSidoData(source, sido, month)} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={5} lg={5}>
					<Paper className={classes.paper} style={{ height: "45vh" }} >
						<Typography>
							{station} 수질
						</Typography>
						<SeaWaterLineChart data={transformStationData(source, station)} />
					</Paper>
				</Grid>

				<Hidden lgDown>
					<Grid item lg={1}>
						<Paper className={classes.paper} >lg=1</Paper>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper} style={{ height: "37vh" }} >
						{/* <ResponsiveTable data={transformTableData(source, sido, month)} /> */}
						<SeaWaterTable data={transformTableData(source, sido, month)} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={5} lg={5}>
					<Paper className={classes.paper} style={{ height: "37vh" }}>
						<Typography> 수질 코멘트 </Typography>
						<Divider />
						<CommentInputForm />
						<CommentList />
					</Paper>
				</Grid>
			</Grid>
		</div >

	);
}

export default Home;