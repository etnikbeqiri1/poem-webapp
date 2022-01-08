import React from 'react';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {useFormik} from "formik";
import {Avatar, Button, Container, CssBaseline, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "../Layout/Grid";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'Invalid email'),
    password: Yup.string()
        .required('Password is required'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {
    const auth = useAuth();

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            "email": "", "password": "", "name": ""
        }, validationSchema: validationSchema, onSubmit: async (values) => {
            console.log({values})
            try {
                await auth.signup(values.email, values.password, values.name);
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
                Sign Up
            </Typography>
            <Box sx={{mt: 1}}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        color={"primary"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Password Confirm"
                        type="password"
                        id="passwordConfirm"
                        autoComplete="current-password"
                        color={"primary"}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                        helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                    />
                    <Button
                        type="submit"
                        onClick={formik.handleSubmit}
                        variant="outlined"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login"
                                  variant="body">
                                {"Already have an account. Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    </Container>);
};

export default Signup;
