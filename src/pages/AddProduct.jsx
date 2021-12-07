import {
    Avatar,
    Button,
    Card,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Switch,
    TextField, Tooltip
} from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {getCategories} from "../helpers/requests/category";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {styled} from '@mui/material/styles';
import {useFormik} from "formik";
import * as profileHelper from "../helpers/requests/profile";
import {toast} from "react-toastify";
import * as yup from "yup";
import {addProduct} from "../helpers/requests/product";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const ibanRegExp = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/

const validationSchema = yup.object({
    name: yup
        .string("Enter your product name")
        .min(2, "Product name should be at least 2 characters in length!")
        .max(42, "Product name should be less than 42 characters in length!")
        .required("Product name is required!"),
    description: yup
        .string("Enter description for the product")
        .min(2, "Product description should be at least 2 characters in length!")
        .max(42, "Product description should be less than 422 characters in length!"),
}).defined();


export default function AddProduct() {

    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState([{
        "id": 1,
        "selected_variant": "name",
        "name": "test",
        "size": "",
        "color": "",
        "gender": "",
        "price": 0,
        "stock": 0,
    }]);
    const [category, setCategory] = React.useState([]);
    const [catID, setCatID] = React.useState("1");
    const [variantType, setVariantType] = React.useState("name");
    const [sizeSelected, setSizeSelected] = React.useState("s");

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
    const handleVariantClick = () => {
        let temp = [...variants]
        console.log(temp)
        let data = {
            "id": temp.length + 1,
            "selected_variant": "name",
            "name": "test2",
            "size": "",
            "color": "",
            "gender": "",
            "price": 0,
            "stock": 0,
        }
        temp.push(data);
        setVariants([...temp])

    };

    const formik = useFormik({
        initialValues: {
            "name": "",
            "description": "",
            "price": "",
            "stock": "",
            "hasVariants": "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let data = values;
            data.hasVariants = hasVariants;
            data.category = catID;
            let res = null;
            if (!hasVariants) {
                res = await addProduct(data);
            } else {
                data.variants = variants
                res = await addProduct(data);
            }

            const keys = Object.keys(variants);
            console.log(keys);

            console.log(res)
            toast("data " + res)

        },
    });

    return (
        <Grid>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'right'}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        onClick={formik.handleSubmit}
                        startIcon={<SaveIcon/>}
                    >
                        {'Save'}
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
                                        <Avatar
                                            alt="Remy Sharp"
                                            // variant="square"
                                            // borderRadius={2}
                                            src="https://picsum.photos/800"
                                            sx={{width: 100, height: 100}}
                                        />
                                    </Grid>
                                    <Grid m={1} xs={10}>
                                        <TextField
                                            id="name"
                                            label="Product Name"
                                            color={'primary'}
                                            fullWidth
                                            name={"name"}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </Grid>
                                    <Grid m={1} xs={10}>
                                        <Select
                                            labelId="test"
                                            id="test"
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
                                    </Grid>
                                    <Grid m={1} xs={10}>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            fullWidth
                                            name={"description"}
                                            multiline
                                            rows={3}
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
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
                                                <Grid m={1} xs={4}>
                                                    <TextField
                                                        id="price"
                                                        label="Price per Item"
                                                        color={'primary'}
                                                        fullWidth
                                                        type={'number'}
                                                        name={"price"}
                                                        value={formik.values.price}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                                        helperText={formik.touched.price && formik.errors.price}

                                                    />
                                                </Grid>
                                                <Grid m={1} xs={4}
                                                      display={'flex'}
                                                      alignItems={'center'}
                                                >
                                                    <Box>
                                                        <TextField
                                                            id="stock"
                                                            label="Stock"
                                                            color={'primary'}
                                                            fullWidth
                                                            type={'number'}
                                                            name={"stock"}
                                                            value={formik.values.stock}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                                                            helperText={formik.touched.stock && formik.errors.stock}
                                                        />
                                                    </Box>
                                                    <Box pl={1}>
                                                        <Button variant={'outlined'} color={'primary'}>Max</Button>
                                                    </Box>
                                                </Grid>

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
                                                <Grid m={1} xs={8}>
                                                    <Select
                                                        labelId="variantType"
                                                        id="variantType"
                                                        value={variantType}
                                                        onChange={handleVariantTypeChange}
                                                        label="variantType"
                                                        fullWidth
                                                        color={"primary"}
                                                    >
                                                        <MenuItem value={'name'}>By Name</MenuItem>
                                                        <MenuItem value={'size'}>By Size</MenuItem>
                                                        <MenuItem value={'color'}>By Color</MenuItem>
                                                        <MenuItem value={'gender'}>By Gender</MenuItem>
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    {variants.map((row, index) => (
                                        <Grid pt={1}>
                                            <Card mt={3} variant="outlined">
                                                <Grid display={'flex'}
                                                      flexDirection={'column'}
                                                      alignItems={'stretch'}
                                                      p={2}
                                                >
                                                    <Grid
                                                        xs={12}
                                                        display={'flex'}
                                                        alignItems={'center'}
                                                        alignSelf={'center'}
                                                        flexDirection={'row'}
                                                        justifyContent={'space-around'}
                                                    >
                                                        <Box>
                                                            <Typography variant='text'
                                                                        align='center'>Variant {row.id}</Typography>
                                                        </Box>

                                                        <Box>
                                                            <Tooltip title="Delete">
                                                                <IconButton>
                                                                    <DeleteIcon color={'primary'}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Grid>

                                                    {variantType === "name" ? (
                                                            <>
                                                                <Grid m={1} xs={10}>
                                                                    <TextField
                                                                        id="name1"
                                                                        label="Item Variant Name"
                                                                        color={'primary'}
                                                                        fullWidth
                                                                        name={"name"}
                                                                    />
                                                                </Grid>
                                                            </>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }
                                                    {variantType === "size" ? (
                                                            <>
                                                                <Grid m={1} xs={6}>
                                                                    <Select
                                                                        labelId="size"
                                                                        id="size"
                                                                        value={sizeSelected}
                                                                        onChange={handleSizeChange}
                                                                        label="Size"
                                                                        fullWidth
                                                                        color={"primary"}

                                                                    >

                                                                        <MenuItem value={"small"}>Small</MenuItem>
                                                                        <MenuItem value={"medium"}>Medium</MenuItem>
                                                                        <MenuItem value={"large"}>Large</MenuItem>
                                                                        <MenuItem value={"x-large"}>X-Large</MenuItem>
                                                                        <MenuItem value={"2x-large"}>2X-Large</MenuItem>

                                                                    </Select>
                                                                </Grid>
                                                            </>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }
                                                    {variantType === "color" ? (
                                                            <>
                                                                <Typography variant="text"
                                                                            align="center"> Color < / Typography>
                                                            </>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }
                                                    {variantType === "gender" ? (
                                                            <>
                                                                <Typography variant="text"
                                                                            align="center"> Gender < / Typography>
                                                            </>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }


                                                    <Grid m={1} xs={4}>
                                                        <TextField
                                                            id="price"
                                                            label="Price per Item"
                                                            color={'primary'}
                                                            fullWidth
                                                            name={"price"}
                                                        />
                                                    </Grid>
                                                    <Grid m={1} xs={4}
                                                          display={'flex'}
                                                          alignItems={'center'}
                                                    >
                                                        <Box>
                                                            <TextField
                                                                id="stock"
                                                                label="Stock"
                                                                color={'primary'}
                                                                fullWidth
                                                                name={"stock"}
                                                            />
                                                        </Box>
                                                        <Box pl={1}>
                                                            <Button variant={'outlined'} color={'primary'}>Max</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    ))}
                                    <Grid pt={1} xs={12}>
                                        <Grid display={'flex'}
                                              alignItems={'center'}
                                              alignSelf={'center'}
                                              justifyContent={'flex-end'}
                                        >
                                            <Button variant='outlined' color={'primary'} onClick={handleVariantClick}>Add
                                                Variant</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <></>
                        )
                        }

                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}