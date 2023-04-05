import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import bird from "../../../../assets/Subtract.svg";
import closeEye from "../../../../assets/closeEye.svg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import circularTooltip from "../../../../assets/circularTooltip.svg";
import { useSearchParams } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader/Loader";
import { resetPassword } from "../../../../store/actions/authAction";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

const initialValues = {
  adminPassword: "",
  Confirm_adminPassword: "",
};

const validate = (values) => {
  let error = {};
  if (!values.adminPassword) {
    error.adminPassword = "Required";
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.adminPassword
    )
  ) {
    error.adminPassword = "Incorrect Password Format";
  } else if (
    values.adminPassword.length <= 7 ||
    values.adminPassword.length > 16
  ) {
    error.adminPassword = "Password should between 8 to 16 character";
  }
  if (!values.Confirm_adminPassword) {
    error.companyAdminPassword_confirmation = "Required";
  } else if (
    !/^.*(?=.{10,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.Confirm_adminPassword
    )
  ) {
    error.Confirm_adminPassword = "Incorrect Password Format";
  } else if (
    values.Confirm_adminPassword !== values.adminPassword
  ) {
    error.Confirm_adminPassword = "Passwords does not match";
  }
  return error;
};

function ResetPassword() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [confmPasswordType, setConfmPasswordType] = useState("password");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const adminEmail = searchParams.get("adminEmail");
  const authKey = searchParams.get("authKey");
  const isLoading = useRef(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      isLoading.current = true;
      values.adminPassword = simpleCrypto.encrypt(
        values.adminPassword
      );
      dispatch(
        resetPassword({
          password: values.adminPassword,
          adminEmail: adminEmail,
          authKey: authKey,
        })
      )
        .then((response) => {
          setSubmitting(false);
          isLoading.current = false;
          navigate("/resetSuccessful");
        })
        .catch((error) => {
          setSubmitting(false);
          isLoading.current = false;
        });
    },
    validate,
  });

  const handleShowPassword = (info) => {
    info === 1
      ? passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password")
      : confmPasswordType === "password"
      ? setConfmPasswordType("text")
      : setConfmPasswordType("password");
  };
  return (
    <div>
      {isLoading.current ? <Loader /> : ""}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Reset Password
          </div>
          <div className="font-normal text-[#000000] text-2xl mb-20">
            Your new password must be different from <br /> previous used
            password
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex justify-end mb-1 ">
                <img
                  id="tip"
                  src={circularTooltip}
                  alt="tooltip"
                  className=" cursor-pointer bg-white pl-2"
                />
              </div>
              <ReactTooltip
                anchorId="tip"
                place="top"
                content="Password must contain one Capital letter, one Small letter, one Special Character, one Integer and length must be between 8 to 16 character"
                variant="white"
                className="shadow-xl rounded-xl bg-white"
              />
              <div className="mb-7 flex relative">
                {formik.touched.adminPassword &&
                formik.errors.adminPassword ? (
                  <div
                    className="text-left absolute bottom-10"
                    style={{ color: "red" }}
                  >
                    {formik.errors.adminPassword}
                  </div>
                ) : null}
                <input
                  type={passwordType}
                  name="adminPassword"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("adminPassword")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm "
                />
                <img
                  onClick={() => handleShowPassword(1)}
                  src={closeEye}
                  alt="closeEye"
                  className="absolute cursor-pointer right-4 top-2 bg-white pl-2"
                />
              </div>
              <div className="relative">
                {formik.touched.Confirm_adminPassword &&
                formik.errors.Confirm_adminPassword ? (
                  <div
                    className="text-left absolute bottom-10"
                    style={{ color: "red" }}
                  >
                    {formik.errors.Confirm_adminPassword}
                  </div>
                ) : null}
                <input
                  type={confmPasswordType}
                  name="Confirm_adminPassword"
                  placeholder="Re-enter Password"
                  {...formik.getFieldProps("Confirm_adminPassword")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm"
                />
                <img
                  onClick={() => handleShowPassword(2)}
                  src={closeEye}
                  alt="closeEye"
                  className="absolute cursor-pointer right-4 top-2 bg-white pl-2"
                />
              </div>
              <div className="text-left font-normal text-[#333333] text-lg mt-2">
                Both the passwords must match.
              </div>
              <div className="mt-16">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-bold text-[22px] text-white py-[14px] rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div
            onClick={() => navigate("/login")}
            className="hover:underline cursor-pointer font-medium text-[#FFC145] text-2xl mt-12"
          >
            Login Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
