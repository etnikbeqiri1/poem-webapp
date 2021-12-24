import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
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
import {addProduct} from "../helpers/requests/product";
import {FieldArray, Form, Formik, getIn} from "formik";
import VariantComponent from "../components/VariantComponent/VariantComponent";
import AddVariantComponent from "../components/AddVariantComponent/AddVariantComponent";
import NoVariantsComponent from "../components/NoVariantsComponent/NoVariantsComponent";
import firebase from "firebase";
import {LoadingButton} from "@mui/lab";
import {useHistory} from "react-router-dom";

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


export default function AddProduct() {

    const [hasVariants, setHasVariants] = useState(false);
    const [category, setCategory] = React.useState([]);
    const [catID, setCatID] = React.useState("1");
    const [variantType, setVariantType] = React.useState("name");
    const [sizeSelected, setSizeSelected] = React.useState("s");
    const [loading, setLoading] = React.useState(false);

    let history = useHistory();

    const [photoURL, setPhotoURL] = useState("https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640");
    const [imageUploading, setImageUploading] = useState(false);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const user = firebase.auth().currentUser;
            setImageUploading(true);
            const storageRef = firebase.storage().ref(user?.uid + '/product/' + Math.floor(Math.random() * 9999999) + '/' + img.name);
            storageRef.put(img).then((snapshot) => {
                console.log(snapshot.ref.getDownloadURL().then(e => {
                    setPhotoURL(e)
                }))
            }).finally(() => {
                setImageUploading(false);
            });
        }
    }

    useEffect(async () => {
        let req = await getCategories();
        setCategory(req.data);
    }, [])


    const handleVariantChange = (event) => {
        setHasVariants(event.target.checked);
    };
    const handleVariantTypeChange = (event) => {
        setVariantType(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCatID(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSizeSelected(event.target.value);
    };

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
                    variants: [
                        {
                            selected_variant: "name",
                            name: "",
                            price: 0,
                            stock: 0,
                            size: "",
                            color: "",
                            gender: "",
                        }
                    ]
                }}
                validationSchema={validationSchema}
                onSubmit={async values => {
                    setLoading(true);
                    values.category = parseInt(catID);
                    values.hasVariants = hasVariants;
                    values.photo = photoURL;
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
                                    'Save'
                                }
                            </Button>
                        </Box>
                        <Grid pt={2} pb={8} sx={{flexGrow: 1, flexWrap: 1}}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>

                                    <Card variant="outlined">
                                        <img src={photoURL} alt={"product image"} style={{
                                            height: 200,
                                            width: "100%",
                                            objectFit: "cover"
                                        }}/>
                                        <Box mt={"-20px"} pl={1}>
                                            <label htmlFor="icon-button-file">
                                                <input
                                                    accept="image/*"
                                                    id="icon-button-file"
                                                    type="file"
                                                    onChange={onImageChange}
                                                    style={{
                                                        display: "none",
                                                    }}
                                                />
                                                <LoadingButton
                                                    variant={"contained"}
                                                    aria-label="upload picture"
                                                    component="span"
                                                    style={{color: "white"}}
                                                    // disabled={imageUploading}
                                                    loading={imageUploading}
                                                >
                                                    Change Image
                                                </LoadingButton>
                                            </label>
                                        </Box>
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
                                                    label="Product Name"
                                                    color={'primary'}
                                                    fullWidth
                                                    required
                                                    name={"name"}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="category">
                                                        Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="category"
                                                        id="category"
                                                        value={catID}
                                                        onChange={handleCategoryChange}
                                                        label="Country"
                                                        fullWidth
                                                        color={"primary"}

                                                    >
                                                        {category.map((cat, index) => (
                                                            <MenuItem value={cat.id}>{cat.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid m={1} xs={12}>
                                                <TextField
                                                    id="description"
                                                    label="Description"
                                                    fullWidth
                                                    name={"description"}
                                                    multiline
                                                    rows={3}
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    error={touched.description && Boolean(errors.description)}
                                                    helperText={touched.description && errors.description}
                                                />
                                            </Grid>
                                            <Grid m={1} xs={10}>
                                                <FormControlLabel
                                                    value="start"
                                                    control={
                                                        <Switch
                                                            aria-label={"switch"}
                                                            value={hasVariants}
                                                            color="primary"
                                                            onChange={handleVariantChange}
                                                        />
                                                    }
                                                    label="Has Variants"
                                                    labelPlacement="has_variants"
                                                />

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
                                                        <Grid xs={12}>
                                                            <Typography variant='text' align='center'>Select Variant
                                                                Types</Typography>
                                                        </Grid>
                                                        <Grid m={1} xs={12}>
                                                            <FormControl fullWidth>
                                                                <InputLabel
                                                                    id="demo-simple-select-label">Variant
                                                                    Type</InputLabel>

                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="variantType"
                                                                    value={variantType}
                                                                    onChange={handleVariantTypeChange}
                                                                    label="Variant Type"
                                                                    fullWidth
                                                                    color={"primary"}
                                                                >
                                                                    <MenuItem value={'name'}>By Name</MenuItem>
                                                                    <MenuItem value={'size'}>By Size</MenuItem>
                                                                    <MenuItem value={'color'}>By Color</MenuItem>
                                                                    <MenuItem value={'gender'}>By Gender</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Grid>

                                            <FieldArray name="variants">
                                                {({push, remove}) => (
                                                    <>
                                                        {values.variants.map((vari, index) => {
                                                            const name = `variants[${index}].name`;
                                                            const touchedName = getIn(touched, name);
                                                            const errorName = getIn(errors, name);

                                                            const size = `variants[${index}].size`;
                                                            const touchedSize = getIn(touched, size);
                                                            const errorSize = getIn(errors, size);

                                                            const color = `variants[${index}].color`;
                                                            const touchedColor = getIn(touched, color);
                                                            const errorColor = getIn(errors, color);

                                                            const gender = `variants[${index}].gender`;
                                                            const touchedGender = getIn(touched, gender);
                                                            const errorGender = getIn(errors, gender);

                                                            const stock = `variants[${index}].stock`;
                                                            const touchedStock = getIn(touched, stock);
                                                            const errorStock = getIn(errors, stock);

                                                            const price = `variants[${index}].price`;
                                                            const touchedPrice = getIn(touched, price);
                                                            const errorPrice = getIn(errors, price);

                                                            vari.selected_variant = variantType;
                                                            return (
                                                                <VariantComponent key={index}
                                                                                  index={index}
                                                                                  onClick={() => remove(index)}
                                                                                  variantType={variantType}
                                                                                  name={name}
                                                                                  vari={vari}
                                                                                  touchedName={touchedName}
                                                                                  errorName={errorName}
                                                                                  onChange={handleChange}
                                                                                  onBlur={handleBlur}
                                                                                  value={sizeSelected}
                                                                                  onChange1={handleSizeChange}
                                                                                  name1={price}
                                                                                  touchedPrice={touchedPrice}
                                                                                  errorPrice={errorPrice}
                                                                                  name2={stock}
                                                                                  touchedStock={touchedStock}
                                                                                  errorStock={errorStock}
                                                                                  size={size}
                                                                                  touchedSize={touchedSize}
                                                                                  errorSize={errorSize}
                                                                                  color={color}
                                                                                  touchedColor={touchedColor}
                                                                                  errorColor={errorColor}
                                                                                  gender={gender}
                                                                                  touchedGender={touchedGender}
                                                                                  errorGender={errorGender}
                                                                />
                                                            );
                                                        })}
                                                        <AddVariantComponent onClick={() =>
                                                            push({
                                                                name: "",
                                                                price: 0,
                                                                stock: 0,
                                                                size: "",
                                                                color: "",
                                                                gender: ""
                                                            })}/>
                                                    </>

                                                )}
                                            </FieldArray>

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