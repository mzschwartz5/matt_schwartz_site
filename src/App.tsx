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
import { activeUserAtom, loginOrCreateNewUser } from './data/users_db';
import { useSetRecoilState } from 'recoil';

function App() {
  
  return (
    <>
      {AuthenticateUser()}
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

function AuthenticateUser() {
  const setActiveUser = useSetRecoilState(activeUserAtom);

  // Catch authentication redirect
  getRedirectResult(auth).then((result) => {
    const user = result?.user;

    if (user === undefined) return;

    loginOrCreateNewUser(user, setActiveUser);

  }).catch((error) => {
    const errorCode = error.message;
    const email = error.email;
    console.log("Error authenticating " + email + ": " + errorCode);
  });
}

export default App;
