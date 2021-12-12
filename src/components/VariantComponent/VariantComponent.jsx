import Grid from "@mui/material/Grid";
import {Card, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import * as PropTypes from "prop-types";
import * as React from "react";

export default function VariantComponent(props) {
    return <div>
        <Grid pt={1}>
            <Card mt={3} variant="outlined">
                <Grid display={"flex"}
                      flexDirection={"column"}
                      alignItems={"stretch"}
                      p={2}
                >
                    <Grid
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        alignSelf={"center"}
                        flexDirection={"row"}
                        justifyContent={"space-around"}
                    >
                        <Box>
                            <Typography variant="text"
                                        align="center">Variant {props.index + 1}</Typography>
                        </Box>

                        <Box>
                            <Tooltip title="Delete">
                                <IconButton>
                                    <DeleteIcon
                                        onClick={props.onClick}
                                        color={"primary"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>

                    {props.variantType === "name" ? (
                            <>
                                <Grid m={1} xs={12}>
                                    <TextField
                                        id="name1"
                                        label="Item Variant Name"
                                        color={"primary"}
                                        fullWidth
                                        name={props.name}
                                        value={props.vari.name}
                                        required
                                        helperText={
                                            props.touchedName && props.errorName
                                                ? props.errorName
                                                : ""
                                        }
                                        error={Boolean(props.touchedName && props.errorName)}
                                        onChange={props.onChange}
                                        onBlur={props.onBlur}
                                    />
                                </Grid>
                            </>
                        ) :
                        (
                            <></>
                        )
                    }
                    {props.variantType === "size" ? (
                            <>
                                <Grid m={1} xs={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            select
                                            labelId="size"
                                            id="size"
                                            name={props.size}
                                            value={props.vari.size}
                                            required
                                            helperText={
                                                props.touchedSize && props.errorSize
                                                    ? props.errorSize
                                                    : ""
                                            }
                                            error={Boolean(props.touchedSize && props.errorSize)}
                                            onChange={props.onChange}
                                            onBlur={props.onBlur}
                                            label="Size"
                                            fullWidth
                                            color={"primary"}

                                        >

                                            <MenuItem
                                                value={"small"}>Small</MenuItem>
                                            <MenuItem
                                                value={"medium"}>Medium</MenuItem>
                                            <MenuItem
                                                value={"large"}>Large</MenuItem>
                                            <MenuItem
                                                value={"x-large"}>X-Large</MenuItem>
                                            <MenuItem
                                                value={"2x-large"}>2X-Large</MenuItem>

                                        </TextField>
                                    </FormControl>
                                </Grid>
                            </>
                        ) :
                        (
                            <></>
                        )
                    }
                    {props.variantType === "color" ? (
                            <>
                                <Grid m={1} xs={12}>
                                    <TextField
                                        id="name1"
                                        label="Variant Color"
                                        color={"primary"}
                                        fullWidth
                                        name={props.color}
                                        value={props.vari.color}
                                        required
                                        helperText={
                                            props.touchedColor && props.errorColor
                                                ? props.errorColor
                                                : ""
                                        }
                                        error={Boolean(props.touchedColor && props.errorColor)}
                                        onChange={props.onChange}
                                        onBlur={props.onBlur}
                                    />
                                </Grid>
                            </>
                        ) :
                        (
                            <></>
                        )
                    }
                    {props.variantType === "gender" ? (
                            <>
                                <Grid m={1} xs={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            select
                                            labelId="Gender"
                                            id="gender"
                                            name={props.gender}
                                            value={props.vari.gender}
                                            required
                                            helperText={
                                                props.touchedGender && props.errorGender
                                                    ? props.errorGender
                                                    : ""
                                            }
                                            error={Boolean(props.touchedGender && props.errorGender)}
                                            onChange={props.onChange}
                                            onBlur={props.onBlur}
                                            label="Gender"
                                            fullWidth
                                            color={"primary"}

                                        >

                                            <MenuItem
                                                value={"male"}>
                                                Male
                                            </MenuItem>
                                            <MenuItem
                                                value={"female"}>
                                                Female
                                            </MenuItem>
                                            <MenuItem value={"unisex"}>
                                                Unisex
                                            </MenuItem>

                                        </TextField>
                                    </FormControl>
                                </Grid>
                            </>
                        ) :
                        (
                            <></>
                        )
                    }

                    <Grid container>
                        <Grid p={1} xs={6}>
                            <TextField
                                id="price"
                                label="Price per Item"
                                color={"primary"}
                                fullWidth
                                name={props.name1}
                                value={props.vari.price}
                                required
                                helperText={
                                    props.touchedPrice && props.errorPrice
                                        ? props.errorPrice
                                        : ""
                                }
                                type="number"
                                error={Boolean(props.touchedPrice && props.errorPrice)}
                                onChange={props.onChange}
                                onBlur={props.onBlur}
                            />
                        </Grid>
                        <Grid p={1} xs={6}>
                            <Box>
                                <TextField
                                    id="stock"
                                    label="Stock"
                                    color={"primary"}
                                    fullWidth
                                    name={props.name2}
                                    value={props.vari.stock}
                                    required
                                    type="number"
                                    helperText={
                                        props.touchedStock && props.errorStock
                                            ? props.errorStock
                                            : ""
                                    }
                                    error={Boolean(props.touchedStock && props.errorStock)}
                                    onChange={props.onChange}
                                    onBlur={props.onBlur}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    </div>;
}

VariantComponent.propTypes = {
    index: PropTypes.any,
    onClick: PropTypes.func,
    variantType: PropTypes.string,
    name: PropTypes.string,
    vari: PropTypes.any,
    touchedName: PropTypes.any,
    errorName: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    onChange1: PropTypes.func,
    name1: PropTypes.string,
    touchedPrice: PropTypes.any,
    errorPrice: PropTypes.any,
    name2: PropTypes.string,
    touchedStock: PropTypes.any,
    errorStock: PropTypes.any,
    size: PropTypes.string,
    touchedSize: PropTypes.any,
    errorSize: PropTypes.any,
    color: PropTypes.string,
    touchedColor: PropTypes.any,
    errorColor: PropTypes.any,
    gender: PropTypes.string,
    touchedGender: PropTypes.any,
    errorGender: PropTypes.any,
};