import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import img from "../../util/team-building-importance-in-business-success.svg";
import {
  MDBBtn,
  MDBIcon,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import {useSelector , useDispatch } from "react-redux";
// import { signin } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

import { login , reset } from "../../features/auth/authSlice";




const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const {user , isLoading , isError , isSuccess , message } = useSelector((state)=>state.auth)

  const INITIAL_STATE = {
    email: "",
    password: "",
  };
  const [ formValue, setFormValue ] = useState(INITIAL_STATE);
  // const { email, password } = formValue;

  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')

    }

    dispatch(reset())





  } , [user , isError , isSuccess , message , navigate , dispatch])



  const handelSubmit=(event)=>{
    event.preventDefault();


    console.log(formValue)

    dispatch(login(formValue))
  }




  const handelChange=(event)=>{
    
    const {name , value }= event.target ; 
    

    setFormValue((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

  }



  return (
    <div className={styles.login}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h3>Welcome !</h3>
          <div className={styles.signin}>
            <h4>Sign in to</h4>
            <h6>Lorem ipsum dolor sit amet.</h6>
          </div>
          <MDBValidation className="row g-4">
            <MDBValidationItem
              feedback="Please provide Email."
              invalid
              className="col-md-12"
            >
              <MDBInput
                value={formValue.email}
                name="email"
                type="email"
                required
                id="validationCustom02"
                label="Email"
                onChange={handelChange}
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                value={formValue.password}
                name="password"
                id="validationCustom01"
                type="password"
                required
                label="Password"
                onChange={handelChange}
              />
            </MDBValidationItem>
            <MDBBtn

            onClick={handelSubmit}

              style={{
                width: "90%",
                fontFamily: "inherit",
                backgroundColor: "var(--highlight)",
              }}
              className="mt-4 m-auto"
            >
              {/* <MDBSpinner size="sm" role="status" tag="span" className="me-2" /> */}
              Login
            </MDBBtn>
          </MDBValidation>
          <Link to="/register" style={{ color: "inherit" }}>
            <p className={styles.cardFooter}>
              Don't have an Account? <strong>Register</strong>
            </p>
          </Link>
        </div>
      </div>
      <div className={styles.imgHolder}>
        <img src={img} alt="group" />
      </div>
    </div>
  );
};

export default Login;
