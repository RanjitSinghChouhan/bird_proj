import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";

export const getAllCompaniesByrdsPoints = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.getAllCompaniesByrdsPoints,
        data
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getNotifications = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getNotifications,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getNotificationFlag = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getNotificationFlag,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const createSupportComplaint = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.createSupportComplaint,
        data
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getSupportComplaint = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getSupportComplaint,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const updateSupportComplaint = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.updateSupportComplaint,
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