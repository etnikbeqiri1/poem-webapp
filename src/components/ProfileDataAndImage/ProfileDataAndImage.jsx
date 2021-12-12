import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import firebase from "firebase";
import {LoadingButton} from "@mui/lab";
import PropTypes from "prop-types";
import * as React from "react";

export default function ProfileDataAndImage(props) {
    return <Box
        display="flex"
        flexDirection="row"
    >
        <Box pr={2}>
            <Avatar
                alt="e"
                src={firebase.auth().currentUser?.photoURL}
                sx={{width: 70, height: 70}}
                boxShadow="3"
            />
        </Box>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <label htmlFor="icon-button-file">
                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={props.onChange}
                    style={{
                        display: "none",
                    }}
                />
                <LoadingButton
                    variant={"outlined"}
                    aria-label="upload picture"
                    component="span"
                    // disabled={imageUploading}
                    loading={props.loading}
                >
                    Change Image
                </LoadingButton>
            </label>
        </Box>
    </Box>;
}

ProfileDataAndImage.propTypes = {
    onChange: PropTypes.func,
    loading: PropTypes.bool
};