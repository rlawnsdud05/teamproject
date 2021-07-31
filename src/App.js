import NoticeBoard from "./Community/NoticeBoard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={NoticeBoard} exact></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
