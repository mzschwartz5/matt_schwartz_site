import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TitleBar from './components/HomePage/TitleBar';


function App() {
  return (
    <div className="App App-header">
      <Router>
        <Switch>
          <Route path="/project_gallery">
            <TitleBar/>
            Project Gallery!
          </Route>
          <Route path="/blog">
            <TitleBar/>
            Blog!
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
