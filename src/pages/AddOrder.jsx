import {
    alpha,
    Autocomplete, Avatar,
    Button,
    Card, CardContent, CardHeader, Chip,
    FormControl,
    FormControlLabel, IconButton,
    InputLabel, ListItem, ListItemIcon,
    MenuItem,
    Select,
    Switch,
    TextField, Toolbar, Tooltip,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {getCategories} from "../helpers/requests/category";
import SaveIcon from '@mui/icons-material/Save';
import {toast} from "react-toastify";
import * as yup from "yup";
import {addProduct, getProducts, getProductsByName} from "../helpers/requests/product";
import {FieldArray, Form, Formik, getIn} from "formik";
import VariantComponent from "../components/VariantComponent/VariantComponent";
import AddVariantComponent from "../components/AddVariantComponent/AddVariantComponent";
import NoVariantsComponent from "../components/NoVariantsComponent/NoVariantsComponent";
import firebase from "firebase";
import {LoadingButton} from "@mui/lab";
import {useHistory} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import PropTypes from "prop-types";
import * as api_help from "../helpers/requests/product";
import {getOrdersByName} from "../helpers/requests/order";

const validationSchema = yup.object({
    name: yup
        .string("Enter your product name")
        .min(2, "Product name should be at least 2 characters in length!")
        .max(42, "Product name should be less than 42 characters in length!")
        .required("Product name is required!"),
    description: yup
        .string("Enter description for the product")
        .min(2, "Product description should be at least 2 characters in length!")
        .max(422, "Product description should be less than 422 characters in length!"),
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
        props.onPriceChange((props.vari?.variants[findIndex(selectedVariant)]?.price ?? props.vari.price) * props.vari.items)
    }, [props.vari.items, selectedVariant])

    return <Card style={{marginTop: 5}} variant={"outlined"}>
        <CardHeader avatar={<Avatar src={props.vari.photo}/>} title={props.vari.name} subheader={props.vari.description}
                    action={<Chip
                        label={((props.vari?.variants[findIndex(selectedVariant)]?.price ?? props.vari.price) * props.vari.items).toFixed(2) + " €"}
                        variant={"outlined"} color="primary"/>
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

    const [hasVariants, setHasVariants] = useState(true);
    const [products, setProducts] = React.useState([]);
    const [countryID, setCountryID] = React.useState("Kosovo");
    const [variantType, setVariantType] = React.useState("name");
    const [sizeSelected, setSizeSelected] = React.useState("s");
    const [loading, setLoading] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [price, setPrice] = React.useState(0);


    let history = useHistory();

    useEffect(() => {
        console.log(selectedProducts)
    }, [selectedProducts])

    const handleVariantChange = (event) => {
        setHasVariants(event.target.checked);
    };
    const handleCategoryChange = (event) => {
        setCountryID(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSizeSelected(event.target.value);
    };

    const [searchWord, setSearchWord] = useState("");
    useEffect(async () => {
        console.log(searchWord);
        let data = {
            "name": searchWord
        }
        let res = await getProductsByName(data);
        setProducts(res.data)
    }, [searchWord])

    return (
        <Grid>
            <Formik
                initialValues={{
                    name: "",
                    category: 1,
                    hasVariants: hasVariants,
                    description: "",
                    price: 0,
                    stock: 0,
                    products: []
                }}
                validationSchema={validationSchema}
                onSubmit={async values => {
                    setLoading(true);
                    values.category = countryID;
                    values.hasVariants = hasVariants;
                    let res = await addProduct(values)
                    setLoading(false);
                    toast(res.info.message)
                    // console.log("onSubmit", JSON.stringify(res.data, null, 2));
                    history.push('/products')
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


                                            <Grid m={1}>
                                                {hasVariants ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <NoVariantsComponent values={values} onChange={handleChange}
                                                                             touched={touched} errors={errors}/>

                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                {hasVariants ? (
                                    <>
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
                                                                    values.products = newValue;
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
                                                                    onPriceChange={(newPrice) => {
                                                                        let temp = [...selectedProducts];
                                                                        temp[index].priceNow = newPrice;
                                                                        setSelectedProducts(temp);
                                                                    }}
                                                    />
                                                );
                                            })}
                                            <Card style={{marginTop: 5}} variant={"outlined"}>
                                                <CardHeader title={"Total"} action={selectedProducts.reduce((a, b) => a + b.priceNow, 0)}/>
                                            </Card>

                                        </Grid>
                                    </>
                                ) : (
                                    <></>
                                )
                                }

                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
}