import React, { useEffect, useState } from "react";
import "./register.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
import FIcon from "../../Images/Group 23.svg";
import AIcon from "../../Images/Group 24.svg";
import backArrow from "../../Images/left-arrow.png";
import PhoneInput from "react-phone-number-input";
import AfterRegisterPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { Link, useNavigate } from "react-router-dom";
import { getUser, postUser } from "../../Service/user";
import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (event, type) => {
    if (type !== "country" && type !== "state" && type !== "phoneNumber") {
      const { name, value } = event.target;
      setInputValues({ ...inputValues, [name]: value });
    } else if (type === "country") {
      setInputValues({ ...inputValues, country: event });
    } else if (type === "state") {
      setInputValues({ ...inputValues, state: event });
    } else if (type === "phoneNumber") {
      setInputValues({ ...inputValues, phoneNumber: event });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!isValidMobileNumber(inputValues.phoneNumber)) {
      setShowErrorPopup(true);
      setTimeout(()=>{
        setShowErrorPopup(false);
      },2000)
   
      return;
    }
    localStorage.setItem("user_data", JSON.stringify(inputValues));
    try {
      const response = await postUser(inputValues);
      console.log("User data posted successfully:", response);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  const handleClosePopup = () => {
    setIsSubmitted(true);
    navigate("/login");
  };
  const handleBack = () => {
    navigate("/");
  };

  const navigate = useNavigate();
  const isValidMobileNumber = (phoneNumber) => {
    // Remove any non-digit characters from the input
    const cleanedNumber = phoneNumber.replace(/\D/g, "");

    // Check if the cleaned number starts with the country code for India (+91) and has 10 digits
    return /^91\d{10}$/.test(cleanedNumber);
  };
  return (
    <>
      <div className="row d-flex register_container">
        <div className="col-lg-6 col-md-12 register_heading">
          <img
            className="backArrow"
            src={backArrow}
            alt="arrow_back"
            onClick={handleBack}
          />
          <h3>
            Start your journey <br />
            with us.
          </h3>
          <img src={RegisterIcon} alt="image" />
        </div>
        <div className="col-lg-6 col-md-12 register_heading_right">
          <img
            className="backArrow_mobile"
            src={backArrow}
            alt="arrow_back"
            onClick={handleBack}
          />
          <span className="welcome mt-4">Welcome </span>
          <h1>Create new account</h1>
          <h3 className="already_have_account">
            Already have an account? &nbsp;
            <Link to={"/login"} style={{ color: "red" }}>
              Log In
            </Link>
          </h3>

          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-12 first_name">
                <label for="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  className="form-control"
                  required
                  placeholder="First Name"
                  value={inputValues.firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                />
              </div>
              <div className="col-lg-6 col-md-12 first_name">
                <label for="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  value={inputValues.lastName}
                  className="form-control"
                  required
                  placeholder="Last Name"
                  onChange={(e) => handleInputChange(e, "lastName")}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 input-container">
                <label htmlFor="mobile">Mobile Number</label>
                <PhoneInput
                  placeholder="Mobile Number"
                  className="form-control plato_form_control"
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                  initialValueFormat="national"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e, "phoneNumber")}
                  value={inputValues.phoneNumber}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={inputValues.email}
                  required
                  placeholder="Email"
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={inputValues.password}
                  className="form-control"
                  required
                  placeholder="Password"
                  onChange={(e) => handleInputChange(e, "password")}
                />
              </div>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="form-check-input"
                required
              />
              <label for="terms" className="form-check-label">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="submit_btn">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
            <h3 className="already_have_account_mobile">
              Already have an account? &nbsp;
              <Link to={"/login"} style={{ color: "red" }}>
                Log In
              </Link>
            </h3>
          </form>

          <div className="line-container">
            <hr className="line" />
            <span className="text">Or continue with</span>
            <hr className="line" />
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center login_icons">
              <img src={GIcon} alt="image" />
              <img src={FIcon} alt="image" />
              <img src={AIcon} alt="image" />
            </div>
          </div>
        </div>
        {isSubmitted && <AfterRegisterPopUp onClose={handleClosePopup} register={true} />}

        {showErrorPopup && (
          <ErrorPopUp
            message={
              "Invalid mobile number. Please enter a valid mobile number."
            }
            onClose={() => setShowErrorPopup(false)} // Add a handler to close the error popup
          />
        )}
      </div>
    </>
  );
};

export default Register;
