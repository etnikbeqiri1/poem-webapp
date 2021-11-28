import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import styled from "styled-components";
import * as profileHelper from "../helpers/requests/profile";
import CustomInput from "../components/CustomInput/CustomInput";
import {Button} from "reactstrap";
import {TextField} from "@mui/material";

const Profile= () => {
    const auth = useAuth();


    const [text, setText] = useState("");
    const [name, setName] = useState(auth.user.displayName);
    const input = useRef(null);
    const [profile, setProfile] = useState({});
    const [refresh, setRefresh] = useState(0);



    // useEffect(async () => {
    //     let res = await profileHelper.getProfile();
    //     console.log(res);
    //     setProfile(res.data);
    // }, [refresh]);
    //


    return <ProfileContainer>

        <div className={"container mt-12"}>
            <div className={"flex flex-wrap justify-evenly"}>

                <div className={"flex lg:w-1/4 md:w-2/4 sm:w-1/2 w-full bg-gray-100 shadow-lg rounded-xl m-4 pt-6 pb-16"}>
                    <div className={"w-full pr-4"}>
                        <div className={"flex flex-row justify-between align-center pb-4"}>

                            <div className="mt-8 ml-7 h-24 w-24" >
                                <img className="rounded-full" src={"https://eu.ui-avatars.com/api/?background=C7D2FE&color=A855F7&size=240&name=Eohn+Boe"} />
                            </div>

                            <div className={"w-auto p-3 mt-10 isolate"} >
                                <div className={"rounded-xl bg-secondary p-3  align-text-bottom shadow-lg hover:shadow-xl"}>
                                    <button className="focus:outline-none ">
                                        Change Image
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"flex-col ml-4 mt-1 "}>
                            <div className={"w-full"}>
                                <div className={""}>
                                    <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Name</p>
                                    <CustomInput disabled value={auth.user.displayName} />
                                </div>
                            </div>

                            <div className={"w-full"}>
                                <div className={""}>
                                    <p className={"font-light ml-2 text-sm opacity-40"}>Email</p>

                                    <CustomInput disabled value={auth.user.email} />
                                </div>
                            </div>

                            <TextField id="first_name"
                                       label={"Name"}
                                       variant="outlined"
                                       fullWidth
                                       name={"firstName"}
                                       color={"secondary"}
                            />

                            <TextField id="first_name"
                                       label={"User"}
                                       variant="outlined"
                                       fullWidth
                                       name={"firstName"}
                                       color={"primary"}
                            />

                            <div className={"w-full"}>
                                <div className={""}>
                                    <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Last Login</p>

                                    <CustomInput disabled value={auth.user.metadata.lastSignInTime} />
                                </div>
                                {/*<div className={"m-3 p-2 rounded-xl shadow-inner"}>*/}
                                {/*    <h5 className={"font-light"}>Last Login</h5>*/}
                                {/*</div>*/}
                                {/*<div className={"m-3 p-2 bg-secondary rounded-xl overflow-clip shadow-xl"}>*/}
                                {/*    <h4 className={"font-light text-gray-900"}>15 March 2021, 14:28:36AM </h4>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={" w-3/5 bg-gray-100 shadow-lg rounded-xl m-4 sm:w-1/2 md:w-1/2 w-full "}>
                    <div className={"flex-col w-full"}>
                        <p className={"text-center font-medium text-4xl p-4 align-middle"}> User Details </p>
                        <div className={"flex flex-wrap m-4 w-full"}>


                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>full name</p>

                                <CustomInput placeholder={"John Doe"} value={name} />
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Street</p>

                                <CustomInput placeholder={"Street"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Street 2</p>

                                <CustomInput placeholder={"Street 2"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>City</p>

                                <CustomInput placeholder={"City"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Zip</p>

                                <CustomInput placeholder={"Zip"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Phone</p>

                                <CustomInput placeholder={"Phone"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Phone 2</p>

                                <CustomInput placeholder={"Phone 2"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>

                            <div className={"md:w-2/3 xl:w-1/3 w-5/6"}>
                                <p className={"font-light capitalize ml-2 text-sm opacity-40"}>Country</p>

                                <CustomInput placeholder={"Country"} value={text} onChange={(e) => {
                                    setText(e.target.value);
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



    </ProfileContainer>

};

const ProfileContainer = styled.div`
  
`;


export default Profile;
