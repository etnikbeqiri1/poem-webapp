import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
import ProfilePage from "./pages/ProfilePage";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import AddOrder from "./pages/AddOrder";

const Pages = styled.div`
  h1 {
    font-size: 34pt;
  }
`;

const themeMui = createTheme({
    palette: {
        type: 'dark',
        primary: {
            // main: '#707ac2',
            main: '#1a3353',
            contrastText: 'rgba(32,36,37,0.87)',
        },
        secondary: {
            // main: '#4155a2',
            main: '#006064',
        },
        superwhite: {
            main: '#fafafb',
        },
        background: {
            default: '#E0F7FA',
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
                    <Sidebar/>
                )}

                <Pages>
                    <Layout>
                        <Switch>
                            <PrivateRoute exact path='/'>
                                <Dashboard/>
                            </PrivateRoute>
                            <PrivateRoute exact path='/team'>
                                <Home/>
                            </PrivateRoute>
                            <PrivateRoute exact path='/profile'>
                                <ProfilePage/>
                            </PrivateRoute>
                            <PrivateRoute exact path='/products'>
                                <Products />
                            </PrivateRoute>
                            <PrivateRoute exact path='/product/add'>
                                <AddProduct />
                            </PrivateRoute>
                            <PrivateRoute exact path='/product/edit/:id'>
                                <EditProduct />
                            </PrivateRoute>
                            <PrivateRoute exact path='/orders'>
                                <Orders />
                            </PrivateRoute>
                            <PrivateRoute exact path='/order/create'>
                                <AddOrder />
                            </PrivateRoute>


                            <Route path='/signup'>
                                <Signup/>
                            </Route>
                            <Route path='/login'>
                                <Login/>
                            </Route>
                            <Route path='/forgot-password'>
                                <ForgotPassword/>
                            </Route>
                            <Route path='/reset-password'>
                                <ResetPassword/>
                            </Route>
                            <Route>
                                <NotFound/>
                            </Route>

                        </Switch>
                    </Layout>
                </Pages>

            </Router>
        </ThemeProvider>
    );
};

export default App;
