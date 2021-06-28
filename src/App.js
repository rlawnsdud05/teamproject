import './App.css';

//Material ui
import {
	Home as HomeIcon,
	PlaylistAddCheck,
	TableChart,
	Menu as MenuIcon
} from '@material-ui/icons';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//컴포넌트간 이동에 사용하는 라이브러리(모듈)
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//lazy-loading시 사용할 라이브러리(모듈)
import { Suspense, lazy, useState } from 'react';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

//redux-saga시 사용할 라이브러리?
import createSagaMiddleware from 'redux-saga'; //saga middleware를 사용하는데 쓴다.

//Core Components
import AppBar from '@material-ui/core/AppBar';
import { Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';

//Reducer
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; //from 뒤에 경로없이 이름만 썻을 때는 node_modules 폴더에서 import하는 것

//reducer
import rootReducer from './redux/reducers';
//Saga
import rootSaga from './redux/sagas';

import Home from './components/home/Home';

// saga middlwWare 적용
const sagaMiddleWare = createSagaMiddleware();

// rootReducer 가 들어있는  store 생성
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

//root saga로 saga middlwware 실행
//saga에서 중간에 캐치할 action들에 대해서 응답대기
sagaMiddleWare.run(rootSaga);

const drawerWidth = '240px';

//makeStyles 함수로 스타일 만들거임
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		//viewport 가로크기가 1280px 이상일 때 적용
		[theme.breakpoints.up('lg')]: {
			width: `calc(100% - ${drawerWidth})`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		[theme.breakpoints.up('lg')]: {
			display: 'none',
			marginRight: theme.spacing(2),
		},
	},
	toolbar: theme.mixins.toolbar,//toobar에 대한 기본 스타일
	content: {
		flexGrow: 1, //균등분할 크기의 1배수 만큼??
		[theme.breakpoints.up('lg')]: {
			paddingLeft: drawerWidth,
		},
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(3),
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	link: {
		textDecoration: 'none', //밑줄 없애기
		color: 'inherit', //폰트 컬러를 부모요소의 색상으로
	},
}));

const Todo = lazy(() => import("./components/todo-saga/Todo"));//router에는 컨터이너 컴포넌트가 로딩됨
const TodoDetail = lazy(() => import("./components/todo-saga/TodoDetail"));
const Contact = lazy(() => import("./components/contact-saga/Contact"));

function App() {
	const classes = useStyles(); //css 클래스 목록이 생성됨
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const theme = createMuiTheme({
		palette: {
			// type: "dark",
			primary: {
				main: green[600],
			},
			secondary: {
				main: purple[600],
			},
		},
	});

	const drawer = (
		<>
			<div className={classes.toolbar} />
			<List component="nav">
				<Link to="/" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText>Home</ListItemText>
					</ListItem>
				</Link>
				<Link to="/todo" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<PlaylistAddCheck />
						</ListItemIcon>
						<ListItemText>To-Do</ListItemText>
					</ListItem>
				</Link>
				<Link to="/contacts" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<TableChart />
						</ListItemIcon>
						<ListItemText>Contacts</ListItemText>
					</ListItem>
				</Link>
			</List>
		</>
	);



	return (
		//provider 하위 컴포넌트들에게 redux store를 사용할 수 있게 해줌
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router>
					<div className={classes.root}>
						<header>
							{/* position="fixed" : scroll 되어도 현재 태그로 표현된 것의 위치가 고정 */}
							<AppBar position='fixed' className={classes.appBar}>
								<Toolbar>
									{/* color='inherit' -> 부모요소의 폰트컬러를 사용함 */}
									<IconButton
										color='inherit'
										edge='start'
										className={classes.menuButton}
										onClick={() => { setMobileOpen(!mobileOpen); }}>
										<MenuIcon />
									</IconButton>
									<Typography variant='h6' noWrap>
										바다정보
									</Typography>
								</Toolbar>
							</AppBar>

							{/* 앱서랍(Drawer) */}
							{/* 화면이 1280px 이상일 때 숨기는 서랍 */}
							<Hidden lgUp implementation='css'>
								<Drawer
									variant='temporary'
									open={mobileOpen}
									classes={{ paper: classes.drawerPaper }}
									onClose={handleDrawerToggle}
								>
									{drawer}
								</Drawer>
							</Hidden>

							{/* 화면이 1280px 미만일 때 숨기는 서랍 */}
							<Hidden mdDown implementation='css'>
								<Drawer open variant='permanent' classes={{ paper: classes.drawerPaper }}>
									{drawer}
								</Drawer>
							</Hidden>
						</header>

						<main className={classes.content}>
							{/*상단 toobar 공간 만큼 띄우기 */}
							<div className={classes.toolbar} />
							{/*컴포넌트가 로딩되는 동인 표시할 내용을 보여주는 컴포넌트 */}
							<Suspense fallback={<div>Loading...</div>}>
								{/*Switch 컴포넌트의 역할은? */}
								<Switch>
									{/* Swtich 안쪽영역에 로딩할 컴포넌트와 경로를 Route로 작성 */}
									{/* exact 정확히 path 경로만 왔을때 해당 컴포넌트가 연결되도록 설정하는 것 /todo/id 값이 오면 TodoDetail이 열려야하는데 Todo까지만 읽혔을 때 바로 Todo Component 열리는 것 방지 */}
									<Route path="/" component={Home} exact></Route>
									<Route path="/todo" component={Todo} exact></Route>

									{/* :를 쓰면 매개변수 처럼 전달됨 */}
									<Route path="/todo/:id" component={TodoDetail}></Route>
									<Route path="/contacts" component={Contact}></Route>
								</Switch>
							</Suspense>
						</main>
					</div>
				</Router>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
