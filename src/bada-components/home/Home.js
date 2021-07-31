import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//grid
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

//1행 요소
import SelectBox from './home-components/SelectBox';
import Button from '@material-ui/core/Button';

//2행 차트
import SeaWaterBarChart from './home-components/data-display/BarChart';
import SeaWaterLineChart from './home-components/data-display/LineChart';

//3행 테이블
import SeaWaterTable from './home-components/data-display/Table';

//3행 user comment 부분
import { Divider } from '@material-ui/core';
import CommentList from './home-components/comment-components/CommentList';
import CommentInputForm from './home-components/comment-components/CommentInputForm';

import { Typography } from '@material-ui/core';





//api
import api from '../../api/opendata';
import SelectBoxEx from './home-components/SelectBoXEx';
import SearchForm from './home-components/SearchForm';



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
			direction: 'column',
			fontSize: '1.3rem',
			fontWeight: 'bold',
		},
		// '.MuiTextField-root': {
		// 	margin: '2px',
		// },
	},


}));

//연도별 시별 월별 데이터(ex/ 2016년 8부산시) - barChart와 Table에서 사용할 데이터
const transformSidoData = (sido, year, month, source) => {

	console.log(source);


	// 1. selebox에서 year 가져오기
	//매개변수로 넘겨받음
	// console.log(year);
	// console.log(sido);
	// console.log(month);


	//2.수질 데이터 source 가져오기
	//매개변수로 넘겨받음
	//console.log(source);

	//3. selected된 값에 맞는 데이터 반환하기
	//3-1 선택한 year와 일치하는 데이터만 가져오기
	//seaWaterData = {sido_nm: "강원", sta_nm: "대진", res1: "0", res2: "0", res_yn: "적합", res_year: …}
	const yearSeaWaterData = source.filter(seaWaterData => seaWaterData.res_year == year);
	//console.log(yearSeaWaterData);

	//3-2 선택한 sido와 일치하는 데이터만 가져오기
	const sidoSeaWaterData = yearSeaWaterData.filter(seaWaterData => seaWaterData.sido_nm === sido);
	//console.log(sidoSeaWaterData);

	//3-3 선택한 month와 일치하는 데이터만 가져오기
	const monthSeaWaterData = sidoSeaWaterData.filter(seaWaterData => new Date(Number(seaWaterData.res_date)).getMonth() + 1 === month);
	console.log(monthSeaWaterData);

	//4. 바차트와 테이블에 들어갈 형태로 데이터구조 변경하기
	const transformedData = [];// 변경된 데이터 들어갈 곳

	for (let eachSeaWaterData of monthSeaWaterData) {
		const res_date = new Date(Number(eachSeaWaterData['res_date']));
		const item = {
			해수욕장명: eachSeaWaterData['sta_nm'],
			대장균수: Number(eachSeaWaterData['res1']),
			장구균수: Number(eachSeaWaterData['res2']),
			조사일자: (res_date.getMonth() + 1) + '/' + res_date.getDate(),
		}

		transformedData.push(item);

	}

	//5. 데이터 정렬하기 
	//1차 정렬 = 같은해수욕장, 2차 정렬 = 조사일자 빠른 순
	//5-1. 차트에 뿌릴 데이터의 첫번째 요소(객체)를 가져온다. 첫번째 요소는 비교의 기준이 되는 대상 
	function compare(a, b) {
		//a = { 조사일자: "7/28", 대장균수: "1", 장구균수: "1" };
		//b={	조사일자: "6/21",	대장균수: "1", 장구균수: "1"	}
		//4-1 조사일자의 값을 /를 기준으로 자르기 split함수 사용
		const sta_nm1 = a['해수욕장명'];
		const sta_nm2 = b['해수욕장명'];
		const res_date1 = a['조사일자'].split('\/').map(element => Number(element));
		const res_date2 = b['조사일자'].split('\/').map(element => Number(element));

		//명칭 가나다순
		if (sta_nm1 > sta_nm2) {
			return 1;
		}
		//명칭이 동일 한경우
		if (sta_nm1 == sta_nm2) {
			//return값 1을 줘야하는 경우 : 월이 작거나 or 월이 같은데 일이 작거나
			if (res_date1[0] > res_date2[0] || (res_date1[0] === res_date2[0] && res_date1[1] > res_date2[1])) {
				return 1;
			}
			//월이 크거나 월이 큰데 일이 크거나
			if (res_date1[0] < res_date2[0] || (res_date1[0] === res_date2[0] && res_date1[1] < res_date2[1])) {
				return -1;
			}
		}
		//명칭 가나다순
		if (sta_nm1 < sta_nm2) {
			return -1;
		}
	}

	return transformedData.sort(compare);
}

//해수욕장별 데이터(ex 해운대)
const transformStationData = (sido, station, year, source) => {

	//1. 해수욕장명(station) & year & month 가져오기
	//매개변수로 넘겨받음

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

//연도별 시별 테이블 데이터
const transformTableData = (sido, year, month, source) => {

	let transformedData = [];
	//1. source 가져오기

	//2-1 선택한 year와 일치하는 데이터만 가져오기
	//seaWaterData = {sido_nm: "강원", sta_nm: "대진", res1: "0", res2: "0", res_yn: "적합", res_year: …}
	const yearSeaWaterData = source.filter(seaWaterData => seaWaterData.res_year === year);
	//console.log(yearSeaWaterData);

	//2-2 선택한 sido와 일치하는 데이터만 가져오기
	const sidoSeaWaterData = yearSeaWaterData.filter(seaWaterData => seaWaterData.sido_nm === sido);
	//console.log(sidoSeaWaterData);

	//2-3 선택한 month와 일치하는 데이터만 가져오기
	const monthSeaWaterData = sidoSeaWaterData.filter(seaWaterData => new Date(Number(seaWaterData.res_date)).getMonth() + 1 === month);
	//console.log(monthSeaWaterData);

	//3. 테이블 형태로 데이터구조 변경하기
	for (let eachSeaWaterData of monthSeaWaterData) {
		const res_date = new Date(Number(eachSeaWaterData['res_date']));
		const item = {
			해수욕장명: eachSeaWaterData['sta_nm'],
			대장균수: Number(eachSeaWaterData['res1']),
			장구균수: Number(eachSeaWaterData['res2']),
			조사일자: (res_date.getMonth() + 1) + '/' + res_date.getDate(),
			적합여부: eachSeaWaterData['res_yn'],
		}

		transformedData.push(item);

	}

	//5. 데이터 정렬하기 
	//1차 정렬 = 같은해수욕장, 2차 정렬 = 조사일자 빠른 순
	//5-1. 차트에 뿌릴 데이터의 첫번째 요소(객체)를 가져온다. 첫번째 요소는 비교의 기준이 되는 대상 
	function compare(a, b) {
		//a = { 조사일자: "7/28", 대장균수: "1", 장구균수: "1" };
		//b={	조사일자: "6/21",	대장균수: "1", 장구균수: "1"	}
		//4-1 조사일자의 값을 /를 기준으로 자르기 split함수 사용
		const sta_nm1 = a['해수욕장명'];
		const sta_nm2 = b['해수욕장명'];
		const res_date1 = a['조사일자'].split('\/').map(element => Number(element));
		const res_date2 = b['조사일자'].split('\/').map(element => Number(element));

		//명칭 가나다순
		if (sta_nm1 > sta_nm2) {
			return 1;
		}
		//명칭이 동일 한경우
		if (sta_nm1 == sta_nm2) {
			//return값 1을 줘야하는 경우 : 월이 작거나 or 월이 같은데 일이 작거나
			if (res_date1[0] > res_date2[0] || (res_date1[0] == res_date2[0] && res_date1[1] > res_date2[1])) {
				return 1;
			}
			//월이 크거나 월이 큰데 일이 크거나
			if (res_date1[0] < res_date2[0] || (res_date1[0] == res_date2[0] && res_date1[1] < res_date2[1])) {
				return -1;
			}
		}
		//명칭 가나다순
		if (sta_nm1 < sta_nm2) {
			return -1;
		}
	}

	return transformedData.sort(compare);
}

const Home = () => {
	const [source, setSource] = useState([]);
	const [sido, setSido] = useState('');
	const [station, setStation] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const sidoItem = ['강원', '경남', '경북', '부산', '울산', '인천', '전남', '전북', '제주', '충남'];
	const yearItem = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
	const monthItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


	//처음 렌더링 될때 서버에서 데이터 가져오기
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

	const getData = async () => {
		const result = await api.fetchSeaWaterMonthly();
		setSource(result.data);
	};


	//selectbox에서 선택된 값을 가져오는 함수
	const getSelectedValue = (selectedValue) => {
		console.log(selectedValue);
	}

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
		setStation(selectedData['value']);
	};

	const classes = useStyles();

	return (

		<div className={classes.root}>
			<Grid container spacing={1}>

				{/*1행 대주제 - 년도와 시도를 선택하는 부분 */}

				<Grid item xs={12} sm={12} lg={12}>
					<Paper className={classes.paper}>

						<SearchForm getData={getData} />
						{/*year 선택하는 select box */}
						{/*<SelectBox subjectItem={yearItem} subject={"년도"} selectedValue={year} onSelectedChange={handleChange} />*/}

						{/* <SelectBox item={yearItem} subject={"시도"} onSelectedChange={handleChange} />*/}
						{/*	<SelectBox subjectItem={sidoItem} subject={"시도"} selectedValue={sido} onSelectedChange={handleChange} />*/}

						{/*sido 선택하는 select box */}
						{/*<SelectBox subjectItem={monthItem} subject={"월"} selectedValue={month} onSelectedChange={handleChange} />*/}

						{/*	<Button variant="contained" onClick={getSelectedValue}>조회</Button>*/}

						{/* <Typography display='inline'>
							해수욕장 수질
						</Typography> */}

					</Paper>
				</Grid>

				{/*2행 - 월을 선택하여 수질 상세 출력부분 & 해당 년과 일치한 해수욕장의 월별 변화 출력부분*/}

				{/*2-1 선택한 년, 월, 시도와 일치하는 수질데이터 바차트로 출력하는 부분 */}
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper} style={{ height: "45vh" }}>

						<Typography display='inline'>
							{sido} 전역 해수욕장 수질
						</Typography>

						<SeaWaterBarChart data={transformSidoData(sido, year, month, source)} handleClick={handleClick} />
					</Paper>
				</Grid>

				{/*2-2 선택한 년도와 일치한 해수욕장의 수질 변화 라인차트로 출력하는 부분 */}
				<Grid item xs={12} sm={5} lg={6}>
					<Paper className={classes.paper} style={{ height: "45vh" }} >

						<Typography>
							{year + '년 ' + sido + ' ' + station} 해수욕장 수질변화
						</Typography>
						<SeaWaterLineChart data={transformStationData(sido, station, year, source)} />

					</Paper>
				</Grid>

				{/*3행 - 2-1데이터 테이블로 출력 & 해수욕장 사용자의 코멘트를 리스트로 출력 */}

				{/*3-1의 2-1 데이터를 테이블 형식으로 출력하는 부분(해수욕장 적합/부적합 정보가 추가됨) */}
				<Grid item xs={12} sm={7} lg={6}>
					<Paper className={classes.paper} style={{ height: "37vh" }} >
						{/* <ResponsiveTable data={transformTableData(source, sido, month)} /> */}
						<SeaWaterTable data={transformTableData(sido, year, month, source)} />
					</Paper>
				</Grid>

				{/*3-2 해수욕장 사용자의 수질관련 코멘트를 리스트로 출력하는 부분*/}
				<Grid item xs={12} sm={5} lg={6}>
					<Paper className={classes.paper} style={{ height: "37vh" }}>

						<Typography> 사용자 코멘트 </Typography>

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