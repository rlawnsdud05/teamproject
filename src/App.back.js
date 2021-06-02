

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Suspense, lazy} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Home from './components/Home';
import Todo from './components/Todo';
import Contact from './components/Contact';

//makeStyles 함수로 스타일 만들거임
const useStyles = makeStyles((theme) => ({
	root : {
		display: 'flex',
	}
}));

function App() {
	const classes = useStyles(); //css 클래스 목록이 생성됨
  return (
		<Router>
			<div className={classes.root}>
				<header>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/todo">To-Do</Link>
							</li>
							<li>
								<Link to="/contacts">Contacts</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main>
					<Suspense fallback={<div>Loading...</div>}>
						
						<Switch>
							<Route path="/" component={Home} exact></Route>
							<Route path="/todo" component={Todo}></Route>
							<Route path="/contacts" component={Contact}></Route>
						</Switch>
					</Suspense>
				</main>
			</div>
		</Router>
  );
}

export default App;
