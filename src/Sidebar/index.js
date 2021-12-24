import React, { useState } from "react";

//All the svg files
import logo from "../assets/logo.svg";
import Home from "../assets/home-solid.svg";
import Team from "../assets/social.svg";
import ProfileUserIcon from "../assets/settings.svg";
import BoxIcon from "../assets/Box.svg";
import OrderIcon from "../assets/order.svg";

import PowerOff from "../assets/power-off-solid.svg";
import styled from "styled-components";
import {Link, NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import firebase from "firebase/app";
const Container = styled.div`
  position: fixed;

  z-index: 2; !important;
  
  .active {
    //border-right: 4px solid var(--white);
    border-right: 4px solid var(--dark);

    img {
      //filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
      //  brightness(103%) contrast(103%);
      filter: invert(15%) sepia(75%) saturate(634%) hue-rotate(176deg) brightness(91%) contrast(90%);

    }
  }
`;

const Button = styled.button`
  //background-color: var(--black);
  background-color: var(--white);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    //background-color: var(--white);
    background-color: var(--dark);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  //background-color: var(--black);
  background-color: var(--white);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const Logo = styled.div`
  width: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  //color: var(--white);
  color: var(--dark); !important;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: var(--black);
  background-color: var(--white);

  padding: 2rem 0;

  position: absolute;
  top: 6rem;
  left: 0;

  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  //color: var(--white);
  color: var(--dark);
  
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    //border-right: 4px solid var(--white);
    border-right: 4px solid var(--dark);

    img {
      //filter: invert(10%) sepia(0%) saturate(0%) hue-rotate(93deg)
      //  brightness(103%) contrast(103%);
      filter: invert(15%) sepia(75%) saturate(634%) hue-rotate(176deg) brightness(91%) contrast(90%);
      
      
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(75%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(85%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;
  //border: 2px solid var(--seddlegray);
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "12.5rem" : "0")};

  //background-color: var(--black);
  background-color: var(--white);
  //color: var(--white);
  color: var(--dark);

  transition: all 0.5s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      //border: 2px solid var(--grey);
      border: 2px solid var(--seddlegray);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  width: 1080px;
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--seddlegray);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 60%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const auth = useAuth();
  const history = useHistory()

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);

  return (
          <Container>
            <Button clicked={click} onClick={() => handleClick()}>

            </Button>
            <SidebarContainer>
              <Logo>
                <img src={logo} alt="logo" onClick={()=> {
                  history.push('/');
                }} />

              </Logo>
              <SlickBar clicked={click}>
                <Item
                  onClick={() => setClick(false)}
                  exact
                  activeClassName="active"
                  to="/"
                >
                  <img src={Home} alt="Home" />
                  <Text clicked={click}>Home</Text>
                </Item>
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/team"
                >
                  <img src={Team} alt="Team" />
                  <Text clicked={click}>Team</Text>
                </Item>

                <Item
                    onClick={() => setClick(false)}
                    activeClassName="active"
                    to="/orders"
                >
                  <img src={OrderIcon} alt="Orders" />
                  <Text clicked={click}>Orders</Text>
                </Item>

                <Item
                    onClick={() => setClick(false)}
                    activeClassName="active"
                    to="/products"
                >
                  <img src={BoxIcon} alt="Products" />
                  <Text clicked={click}>Products</Text>
                </Item>




                <Item
                    onClick={() => setClick(false)}
                    activeClassName="active"
                    to="/profile"
                >
                  <img src={ProfileUserIcon} alt="Profile" />
                  <Text clicked={click}>Profile</Text>
                </Item>
                {/*<Item*/}
                {/*  onClick={() => setClick(false)}*/}
                {/*  activeClassName="active"*/}
                {/*  to="/calender"*/}
                {/*>*/}
                {/*  <img src={Calender} alt="Calender" />*/}
                {/*  <Text clicked={click}>Calender</Text>*/}
                {/*</Item>*/}
                {/*<Item*/}
                {/*  onClick={() => setClick(false)}*/}
                {/*  activeClassName="active"*/}
                {/*  to="/documents"*/}
                {/*>*/}
                {/*  <img src={Documents} alt="Documents" />*/}
                {/*  <Text clicked={click}>Documents</Text>*/}
                {/*</Item>*/}
                {/*<Item*/}
                {/*  onClick={() => setClick(false)}*/}
                {/*  activeClassName="active"*/}
                {/*  to="/projects"*/}
                {/*>*/}
                {/*  <img src={Projects} alt="Projects" />*/}
                {/*  <Text clicked={click}>Projects</Text>*/}
                {/*</Item>*/}
              </SlickBar>

              <Profile clicked={profileClick}>
                <img
                  onClick={() => handleProfileClick()}
                  src={firebase.auth().currentUser?.photoURL}
                  alt="Profile"
                />
                <Details clicked={profileClick}>
                  <Name>
                    <h4><pre>{auth.user.displayName}</pre></h4>
                    <Link to="/profile">view&nbsp;profile</Link>
                  </Name>

                  <Logout>
                    <img src={PowerOff} alt="logout" onClick={() => auth.logout()} />
                  </Logout>
                </Details>
              </Profile>
            </SidebarContainer>
          </Container>
  );
};

export default Sidebar;
