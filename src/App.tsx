import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TitleBar from './components/core/TitleBar';
import ProjectGallery from './components/ProjectGallery/ProjectGallery';
import BlogGallery from './components/Blog/BlogGallery';
import Footer from './components/core/Footer';

function App() {
  return (
    <>
      <Router>
        <TitleBar/>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/project_gallery" >
            <ProjectGallery/>
          </Route>
          <Route path="/blog">
            <BlogGallery/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
