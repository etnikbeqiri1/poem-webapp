import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/Route/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import styled from "styled-components";
import {createTheme, ThemeProvider} from "@mui/material";
import Profile from "./pages/Profile";
import {useAuth} from "./hooks/useAuth";

const Pages = styled.div`
  h1 {
    font-size: 34pt;
  }
`;

const themeMui = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#30BC72',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#CCCCCC',
        },
        background: {
            default: '#d3e0fb',
        },
        error: {
            main: '#F6406C',
        },
    },
    shape: {
        borderRadius: 14,
    },
});

const App = () => {
    const auth = useAuth();
  return (
      <ThemeProvider theme={themeMui}>
        <Router>
            {auth.user && (
            <Sidebar  />
            )}

            <Pages>
                <Layout>
                    <Switch>
                      <PrivateRoute exact path='/'>
                          <Dashboard  />
                      </PrivateRoute>
                      <PrivateRoute exact path='/team'>
                            <Home />
                      </PrivateRoute>
                      <PrivateRoute exact path='/profile'>
                            <Profile />
                      </PrivateRoute>


                      <Route path='/signup' >
                        <Signup />
                      </Route>
                      <Route path='/login'>
                        <Login />
                      </Route>
                      <Route path='/forgot-password'>
                        <ForgotPassword />
                      </Route>
                      <Route path='/reset-password'>
                        <ResetPassword />
                      </Route>
                      <Route>
                        <NotFound />
                      </Route>

                    </Switch>
                </Layout>
            </Pages>

        </Router>
      </ThemeProvider>
  );
};

export default App;
