import {
    Autocomplete,
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useEffect, useState} from "react";
import SaveIcon from '@mui/icons-material/Save';
import {toast} from "react-toastify";
import * as yup from "yup";
import {getProducts, getProductsByName} from "../helpers/requests/product";
import { Form, Formik} from "formik";
import NoVariantsComponent from "../components/NoVariantsComponent/NoVariantsComponent";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {addOrder} from "../helpers/requests/order";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object({
    full_name: yup
        .string("Enter consumer full name")
        .min(2, "Full name should be at least 2 characters in length!")
        .max(60, "Full name should be less than 60 characters in length!")
        .required("Full name is required!"),
    street: yup
        .string("Enter consumer street name")
        .min(2, "Street name should be at least 2 characters in length!")
        .max(60, "Street name should be less than 60 characters in length!")
        .required("Street name is required!"),
    street_2: yup
        .string("Enter consumer street name")
        .min(2, "Street name should be at least 2 characters in length!")
        .max(60, "Street name should be less than 60 characters in length!"),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone Number is required"),
    phone_2: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    city: yup
        .string("Enter consumer city name")
        .min(2, "City name should be at least 2 characters in length!")
        .max(42, "City name should be less than 42 characters in length!")
        .required("City name is required!"),
    zip: yup
        .number("Enter consumer zip code")
        .required("Zip is required!"),
}).defined();


function OrderComponent(props) {
    const [selectedVariant, setSelectedVariant] = useState(props.vari.variants[0]?.id ?? 0);

    const findIndex = (id) => {
        for (let index = 0; index < props.vari.variants.length; index++) {
            const variant = props.vari.variants[index];
            if (variant.id === id) {
                return index
            }
        }
        return 0
    }

    useEffect(() => {
        props.onPriceChange(((props.vari?.variants[findIndex(selectedVariant)]?.price ?? props.vari.price) * props.vari.items),selectedVariant)
    }, [props.vari.items, selectedVariant])

    return <Card key={2} style={{marginTop: 5}} variant={"outlined"}>
        <CardHeader avatar={<Avatar src={props.vari.photo}/>} title={props.vari.name} subheader={props.vari.description}
                    action={
                        <Chip
                        label={((props.vari?.variants[findIndex(selectedVariant)]?.price ?? props.vari.price) * props.vari.items).toFixed(2) + " €"}
                        variant={"outlined"}
                        color="primary"/>
                    }/>
        <CardContent>
            {props.vari.hasVariants === 1 && <FormControl style={{marginBottom: 8}} fullWidth>
                <InputLabel id="demo-simple-select-helper-label">{props.vari.variants[0].selected_variant}</InputLabel>
                <Select value={selectedVariant}
                        onChange={(e) => {
                            setSelectedVariant(e.target.value)
                        }}
                        fullWidth
                        label={props.vari.variants[0].selected_variant}
                >
                    {
                        props.vari.variants.map((variant, index) => {
                            let selectedVariant = variant.selected_variant;
                            return (
                                <MenuItem value={variant.id}>{variant[selectedVariant]}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>}

            <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
                value={props.vari.items}
                fullWidth
            />
        </CardContent>
    </Card>;
}

OrderComponent.propTypes = {vari: PropTypes.any, onChange: PropTypes.any, onPriceChange: PropTypes.any};


export default function AddOrder() {
    const [products, setProducts] = React.useState([]);
    const [countryID, setCountryID] = React.useState("Kosovo");
    const [loading, setLoading] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    let history = useHistory();

    const handleCategoryChange = (event) => {
        setCountryID(event.target.value);
    };

    useEffect(async () => {
        let res = await getProducts();
        setProducts(res.data)
    }, [])

    return (
        <Grid>
            <Formik
                initialValues={{
                    statusName: "ShopTestName",
                    full_name : "",
                    street : "",
                    street_2 : "",
                    phone : "",
                    phone_2 : "",
                    city : "",
                    zip : "",
                    products: []
                }}
                validationSchema={validationSchema}
                onSubmit={async values => {
                    setLoading(true);
                    values.country = countryID;
                    values.products = selectedProducts.map((item, index) => {
                        return {
                            product_id: item.id,
                            hasVariant: item.hasVariants,
                            variant_id: item.selectedVariantNow,
                            items: parseInt(item.items),
                        };
                    });
                    if(values.products.length < 1){
                        toast("Please add at least one product")
                        setLoading(false);
                    }else{
                        let res = await addOrder(values)
                        setLoading(false);
                        toast(res.info.message)
                        history.push('/orders')
                    }
                }}
            >
                {({values, touched, errors, handleChange, handleBlur, isValid}) => (
                    <Form noValidate autoComplete="off">
                        <Box
                            mt={2}
                            display={'flex'}
                            justifyContent={'right'}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                disabled={loading}
                                startIcon={<SaveIcon/>}
                            >
                                {loading ?
                                    'Loading'
                                    :
                                    'Create Order'
                                }
                            </Button>
                        </Box>
                        <Grid pt={2} pb={8} sx={{flexGrow: 1, flexWrap: 1}}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>

                                    <Card variant="outlined">
                                        <Grid display={'flex'}
                                              flexDirection={'column'}
                                              alignItems={'stretch'}
                                              p={2}
                                        >
                                            <Grid m={1} xs={12}
                                                  align={'center'}
                                            >

                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Full Name"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"full_name"}
                                                    value={values.full_name}
                                                    onChange={handleChange}
                                                    error={touched.full_name && Boolean(errors.full_name)}
                                                    helperText={touched.full_name && errors.full_name}
                                                />
                                            </Grid>

                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Street"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"street"}
                                                    value={values.street}
                                                    onChange={handleChange}
                                                    error={touched.street && Boolean(errors.street)}
                                                    helperText={touched.street && errors.street}
                                                />
                                            </Grid>

                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Street 2"
                                                    color={'primary'}
                                                    fullWidth
                                                    name={"street_2"}
                                                    value={values.street_2}
                                                    onChange={handleChange}
                                                    error={touched.street_2 && Boolean(errors.street_2)}
                                                    helperText={touched.street_2 && errors.street_2}
                                                />
                                            </Grid>

                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Phone"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"phone"}
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    error={touched.phone && Boolean(errors.phone)}
                                                    helperText={touched.phone && errors.phone}
                                                />
                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Phone 2"
                                                    color={'primary'}
                                                    fullWidth
                                                    name={"phone2"}
                                                    value={values.phone_2}
                                                    onChange={handleChange}
                                                    error={touched.phone_2 && Boolean(errors.phone_2)}
                                                    helperText={touched.phone_2 && errors.phone_2}
                                                />
                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="City"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"city"}
                                                    value={values.city}
                                                    onChange={handleChange}
                                                    error={touched.city && Boolean(errors.city)}
                                                    helperText={touched.city && errors.city}
                                                />
                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="name"
                                                    label="Zip Code"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"zip"}
                                                    value={values.zip}
                                                    onChange={handleChange}
                                                    error={touched.zip && Boolean(errors.zip)}
                                                    helperText={touched.zip && errors.zip}
                                                />
                                            </Grid>

                                            <Grid m={1} xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="country">
                                                        Country
                                                    </InputLabel>
                                                    <Select
                                                        labelId="country"
                                                        id="country"
                                                        value={countryID}
                                                        onChange={handleCategoryChange}
                                                        label="Country"
                                                        fullWidth
                                                        color={"primary"}
                                                    >
                                                        <MenuItem value={"Kosovo"}>Kosovo</MenuItem>
                                                        <MenuItem value={"Albania"}>Albania</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                        <Grid item xs={6}>
                                            <Grid>
                                                <Card variant="outlined">
                                                    <Grid display={'flex'}
                                                          flexDirection={'column'}
                                                          alignItems={'stretch'}
                                                          p={2}
                                                    >
                                                        <Grid m={1} xs={12}>
                                                            <Autocomplete
                                                                multiple
                                                                id="multiple-limit-tags"
                                                                options={products}
                                                                getOptionLabel={(option) => option.name}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} label="Select Products"
                                                                               placeholder="Products"/>
                                                                )}
                                                                onChange={(event, newValue) => {
                                                                    console.log(JSON.stringify(newValue, null, ' '));
                                                                    setSelectedProducts(newValue.map((item, index) => {
                                                                        return {...item, items: 1};
                                                                    }));
                                                                    // values.products = newValue;
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Grid>

                                            {selectedProducts.map((vari, index) => {
                                                return (
                                                    <OrderComponent vari={vari} onChange={(items) => {
                                                        let temp = [...selectedProducts];
                                                        temp[index].items = items;
                                                        setSelectedProducts(temp);
                                                    }}
                                                                    onPriceChange={(newPrice,variantID) => {
                                                                        let temp = [...selectedProducts];
                                                                        temp[index].priceNow = newPrice;
                                                                        temp[index].selectedVariantNow = variantID;
                                                                        setSelectedProducts(temp);
                                                                    }}
                                                    />
                                                );
                                            })}
                                            <Card style={{marginTop: 5}} variant={"outlined"}>
                                                <CardHeader title={"Total"} action={selectedProducts.reduce((a, b) => a + b.priceNow, 0) + " €"}/>
                                            </Card>
                                        </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
}