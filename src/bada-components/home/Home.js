import React, { useEffect, useState } from 'react';
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
import SelectBox from './home-components/SelectBox';

//api
import api from '../../api/opendata';



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
		/* 소제목 style */
		'.MuiTypography-root': {
			fontSize: '1.3rem',
			fontWeight: 'bold',
		},
		// '.MuiTextField-root': {
		// 	margin: '2px',
		// },
	},


}));



//연도별 시별 데이터(ex/ 2016년 부산시)
const transformSidoData = (sido, year, month, source) => {

	// 1. selebox에서 year 가져오기
	// console.log(year);
	// console.log(sido);
	// console.log(month);

	let transformedData = [];
	//2.수질 데이터 source 가져오기
	//console.log(source);

	//3. selected된 값에 맞는 데이터 반환하기
	//3-1 선택한 year와 일치하는 데이터만 가져오기
	//seaWaterData = {sido_nm: "강원", sta_nm: "대진", res1: "0", res2: "0", res_yn: "적합", res_year: …}
	const yearSeaWaterData = source.filter(seaWaterData => seaWaterData.res_year == year);
	//console.log(yearSeaWaterData);

	//3-2 선택한 sido와 일치하는 데이터만 가져오기
	const sidoSeaWaterData = yearSeaWaterData.filter(seaWaterData => seaWaterData.sido_nm == sido);
	console.log(sidoSeaWaterData);

	//3-2-1 sido데이터 중

	//3-3 선택한 month와 일치하는 데이터만 가져오기
	const monthSeaWaterData = sidoSeaWaterData.filter(seaWaterData => new Date(Number(seaWaterData.res_date)).getMonth() + 1 == month);
	//console.log(monthSeaWaterData);

	//4. 차트에 들어갈 형태로 데이터구조 변경하기
	for (let eachSeaWaterData of monthSeaWaterData) {
		const item = {
			해수욕장명: eachSeaWaterData['sta_nm'],
			대장균수: Number(eachSeaWaterData['res1']),
			장구균수: Number(eachSeaWaterData['res2']),
			조사년도: new Date(Number(eachSeaWaterData['res_date'])),
		}

		transformedData.push(item);

	}

	//5. 해수욕장명이 동일한데 조사년도의 월이 같은경우(같은달에 1번이상 수질조사한경우)는 평균값으로 반환한다.

	//console.log('data 가공 \n' + transformedData);
	return transformedData;
}

//해수욕장별 데이터(ex 해운대)
const transformStationData = (sido, station, year, source) => {

	//1. 해수욕장명(station) & year 가져오기
	//console.log(station);
	//console.log(year);

	const transformedData = [];

	//2.source를 barchart에서 클릭한 해수욕장과 일치한 데이터 가져오기
	//seaWaterData = {sido_nm: "강원", sta_nm: "대진", res1: "0", res2: "0", res_yn: "적합", res_year: …}
	const stationSeaWaterData = source.filter(seaWaterData => seaWaterData.sido_nm === sido && seaWaterData.sta_nm === station);
	//console.log(stationSeaWaterData);

	//console.log(sortedSeaWaterData);
	//3. 선택한 해수욕장의 데이터를 line chart 형식에 맞춰 반환하기
	for (let seaWater of stationSeaWaterData) {
		const res_date = new Date(Number(seaWater['res_date']));
		const item = {
			조사일자: (res_date.getMonth() + 1) + '/' + res_date.getDate(),
			대장균수: seaWater['res1'],
			장구균수: seaWater['res2'],
		}
		transformedData.push(item);
	}

	//4. linechart 형식의 data를 조사일자가 빠른순으로 정렬 변경하기
	function compare(a, b) {
		//a = { 조사일자: "7/28", 대장균수: "1", 장구균수: "1" };
		//b={	조사일자: "6/21",	대장균수: "1", 장구균수: "1"	}
		//4-1 조사일자의 값을 /를 기준으로 자르기 split함수 사용
		const res_date1 = a['조사일자'].split('\/').map(element => Number(element));
		const res_date2 = b['조사일자'].split('\/').map(element => Number(element));
		//console.log(a['조사일자'].split('\/')); ["6","21"]
		//return값 1을 줘야하는 경우 : 월이 크거나 or 월이 같은데 일이 크거나
		if (res_date1[0] > res_date2[0] || (res_date1[0] == res_date2[0] && res_date1[1] > res_date2[1])) {
			return 1;
		}
		if (res_date1[0] < res_date2[0] || (res_date1[0] == res_date2[0] && res_date1[1] < res_date2[1])) {
			return -1;
		}
	}

	return transformedData.sort(compare);
}

const transformTableData = (source, sido, month) => {

	let transformedData = [];
	//1. 시도 데이터 가져오기
	//console.log('--------sourceData 체크' + source);

	const sidoData = source.filter((item) => item.sido_nm === sido && (new Date(Number(item.res_date)).getMonth() + 1) === Number(month));
	//console.log('-----------table data 가공 시작----------');
	//console.log(sidoData);
	//2. 테이블 형태로 데이터구조 변경하기
	for (let seaWater of sidoData) {
		const item = {
			해수욕장명: seaWater['sta_nm'],
			대장균수: Number(seaWater['res1']),
			장구균수: Number(seaWater['res2']),
			적합여부: seaWater['res_yn'],
		}

		transformedData.push(item);

	}

	//console.log('data 가공 \n' + transformedData);
	return transformedData;

}



const Home = () => {
	const [source, setSource] = useState([]);
	const [sido, setSido] = useState('');
	const [station, setStation] = useState('해운대');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const sidoItem = ['강원', '경남', '경북', '부산', '울산', '인천', '전남', '전북', '제주', '충남'];
	const yearItem = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
	const monthItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	//const [subject, setSubject] = useState('');

	useEffect(() => {
		//console.log('ajax시작');
		const getData = async () => {
			const result = await api.fetchSeaWaterMonthly();
			setSource(result.data);
		};
		getData();
	}
		, []
	);


	//selectBox 선택값에 따른 년도값 제어
	const handleChange = (event, subject) => {
		switch (subject) {
			case "년도":
				setYear(event.target.value);
				break;
			case "월":
				setMonth(event.target.value);
				break;
			case "시도":
				setSido(event.target.value);
				break;
		}
	};

	//barchart x축 해수욕장명 클릭에 따른 station 값 변경
	const handleClick = (selectedData) => {
		setStation(selectedData["value"]);
		//console.log(station);
		//console.log(selectedData["value"]);
	};

	const classes = useStyles();

	return (

		<div className={classes.root}>
			<Grid container spacing={1}>

				{/*1행 대주제 - 년도와 시도를 선택하는 부분 */}

				<Grid item xs={12} sm={12} lg={12}>
					<Paper className={classes.paper}>

						{/*year 선택하는 select box */}
						<SelectBox subjectItem={yearItem} subject={"년도"} selectedValue={year} onSelectedChange={handleChange} />

						{/* <SelectBox item={yearItem} subject={"시도"} onSelectedChange={handleChange} />*/}
						<SelectBox subjectItem={sidoItem} subject={"시도"} selectedValue={sido} onSelectedChange={handleChange} />

						{/* <Typography display='inline'>
							해수욕장 수질
						</Typography> */}

					</Paper>
				</Grid>

				{/*2행 소주제 - 월을 선택하여 수질 상세 출력부분 & 해당 년과 일치한 해수욕장의 월별 변화 출력부분*/}
				<Hidden lgDown>
					<Grid item lg={1}>
						<Paper className={classes.paper}>lg=1</Paper>
					</Grid>
				</Hidden>

				{/*2-1 선택한 년, 월, 시도와 일치하는 수질데이터 바차트로 출력하는 부분 */}
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper} style={{ height: "45vh" }}>

						{/*sido 선택하는 select box */}
						<SelectBox subjectItem={monthItem} subject={"월"} selectedValue={month} onSelectedChange={handleChange} />

						<Typography display='inline'>
							{sido} 전역 해수욕장 수질
						</Typography>

						<SeaWaterBarChart data={transformSidoData(sido, year, month, source)} handleClick={handleClick} />
					</Paper>
				</Grid>

				{/*2-2 선택한 년도와 일치한 해수욕장의 수질 변화 라인차트로 출력하는 부분 */}
				<Grid item xs={12} sm={5} lg={5}>
					<Paper className={classes.paper} style={{ height: "45vh" }} >

						<Typography>
							{year + '년 ' + sido + ' ' + station} 해수욕장 수질변화
						</Typography>
						<SeaWaterLineChart data={transformStationData(sido, station, year, source)} />

					</Paper>
				</Grid>

				{/*3행 - 2-1데이터 테이블로 출력 & 해수욕장 사용자의 코멘트를 리스트로 출력 */}
				<Hidden lgDown>
					<Grid item lg={1}>
						<Paper className={classes.paper} >lg=1</Paper>
					</Grid>
				</Hidden>

				{/*3-1의 2-1 데이터를 테이블 형식으로 출력하는 부분(해수욕장 적합/부적합 정보가 추가됨) */}
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper} style={{ height: "37vh" }} >
						{/* <ResponsiveTable data={transformTableData(source, sido, month)} /> */}
						<SeaWaterTable data={transformTableData(source, sido, month)} />
					</Paper>
				</Grid>

				{/*3-2 해수욕장 사용자의 수질관련 코멘트를 리스트로 출력하는 부분*/}
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