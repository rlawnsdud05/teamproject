import './App.css';

//컴포넌트간 이동에 사용하는 라이브러리(모듈)
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//lazy-loading시 사용할 라이브러리(모듈)
import {Suspense, lazy, useState} from 'react';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

//Core Components
import AppBar from '@material-ui/core/AppBar';
import { Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';


//Icons
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


import Home from './components/Home';

//import Todo from './components/Todo';
//import Contact from './components/Contact';

const drawerWidth = '240px';

//makeStyles 함수로 스타일 만들거임
const useStyles = makeStyles((theme) => ({
	root : {
		display: 'flex',
	},
	appBar : {
		//viewport 가로크기가 1280px 이상일 때 적용
		[theme.breakpoints.up('lg')]:{
		width : `calc(100% - ${drawerWidth})`,
		marginLeft : drawerWidth,
	},
	},
	menuButton: {
		[theme.breakpoints.up('lg')]:{
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
	drawerPaper:{
		width: drawerWidth,
	},
	link: {
		textDecoration: 'none', //밑줄 없애기
		color: 'inherit', //폰트 컬러를 부모요소의 색상으로
	},
	//drawer:{
	//	[theme.breakpoints.up('lg')]:{
	//		width: drawerWidth,
	//		flexShrink: 0,
	//	},
	//},
}));

const Todo = lazy(() => import("./components/todo-render-scope/Todo"));//router에는 컨터이너 컴포넌트가 로딩됨
const Contact = lazy(() => import("./components/contact-render-scope/Contact"));

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
		<ThemeProvider theme={theme}>
			<Router>
				<div className={classes.root}>
					<header>
						<AppBar position='fixed' className={classes.appBar}>
							<Toolbar>
								{/* color='inherit' -> 부모요소의 폰트컬러를 사용함 */}
								<IconButton 
									color='inherit' 
									edge='start' 
									className={classes.menuButton} 
									onClick={()=>{setMobileOpen(!mobileOpen);}}>
									<MenuIcon/>
								</IconButton>
								<Typography variant='h6' noWrap>
									MY WORKSPACE
								</Typography>
							</Toolbar>
						</AppBar>
						
						{/* 앱서랍(Drawer) */}
						{/* 화면이 1280px 이상일 때 숨기는 서랍 */}
						<Hidden lgUp implementation='css'>
							<Drawer 
								variant='temporary' 
								open={mobileOpen} 
								classes={{paper: classes.drawerPaper }}
								onClose={handleDrawerToggle}
							>
								{drawer}
							</Drawer>
						</Hidden>

						{/* 화면이 1280px 미만일 때 숨기는 서랍 */}
						<Hidden mdDown implementation='css'>
							<Drawer open variant='permanent' classes={{paper: classes.drawerPaper }}>
								{drawer}
							</Drawer>
						</Hidden>
					</header>

					<main className={classes.content}>
						{/*상단 toobar 공간 만큼 띄우기 */}
						<div className={classes.toolbar}/>
						{/*컴포넌트가 로딩되는 동인 표시할 내용을 보여주는 컴포넌트 */}
						<Suspense fallback={<div>Loading...</div>}>
							{/*Switch 컴포넌트의 역할은? */}
							<Switch>
								{/* Swtich 안쪽영역에 로딩할 컴포넌트와 경로를 Route로 작성 */}
								<Route path="/" component={Home} exact></Route>
								<Route path="/todo" component={Todo}></Route>
								<Route path="/contacts" component={Contact}></Route>
							</Switch>
						</Suspense>
					</main>
				</div>
			</Router>
		</ThemeProvider>
  );
}

export default App;
