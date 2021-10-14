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
import { auth } from './data/firebase';
import { getRedirectResult } from '@firebase/auth';
import { loginOrCreateNewUser } from './data/users_db';

function App() {
  
  // Catch authentication redirect
  getRedirectResult(auth).then((result) => {
    const user = result?.user;
    if (user === undefined) return;
    else if (user === auth.currentUser) return; // already logged in

    loginOrCreateNewUser(user);

  }).catch((error) => {
    const errorCode = error.message;
    const email = error.email;
    console.log("Error authenticating " + email + ": " + errorCode);
  });
  
  
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
