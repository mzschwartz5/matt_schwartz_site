import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TitleBar from './components/core/TitleBar';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TitleBar/>
          <HomePage/>
        </Route>
        <Route path="/project_gallery" >
          <TitleBar/>
          Project Gallery!
        </Route>
        <Route path="/blog">
          <TitleBar/>
          Blog!
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
