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
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: "#282c34"
    },
    secondary: {
      main: "#202020"
    },
    tertiary: {
      main: "#1481BA"
    },
    accent: {
      main: "#faf4eb"
    },
    text: {
      primary: "#282c34"
    },
    paper: {
      main: "#faf4eb"
    }
  }
});

function App() {
  applyGlobalStyles();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
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

  // Check for auth state changes -- such as on page refresh, when auth info is loaded from cache. In this case,
  // we need to reset the recoil state from the auth cache.
  auth.onAuthStateChanged((user) => {
    if (user) { // user is authenticated
      loginOrCreateNewUser(user, setActiveUser);
    }
  })
}

function applyGlobalStyles() {
  document.getElementsByTagName("html").item(0)?.style.setProperty("background-color", theme.palette.primary.main);
  document.getElementsByTagName("html").item(0)?.style.setProperty("color", theme.palette.text.primary);
}

export default App;
