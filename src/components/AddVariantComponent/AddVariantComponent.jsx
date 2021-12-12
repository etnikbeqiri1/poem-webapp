import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import * as PropTypes from "prop-types";
import * as React from "react";

export default function AddVariantComponent(props) {
    return <Grid pt={1} xs={12}>
        <Grid display={"flex"}
              alignItems={"center"}
              alignSelf={"center"}
              justifyContent={"flex-end"}
        >
            <Button variant="outlined" color={"primary"}
                    onClick={props.onClick
                    }>Add
                Variant</Button>
        </Grid>
    </Grid>;
}

AddVariantComponent.propTypes = {onClick: PropTypes.func};