import React, { useEffect, useState  } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../util/team-building-importance-in-business-success.svg";
import {
  MDBBtn,
  MDBIcon,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBFile,
  MDBSpinner,
} from "mdb-react-ui-kit";


import {useSelector , useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { login, register , reset } from "../../features/auth/authSlice";

const Register = () => {


  const {user , isLoading , isError , isSuccess , message }= useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const INITIAL_STATE = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  };

  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSame, setIsSame] = useState(false);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    


    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });

  }
  const uploadFile = (event) => {
    setFormValue({
      ...formValue,
      profilePic: event.target.files[0],
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
   
  }
  useEffect(() => {
    // console.log(formErrors);
   


    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new FormData();
      formData.append('profilePic', formValue.profilePic, formValue.profilePic.name);
      formData.append('email', formValue.email)
      formData.append('name', formValue.username)
      formData.append('password', formValue.password)
      dispatch(register(formData));
      navigate('/')
    }
  }, [formErrors, formValue, isSubmit, dispatch, navigate]);
  
  const validate = (values) => {
    const errors = {};
    if(!values.email){
      errors.email = "Email must be there";
    }
    if(!values.username){
      errors.username = "Username must be there";
    }
    if(!values.password){
      errors.password = "Password must be there";
    }
    
    if(values.password !== values.confirmPassword){
      errors.confirmPassword = "Password and confirmPassword should match";
    }
    return errors;
  };


  return (
    <div className={styles.register}>
      <div className={styles.imgHolder}>
        <img src={img} alt="group" />
      </div>
      <div className={styles.formContainer}>

        <div className={styles.form}>
          <h3>Welcome !</h3>
          <div className={styles.signin}>
            <h4>Create an Account</h4>
            <h6>Lorem ipsum dolor sit amet.</h6>
          </div>

          <MDBValidation className="row g-4" onSubmit={handleSubmit}>

              <MDBInput
                value={formValue?.email}
                name="email"
                type="email"
                required
                id="validationCustom02"
                label="Email"
                onChange={handleChange}
              />
              <p>{formErrors.email}</p>

            
              <MDBInput
                value={formValue?.username}
                name="username"
                type="text"
                required
                id="validationCustom02"
                label="Username"
                onChange={handleChange}
              />
              <p>{formErrors.username}</p>


              <MDBInput
                value={formValue?.password}
                name="password"
                id="validationCustom01"
                type="password"
                required
                label="Password"
                onChange={handleChange}
              />
              <p>{formErrors.password}</p>

              <MDBInput
                value={formValue?.confirmPassword}
                name="confirmPassword"
                id="validationCustom01"
                type="password"
                required
                label="Confirm your Password"
                onChange={handleChange}
              />
            <p>{formErrors.confirmPassword}</p>

            <MDBValidationItem
              feedback="Please provide Avatar."
              invalid
              className="col-md-12"
            >
              <MDBFile
                label='Default file input example'
                name= "profilePic"
                id='customFile'
               
                onChange={uploadFile}
              />
            </MDBValidationItem>

            <MDBBtn
              style={{
                width: "90%",
                fontFamily: "inherit",
                backgroundColor: "var(--highlight)",
              }}
              className="mt-4 m-auto"
              type="submit"
            >
              {/* <MDBSpinner size="sm" role="status" tag="span" className="me-2" /> */}
              Create
            </MDBBtn>
          </MDBValidation>
          <Link to="/login" style={{ color: "inherit" }}>
            <p className={styles.cardFooter}>
              Already have an Account? <strong>Login</strong>
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Register;
