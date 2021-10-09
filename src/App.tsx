import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TitleBar from './components/core/TitleBar';
import ProjectGallery from './components/ProjectGallery/ProjectGallery';
import Blog from './components/Blog/Blog';
import MarkdownEditor from './components/Blog/MarkdownEditor';

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
          <ProjectGallery/>
        </Route>
        <Route path="/blog">
          <TitleBar/>
          <MarkdownEditor filePath={"Test Upload Blog"}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
