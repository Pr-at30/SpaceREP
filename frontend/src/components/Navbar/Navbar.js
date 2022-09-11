import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link , useNavigate } from "react-router-dom";
import { FaTemperatureLow, FaUserCircle } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { useSelector ,  useDispatch } from "react-redux";

import { logout , reset   } from "../../features/auth/authSlice";

import * as  actionType from '../../constants/actionTypes'




const Navbar = () => {

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()



  const [users, setUsers] = useState(user);
  const dispatch = useDispatch()
  function logOut() {
    dispatch(logout());
    dispatch(reset())
    navigate('/')
    
  }

  return (
    <div className={styles.navbar}>
      <Link
        style={{ textDecoration: "none", color: "var(--text-primary)" }}
        to="/"
      >
        <h1>SpaceREP</h1>
      </Link>
      <ul className={styles.others}>
        <li>How To</li>
        <li>About Us</li>
        {user && (
          <Link to="/study" style={{ color: "inherit" }}>

            <li>Study</li>
          </Link>
 
        )}
      </ul>
      {user ? (
        <MDBDropdown
          options={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-10, 10],
                },
              },
            ],
          }}
        >
          <MDBDropdownToggle
            style={{
              backgroundColor: "var(--accent)",
              boxShadow: "none",
            }}
          >
            <FaUserCircle style={{ fontSize: "1.5rem", marginRight: "10px" }} />
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{minWidth: "70px"}} dark>
            <MDBDropdownItem link>
              Account
            </MDBDropdownItem>
            <MDBDropdownItem link>
              How To
              <BsQuestionCircleFill
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "10px",
                  color: "#eee",
                }}
              />
            </MDBDropdownItem>
            <MDBDropdownItem onClick={logOut} link>
              Logout{" "}
              <BiExit
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "10px",
                  color: "#eee",
                }}
              />
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      ) : (
        <ul className={styles.auth}>
          <li>
            <Link
              style={{ textDecoration: "none", color: "var(--text-primary)" }}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button>Create an Account?</button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
