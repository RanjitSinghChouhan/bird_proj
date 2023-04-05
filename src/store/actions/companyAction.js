import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { COMPANY } from "../types/types";

export const companyInfoData = (data) => {
    return {
        type: COMPANY,
        payload: data,
    };
};

export const companyList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosClient({
            method: "GET",
            url: PATH.adminPortal.getCompanies,
        })
            .then((response) => {
                dispatch(companyInfoData(response.data.data));
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const companyInfo = (companyName, siteName) => (dispatch) => {

    return new Promise((resolve, reject) => {
        axiosClient({
            method: "GET",
            url: PATH.adminPortal.getCompanyDetail,
            params: {
                companyName: companyName,
                siteName: siteName
            }
        })
            .then((response) => {
                dispatch(companyInfoData(response.data.data));
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const companyPlantations = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        axiosClient({
            method: "POST",
            url: PATH.adminPortal.getEchoEcosByCompanyId,
            data: {
                companyId: data.companyId,
                offset: data.offset
            }
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updatePlantation = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        axiosClient({
            method: "POST",
            url: PATH.adminPortal.updatePlantation,
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
