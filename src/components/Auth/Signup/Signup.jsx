import React, { useState, useEffect } from "react";
import bird from "../../../assets/Subtract.svg";
import pot from "../../../assets/signupPot.svg";
import openEye from "../../../assets/openEye.svg";
import crossEye from "../../../assets/crossEye.svg";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  getIndustrySector,
  userRegistration,
} from "../../../store/actions/authAction";
import { useNavigate } from "react-router";
import { useRef } from "react";
import Loader from "../../Loader/Loader";
import SimpleCrypto from "simple-crypto-js";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

const initialValues = {
  Name: "Threadality",
  Website: "https://unsplash.com",
  AdminName: "Ankit",
  AdminEmail: "xepijad675@wifame.com",
  AdminPassword: "User@123456",
  Confirm_AdminPassword: "User@123456",
  // industrySector: "1",
};

const validate = (values) => {
  let error = {};
  if (!values.Name) {
    error.Name = "Required";
  } else if (!/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.Name)) {
    error.Name = "Invalid Text Format";
  }
  if (!values.Website) {
    error.Website = "Required";
  } else if (
    !/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i.test(
      values.Website
    )
  ) {
    error.Website = "Invalid Text Format";
  }
  // if (!values.industrySector) {
  //   error.industrySector = "Required";
  // }
  if (!values.AdminName) {
    error.AdminName = "Required";
  } else if (
    !/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.AdminName)
  ) {
    error.AdminName = "Invalid Text Format";
  }
  if (!values.AdminEmail) {
    error.AdminEmail = "Required";
  } else if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+$/i.test(values.AdminEmail)) {
    error.AdminEmail = "Incorrect email address";
  }
  if (!values.AdminPassword) {
    error.AdminPassword = "Required";
  } else if (
    !/^.*(?=.{10,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.AdminPassword
    )
  ) {
    error.AdminPassword =
      "Password must contain one Capital letter, one Small letter, one Special Character, one Integer and length must be between 8 to 16 character";
  } else if (
    values.AdminPassword.length <= 7 ||
    values.AdminPassword.length > 16
  ) {
    error.AdminPassword = "Password should between 8 to 16 character";
  }
  if (!values.Confirm_AdminPassword) {
    error.AdminPassword_confirmation = "Required";
  } else if (
    values.Confirm_AdminPassword !== values.AdminPassword
  ) {
    error.Confirm_AdminPassword = "Passwords does not match";
  }
  return error;
};

function Signup() {
  const dispatch = useDispatch();
  const [getIndustrySectors, setGetIndustrySectors] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const isLoading = useRef(false);
  const [passwordType, setPasswordType] = useState("password");
  const [cnfmPasswordType, setCnfmPasswordType] = useState("password");

  useEffect(() => {
    dispatch(getIndustrySector()).then((response) => {
      setGetIndustrySectors(response.industrySector);
    });
  }, [dispatch]);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      // isLoading.current = true;
      values.Confirm_AdminPassword = simpleCrypto.encrypt(
        values.Confirm_AdminPassword
      );
      values.AdminPassword = simpleCrypto.encrypt(
        values.AdminPassword
      );
      values.AdminEmail = values.AdminEmail.toLowerCase();
      dispatch(userRegistration(values))
        .then((response) => {
          if (response.data.status === false) {
            setErrorMsg(response.data.message);
            setSubmitting(false);
            isLoading.current = false;
          } else {
            setSubmitting(false);
            isLoading.current = false;
            navigate("/");
          }
        })
        .catch((error) => {
          setSubmitting(false);
          isLoading.current = false;
          alert(error);
        });
    },
    validate,
  });

  const handleShowPassword = (info) => {
    info === 1
      ? passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password")
      : cnfmPasswordType === "password"
      ? setCnfmPasswordType("text")
      : setCnfmPasswordType("password");
  };

  return (
    <div className="flex min-h-screen relative">
      {isLoading.current ? <Loader /> : ""}
      <div className="w-2/4 pl-4 pt-2 flex items-center">
        <div>
          <div className="absolute top-2 left-1 cursor-pointer" onClick={() => navigate("/")}>
            <img src={bird} alt="" />
          </div>
          <div className="flex justify-center mb-16 mt-10">
            <img src={pot} alt="" />
          </div>
          <div className="font-bold text-4xl GreenGradient px-8 py-6">
            Build A Cleaner Future And Greener Earth
          </div>
        </div>
      </div>
      <div className="w-2/4 bg-[#6DB935] bg-opacity-60 text-white flex md:items-center">
        <div className="mx-32 my-36 md:w-full">
          <div className="font-medium text-3xl mb-9">
            Register Your Company With Byrds
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3.5">
              {formik.touched.Name && formik.errors.Name ? (
                <div style={{ color: "red" }}>{formik.errors.Name}</div>
              ) : null}
              <input
                type="text"
                placeholder="Company name"
                name="Name"
                {...formik.getFieldProps("Name")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5">
              {formik.touched.Website && formik.errors.Website ? (
                <div style={{ color: "red" }}>
                  {formik.errors.Website}
                </div>
              ) : null}
              <input
                type="text"
                placeholder="Enter Company Website"
                name="Website"
                {...formik.getFieldProps("Website")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            {/* <div className="mb-3.5">
              {formik.touched.industrySector && formik.errors.industrySector ? (
                <div style={{ color: "red" }}>
                  {formik.errors.industrySector}
                </div>
              ) : null}
              <select
                name="industrySector"
                {...formik.getFieldProps("industrySector")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              >
                <option value="" disabled selected>
                  Choose Industry Sector
                </option>
                <option value="1">
                  Choose Industry Sector
                </option>
                {getIndustrySectors &&
                  getIndustrySectors.map((data) => {
                    return (
                      <option
                        className="bg-[#6DB935] bg-opacity-0 text-gray-300 py-2 w-full border-0 border-b-2 focus:outline-none"
                        key={data.id}
                        value={data.id}
                      >
                        {data.sectorOfIndustry}
                      </option>
                    );
                  })}
              </select>
            </div> */}
            <div className="mb-3.5">
              {formik.touched.AdminName &&
                formik.errors.AdminName ? (
                <div style={{ color: "red" }}>
                  {formik.errors.AdminName}
                </div>
              ) : null}
              <input
                type="text"
                name="AdminName"
                placeholder="Enter Admin name"
                {...formik.getFieldProps("AdminName")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5">
              {formik.touched.AdminEmail &&
                formik.errors.AdminEmail ? (
                <div style={{ color: "red" }}>
                  {formik.errors.AdminEmail}
                </div>
              ) : null}
              <input
                type="email"
                name="AdminEmail"
                placeholder="Enter Admin Email"
                {...formik.getFieldProps("AdminEmail")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.AdminPassword &&
                formik.errors.AdminPassword ? (
                <div style={{ color: "red" }}>
                  {formik.errors.AdminPassword}
                </div>
              ) : null}
              <input
                type={passwordType}
                name="AdminPassword"
                placeholder="Enter Password"
                {...formik.getFieldProps("AdminPassword")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
              {passwordType === "password" ? <img
                  onClick={() => handleShowPassword(1)}
                  src={openEye}
                  alt="crossEye"
                  className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                /> : <img
                onClick={() => handleShowPassword(1)}
                src={crossEye}
                alt="crossEye"
                className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
              />}
            </div>
            <div className="relative">
              {formik.touched.Confirm_AdminPassword &&
                formik.errors.Confirm_AdminPassword ? (
                <div style={{ color: "red" }}>
                  {formik.errors.Confirm_AdminPassword}
                </div>
              ) : null}
              <input
                type={cnfmPasswordType}
                name="Confirm_AdminPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("Confirm_AdminPassword")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
              {cnfmPasswordType === "password" ? <img
                  onClick={() => handleShowPassword(2)}
                  src={openEye}
                  alt="crossEye"
                  className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                /> : <img
                onClick={() => handleShowPassword(2)}
                src={crossEye}
                alt="crossEye"
                className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
              />}
            </div>
            {errorMsg ? <div style={{ color: "red" }}>{errorMsg}</div> : null}
            <div className="mt-[60px]">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 rounded-lg"
              >
                Signup
              </button>
              <div className="ml-16 mt-2 text-normal">
                Already have an account?{" "}
                <a href="/login" className="border-0 border-b-2">
                  Login for free
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
