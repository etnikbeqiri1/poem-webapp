import React from 'react';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {useHistory, Link} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {Avatar, Container, CssBaseline, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../Button/Button";
import Grid from "../Layout/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useFormik} from "formik";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'Invalid email'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const auth = useAuth();

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            "email": "", "password": ""
        }, validationSchema: validationSchema, onSubmit: async (values) => {
            try {
                await auth.login(values.email, values.password);
                toast('Welcome! 👋');
                history.push('/');
            } catch {
                toast.error('Error logging in.');
            }
        },
    });

    return (<Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{mt: 1}}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            color={"primary"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color={"primary"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            onClick={formik.handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={() => {
                                    history.push('/signup');
                                }} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Container>);
};

export default Login;
