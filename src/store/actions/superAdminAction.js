import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { AREA, SITES } from "../types/types";

export const sitesInfo = (data) => {
  return {
    type: SITES,
    payload: data,
  };
};

export const totalUsedArea = data => {
  return {
    type: AREA,
    payload: data
  }
}

export const addSite = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.superAdmin.addSite,
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

export const getSites = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.superAdmin.getSites,
      params: {
        offset: data.offset
      }
    })
      .then((response) => {
        dispatch(sitesInfo(response.data.data));
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateSite = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.superAdmin.updateSite,
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


export const getUsedArea = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.area.getUsedArea,
    })
      .then((response) => {
        dispatch(totalUsedArea(response.data?.data || 0))
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
