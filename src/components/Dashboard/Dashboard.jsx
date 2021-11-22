import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import Text from '../Typography/Text';
import {useAuth} from '../../hooks/useAuth';
import { getProfileData } from '../../helpers/requests/profile'
// import MotionHoc from "../../pages/MotionHoc";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";

const Dashboard = () => {
    const auth = useAuth();


    return (
        <DashboardContainer>
            <Grid container spacing={0}>
                <Grid item xs={8} m={6} lg={3} xl={3}>
                    <Card >
                        <CardHeader
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <Text p={5}> Test</Text>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} m={6} lg={3} xl={7}>
                    <Card >
                        <CardHeader
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <Text p={5}> Test</Text>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid><Grid item xs={8} m={6} lg={3} xl={2}>
                <Card >
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <Text p={5}> Test</Text>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid><Grid item xs={8} m={6} lg={3} xl={2}>
                <Card >
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <Text p={5}> Test</Text>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid><Grid item xs={8} m={6} lg={3} xl={2}>
                <Card >
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <Text p={5}> Test</Text>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid><Grid item xs={8} m={6} lg={3} xl={2}>
                <Card >
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <Text p={5}> Test</Text>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>

        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
  
`;

// const DashboardComponent = MotionHoc(Dashboard);



export default Dashboard;
