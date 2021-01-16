import "./App.css";
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from './util/styles'
import jwtDecode from 'jwt-decode'
import  axios from "axios";
//Redux
import {Provider} from 'react-redux'
import store from './Redux/store'
import { SET_AUTHENTICATED } from "./Redux/types";
import { logoutUser, getUserData } from "./Redux/Actions/userActions";
//Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from './util/AuthRoute'
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from './pages/user'
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

let theme = createMuiTheme(themeFile);
theme = responsiveFontSizes(theme);

axios.defaults.baseURL = 'https://europe-west3-screamsapp-react.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser())
        window.location.href = '/login'
    } else {
        store.dispatch({ type: SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token
        store.dispatch(getUserData())
    }
}

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={home}/>
                                <AuthRoute exact path="/login" component={login}/>
                                <AuthRoute exact path="/signup" component={signup}/>
                                <Route exact path="/users/:handle" component={user}/>
                                <Route exact path="/users/:handle/scream/:screamId" component={user}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default App;
