import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import * as React from "react";

export default function NoVariantsComponent(props) {
    return <Grid container>
        <Grid p={1} xs={6}>
            <TextField
                id="price"
                label="Price per Item"
                color={"primary"}
                fullWidth
                type={"number"}
                name={"price"}
                value={props.values.price}
                onChange={props.onChange}
                error={props.touched.price && Boolean(props.errors.price)}
                helperText={props.touched.price && props.errors.price}

            />
        </Grid>
        <Grid p={1} xs={6}>
            <Box>
                <TextField
                    id="stock"
                    label="Stock"
                    color={"primary"}
                    fullWidth
                    type={"number"}
                    name={"stock"}
                    value={props.values.stock}
                    onChange={props.onChange}
                    error={props.touched.stock && Boolean(props.errors.stock)}
                    helperText={props.touched.stock && props.errors.stock}
                />
            </Box>
        </Grid>
    </Grid>;
}

NoVariantsComponent.propTypes = {
    values: PropTypes.any,
    onChange: PropTypes.func,
    touched: PropTypes.any,
    errors: PropTypes.any
};