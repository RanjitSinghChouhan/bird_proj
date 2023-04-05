import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { USER } from "../types/types";

export const userInfoData = (data) => {
  return {
    type: USER,
    payload: data,
  };
};


export const getIndustrySector = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.auth.getIndustrySector,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userRegistration = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.adminPortal.signup,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.adminPortal.login,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userInfo = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.auth.getAdminDetails,
    })
      .then((response) => {
        dispatch(userInfoData(response.data.data[0]));
        resolve(response);
      })
      .catch((error) => {
        console.log(error)
        if (error?.response?.data?.message == "Unauthorized") {
          localStorage.setItem('byrdstoken', '')
          window.location.pathname = '/login'
        }
        reject(error);
      });
  });
};

export const sendOtp = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.adminPortal.sendOtp,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyEmail = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.adminPortal.verifyEmail,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPassword = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.adminPortal.resetPassword,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
