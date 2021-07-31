import { useState } from "react";

//1행 요소
import SelectBox from './SelectBox';
import Button from '@material-ui/core/Button';

import api from '../../../api/opendata';

const SearchForm = ({ getData }) => {

	const [station, setStation] = useState('');
	const sidoItem = ['강원', '경남', '경북', '부산', '울산', '인천', '전남', '전북', '제주', '충남'];
	const yearItem = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
	const monthItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];





	return (
		<>
			{/*year 선택하는 select box */}
			< SelectBox subjectItem={yearItem} subject={"년도"} />

			{/* <SelectBox item={yearItem} subject={"시도"} onSelectedChange={handleChange} />*/}
			< SelectBox subjectItem={sidoItem} subject={"시도"} />

			{/*sido 선택하는 select box */}
			< SelectBox subjectItem={monthItem} subject={"월"} />

			<Button variant="contained" onClick={getData}>조회</Button>
		</>

	);
}

export default SearchForm;

