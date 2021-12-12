import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
// import countryList from 'react-select-country-list'
import {
    Avatar,
    Button, Card, CardHeader,
    Container,
    Divider, FormControl, Grid, IconButton, InputAdornment,
    InputLabel,
    MenuItem,
    TextField
} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import {useEffect, useMemo, useState} from "react";
import * as profileHelper from "../helpers/requests/profile";
import {useAuth} from "../hooks/useAuth";
import {setUserAddress} from "../helpers/requests/profile";
import {toast} from "react-toastify";
import firebase from "firebase/app";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import ProfileDataAndImage from "../components/ProfileDataAndImage/ProfileDataAndImage";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const ibanRegExp = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/

const validationSchema = yup.object({
    street: yup
        .string("Enter your street name")
        .min(2, "Street should be at least 2 characters in length!")
        .max(42, "Street should be less than 42 characters in length!")
        .required("Street name is required!"),
    street_2: yup
        .string("Enter your street name")
        .min(2, "Street should be at least 2 characters in length!")
        .max(42, "Street should be less than 42 characters in length!"),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone Number is required"),
    phone_2: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    city: yup
        .string("Enter your city name")
        .min(2, "City name should be at least 2 characters in length!")
        .max(42, "City name should be less than 42 characters in length!")
        .required("City name is required!"),
    zip: yup
        .number("Enter your zip code")
        .required("Zip is required!"),
}).defined();

const validationSchemaIban = yup.object({
    iban: yup
        .string()
        .matches(ibanRegExp, 'IBAN is not valid')
        .required("IBAN is required"),

}).defined();

const validationSchemaPassword = yup.object({
    current_password: yup
        .string()
        .required('Password is required'),
    new_password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('New Password is required'),
    confirm_new_password: yup
        .string()
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
}).defined();


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
}



function ProfilePage() {
    const auth = useAuth();
    const [refresh, setRefresh] = React.useState(0)
    const [refreshCountry, setRefreshContry] = React.useState(0)
    const [value, setValue] = React.useState(0);
    const [iban, setIban] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState([])
    const [country, setCountry] = React.useState('');
    const [passwordHide, setPasswordHide] = React.useState({
        showPassword: false,
    });


    const [photoURL, setPhotoURL] = useState("");
    const [imageUploading, setImageUploading] = useState(false);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const user = firebase.auth().currentUser;
            setImageUploading(true);
            const storageRef = firebase.storage().ref(user?.uid + '/profilePicture/' + img.name);
            storageRef.put(img).then((snapshot) => {
                console.log(snapshot.ref.getDownloadURL().then(e => {
                    firebase.auth().currentUser?.updateProfile({
                        photoURL: e
                    }).then((e) => {
                        window.location.reload(false);
                        // firebase.auth().currentUser.reload();
                    })
                }))
            }).finally(() => {
                setImageUploading(false);
            });
        }
    }
    useEffect(() => {
        setPhotoURL(firebase.auth().currentUser?.photoURL ?? "")
    }, [])

    const handleClickShowPassword = () => {
        setPasswordHide({
            ...passwordHide,
            showPassword: !passwordHide.showPassword,
        });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleCountryChange = (event) => {
        formik.values.country = event.target.value;
        setCountry(event.target.value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async () => {
        let res = await profileHelper.getProfile();
        console.log(res.data);
        setAddress(res.data);
        setCountry(res.data.country);
        formik.values.street = res.data.street;
        formik.values.street_2 = res.data.street_2;
        formik.values.phone = res.data.phone;
        formik.values.phone_2 = res.data.phone_2;
        formik.values.city = res.data.city;
        formik.values.zip = res.data.zip;
        formik.values.country = res.data.country;
        setRefreshContry(refreshCountry + 1)
    }, [refresh]);

    useEffect(async () => {
        let res = await profileHelper.getBank();
        setIban(res.data);
    }, [refresh]);

    useEffect(() => {
        setCountry(formik.values.country)
    }, [refreshCountry])


    const formik = useFormik({
        initialValues: {
            "street": "",
            "street_2": "",
            "phone": "",
            "phone_2": "",
            "city": "",
            "zip": "",
            "country": ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            let res = await profileHelper.setUserAddress(values);
            setRefresh(refresh + 1);
            toast(res.info.message)
            setLoading(false);
        },
    });

    const formikBank = useFormik({
        initialValues: {
            "iban": "",
        },
        validationSchema: validationSchemaIban,
        onSubmit: async (values) => {
            setLoading(true);
            let res = await profileHelper.updateBank(values);
            setRefresh(refresh + 1);
            toast(res.info.message)
            setLoading(false);
            formikBank.resetForm(true);
        },
    });

    const formikForPassword = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
            confirm_new_password: '',
        },
        validationSchema: validationSchemaPassword,
        onSubmit: (values) => {
            setLoading(true);
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                if (currentUser.email != null) {
                    const cred = firebase.auth.EmailAuthProvider.credential(
                        currentUser.email, values.current_password);

                    currentUser.reauthenticateWithCredential(cred).then((e) => {
                        e.user?.updatePassword(values.new_password).then(() => {
                            toast('Password changed successfully');
                        })
                    }).catch(e => {
                        toast('Password change failed. Please enter the current password correctly');
                    })
                } else {
                    toast('You have to be logged in');
                }
            } else {
                toast('You have to be logged in');
            }
            setLoading(false);
        },
    });


    return (
        <Container>
            <Box mt={8}/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                    <Card>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider'
                            }}
                        >
                            <Tab label="Profile" {...a11yProps(0)} />
                            <Tab label="Address" {...a11yProps(1)} />
                            <Tab label="Bank Information" {...a11yProps(2)} />
                            <Tab label="Settings" {...a11yProps(3)} />
                        </Tabs>
                    </Card>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Card>
                        <TabPanel value={value} index={0}>
                            <Box display="flex"
                                 flexDirection="column"
                                 justifyContent="center"
                                 alignItems="center"
                            >
                                <Typography variant="h4" color="secondary">Profile</Typography>
                            </Box>
                            <Divider/>
                            <Box>
                                <Box m={2}
                                     display="flex"
                                     flexDirection="column"
                                    // justifyContent="center"
                                     justifyContent="space-around"
                                     alignItems="center"

                                >
                                    <ProfileDataAndImage onChange={onImageChange} loading={imageUploading}/>
                                    <Box
                                        sx={{
                                            width: 300,
                                            // border: 1
                                        }}

                                    >
                                        <Box sx={{height: 60, pl: 4}}>
                                            <Typography variant="caption" color="secondary">Name</Typography>

                                            <Typography variant="h6"
                                                        color="primary">{auth.user.displayName}</Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 300,
                                            // border: 1
                                        }}

                                    >
                                        <Box sx={{height: 60, pl: 4}}>
                                            <Typography variant="caption" color="secondary">Email</Typography>

                                            <Typography variant="h6" color="primary">{auth.user.email}</Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 300,
                                            // border: 1
                                        }}

                                    >
                                        <Box sx={{height: 60, pl: 4}}>
                                            <Typography variant="caption" color="secondary">Last Login</Typography>

                                            <Typography variant="h6"
                                                        color="primary">{auth.user.metadata.lastSignInTime}</Typography>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <form onSubmit={formik.handleSubmit}>
                                <Box display="flex"
                                     flexDirection="column"
                                     justifyContent="center"
                                     alignItems="center"
                                >
                                    <Typography variant="h4" color="secondary">Address</Typography>
                                </Box>
                                <Divider/>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    flexWrap="wrap"
                                >
                                    <Box>
                                        <Box m={2}>
                                            <TextField id="street"
                                                       label={"Street"}
                                                       variant="outlined"
                                                       fullWidth
                                                       name={"street"}
                                                       color={"primary"}
                                                       value={formik.values.street}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.street && Boolean(formik.errors.street)}
                                                       helperText={formik.touched.street && formik.errors.street}
                                            /> </Box>
                                    </Box>

                                    <Box>
                                        <Box m={2}>
                                            <TextField id="street2"
                                                       label={"Street/Apartment "}
                                                       variant="outlined"
                                                       fullWidth
                                                       name={"street_2"}
                                                       color={"primary"}
                                                       value={formik.values.street_2}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.street_2 && Boolean(formik.errors.street_2)}
                                                       helperText={formik.touched.street_2 && formik.errors.street_2}
                                            /> </Box>
                                    </Box>

                                    <Box>
                                        <Box m={2}>
                                            <TextField id="phone"
                                                       label={"Phone Number"}
                                                       variant="outlined"
                                                       fullWidth
                                                       type={"number"}
                                                       name={"phone"}
                                                       color={"primary"}
                                                       value={formik.values.phone}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                       helperText={formik.touched.phone && formik.errors.phone}
                                            /> </Box>
                                    </Box>
                                    <Box>
                                        <Box m={2}>
                                            <TextField id="phone_2"
                                                       label={"Phone Number 2"}
                                                       variant="outlined"
                                                       fullWidth
                                                       type={"number"}
                                                       name={"phone_2"}
                                                       color={"primary"}
                                                       value={formik.values.phone_2}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.phone_2 && Boolean(formik.errors.phone_2)}
                                                       helperText={formik.touched.phone_2 && formik.errors.phone_2}
                                            /> </Box>
                                    </Box>
                                    <Box>
                                        <Box m={2}>
                                            <TextField id="city"
                                                       label={"City"}
                                                       variant="outlined"
                                                       fullWidth
                                                       name={"city"}
                                                       color={"primary"}
                                                       value={formik.values.city}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.city && Boolean(formik.errors.city)}
                                                       helperText={formik.touched.city && formik.errors.city}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box m={2}>
                                            <TextField id="zip"
                                                       label={"Zip Code"}
                                                       variant="outlined"
                                                       fullWidth
                                                       name={"zip"}
                                                       color={"primary"}
                                                       value={formik.values.zip}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.zip && Boolean(formik.errors.zip)}
                                                       helperText={formik.touched.zip && formik.errors.zip}
                                            /> </Box>
                                    </Box>
                                    <Box>
                                        <Box m={2}>
                                            <FormControl variant="outlined" sx={{minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    value={country}
                                                    label="Country"
                                                    fullWidth
                                                    onChange={handleCountryChange}
                                                    color={"primary"}

                                                >
                                                    <MenuItem value={"Kosovo"}>Kosovo</MenuItem>
                                                    <MenuItem value={"Albania"}>Albania</MenuItem>
                                                    <MenuItem value={"North Macedonia"}>North Macedonia</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>


                                </Box>
                                <Box>
                                    <Box m={2} sx={{
                                        display: "flex",
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            type='submit'
                                            disabled={loading}
                                        >{loading ? 'Loading...' : 'Save Changes'}
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <form onSubmit={formikBank.handleSubmit}>
                                <Box display="flex"
                                     flexDirection="column"
                                     justifyContent="center"
                                     alignItems="center"
                                >
                                    <Typography variant="h4" color="secondary">Bank Information</Typography>
                                </Box>
                                <Divider/>
                                <Box>
                                    <Box sx={{height: 60, pl: 4}}>
                                        <Typography variant="caption" color="secondary">Current IBAN</Typography>

                                        <Typography variant="h6"
                                                    color="primary">{iban.iban ? iban.iban : "No Data"}</Typography>
                                    </Box>
                                    <Box sx={{height: 60, pl: 4}}>
                                        <Typography variant="caption" color="secondary">Last Changed</Typography>
                                        <Typography variant="h6"
                                                    color="primary">{iban.updated_at ? iban.updated_at : "No Data"}</Typography>

                                    </Box>
                                </Box>
                                <Divider/>
                                <Box>
                                    <Box>
                                        <Box m={2} sx={{
                                            display: "flex",
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <Box pr={2}>
                                                <TextField id="iban"
                                                           label={"IBAN"}
                                                           variant="outlined"
                                                           name={"iban"}
                                                           color={"primary"}
                                                           value={formikBank.values.iban}
                                                           onChange={formikBank.handleChange}
                                                           error={formikBank.touched.iban && Boolean(formikBank.errors.iban)}
                                                           helperText={formikBank.touched.iban && formikBank.errors.iban}
                                                />
                                            </Box>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type='submit'
                                                disabled={loading}
                                            >{loading ? 'Loading...' : 'Save Changes'}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Box display="flex"
                                 flexDirection="column"
                                 justifyContent="center"
                                 alignItems="center"
                            >
                                <Typography variant="h4" color="secondary">Settings</Typography>
                            </Box>
                            <Divider/>
                            <Box>
                                <form onSubmit={formikForPassword.handleSubmit}>
                                    <Box>
                                        <Box ml={1}>
                                            <Typography variant={'caption'}>Password Change </Typography>
                                        </Box>
                                        <Box m={1}>
                                            <TextField label={"Current Password"}
                                                       variant={"outlined"}
                                                       margin={"dense"}
                                                       type={"password"}
                                                       id="current_password"
                                                       name="current_password"
                                                       value={formikForPassword.values.current_password}
                                                       onChange={formikForPassword.handleChange}
                                                       error={formikForPassword.touched.current_password && Boolean(formikForPassword.errors.current_password)}
                                                       helperText={formikForPassword.touched.current_password && formikForPassword.errors.current_password}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                                   edge="end"
                                                               >
                                                                   {passwordHide.showPassword ? <VisibilityOff/> :
                                                                       <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box m={1}>
                                            <TextField label={"New Password"}
                                                       variant={"outlined"}
                                                       margin={"dense"}
                                                       id="new_password"
                                                       name="new_password"
                                                       type={"password"}
                                                       value={formikForPassword.values.new_password}
                                                       onChange={formikForPassword.handleChange}
                                                       error={formikForPassword.touched.new_password && Boolean(formikForPassword.errors.new_password)}
                                                       helperText={formikForPassword.touched.new_password && formikForPassword.errors.new_password}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                                   edge="end"
                                                               >
                                                                   {passwordHide.showPassword ? <VisibilityOff/> :
                                                                       <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box m={1}>
                                            <TextField label={"Confirm New Password"}
                                                       variant={"outlined"}
                                                       margin={"dense"}
                                                       type={"password"}
                                                       id="confirm_new_password"
                                                       name="confirm_new_password"
                                                       value={formikForPassword.values.confirm_new_password}
                                                       onChange={formikForPassword.handleChange}
                                                       error={formikForPassword.touched.confirm_new_password && Boolean(formikForPassword.errors.confirm_new_password)}
                                                       helperText={formikForPassword.touched.confirm_new_password && formikForPassword.errors.confirm_new_password}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                                   edge="end"
                                                               >
                                                                   {passwordHide.showPassword ? <VisibilityOff/> :
                                                                       <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                            />
                                        </Box>
                                        <Box ml={1} mb={2}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type='submit'
                                                disabled={loading}
                                            >{loading ? 'Loading...' : 'Change Password'}
                                            </Button>
                                        </Box>
                                    </Box>

                                </form>
                            </Box>
                            <Divider/>
                        </TabPanel>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
        ;
}

export default ProfilePage;


