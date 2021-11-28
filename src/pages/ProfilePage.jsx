import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from "@mui/material/CardContent";
import {Avatar, Button, CardActions, CardMedia, Collapse, IconButton, TextField} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import {ExpandMore} from "@mui/icons-material";
import Card from "@mui/material/Card";
import {red} from "@mui/material/colors";
import * as yup from 'yup';
import {useFormik} from "formik";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const validationSchema = yup.object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(1),
    gender: yup.number(),
    confirm: yup.boolean().oneOf([true]).required(),
}).defined();



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

export default function ProfilePage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            username: '',
            password: '',
            confirmPassword: '',
            token: '',
            eKey: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // setLoading(true);
            //
            // axiosInstance
            //     .post(url.REGISTER_USER, values)
            //     .then(() => {
            //         ReactGA.event({
            //             category: 'User',
            //             action: 'Created an Account'
            //         });
            //         history.push(url.REGISTER_USER_REDIRECT);
            //     })
            //     .catch((err) => {
            //         let respCheck = JSON.parse(err.message);
            //         let errors = {}
            //         if (respCheck.username.includes('exists already')) {
            //             errors.username = language.IS_ALREADY_TAKEN;
            //         }
            //         if (respCheck['email address'].includes('exists already')) {
            //             errors.emailAddress = language.IS_ALREADY_TAKEN;
            //         }
            //         formik.setErrors(errors);
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     });
            console.log("test");
        },
    });

    return (
            <div className={"container pt-16"}>
                <div className={"flex flex-row rounded-xl"}>
                    <div className={"bg-superwhite mr-2 rounded-xl shadow-2xl"}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="tabs"
                        sx={{ borderRight: 1, borderColor: 'divider', borderRadius: 1 }}
                    >
                        <Box p={1}>
                            <DividerWithText>test</DividerWithText>
                        </Box>
                        <Tab label="Profile" {...a11yProps(0)} />
                        <Tab label="Address" {...a11yProps(1)} />
                        <Tab label="Bank Info" {...a11yProps(2)} />
                        <Tab label="Settings" {...a11yProps(3)} />
                    </Tabs>
                    </div>
                         <div className={"bg-superwhite rounded-xl ml-10 w-full shadow-2xl"}>
                        <TabPanel value={value} index={0}>
                            <div className={"container flex flex-row"}>
                                <div className="mt-1 ml-2 h-20 w-20" >
                                    <img className="rounded-full" src={"https://eu.ui-avatars.com/api/?background=C7D2FE&color=A855F7&size=240&name=Eohn+Boe"} />
                                </div>
                                <div className={""}>
                                <Button variant="contained" color="secondary">
                                    Change
                                </Button>
                                </div>
                            </div>
                            <div className={"flex flex-col"}>
                                <div className={"m-2"}>
                                    <TextField id="outlined-basic" label="Outlined" color="secondary" variant="outlined" />
                                </div>
                                <div className={"m-1.5"}>
                                    <TextField id="outlined-basic" label="Outlined" color="secondary" variant="outlined" />
                                </div>
                                <div className={"m-1.5"}>
                                    <TextField id="first_name"
                                               label={"First Name"}
                                               variant="outlined"
                                               fullWidth
                                               name={"firstName"}
                                               value={formik.values.firstName}
                                               onChange={formik.handleChange}
                                               error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                               helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </div>
                            </div>


                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Four
                        </TabPanel>
                         </div>

                </div>
            </div>
    );
}


