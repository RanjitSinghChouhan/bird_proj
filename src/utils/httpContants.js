import { BASE_PATH, BASE_URL_PATH } from "./httpClient";

export const PATH = {

  adminPortal: {
    signup: `${BASE_PATH}/registerCompany`,
    login: `${BASE_PATH}/login`,
    getCompanies: `${BASE_PATH}/getCompanies`,
    getCompanyDetail: `${BASE_PATH}/getCompanyDetail`,
    getAdminReports: `${BASE_PATH}/getAdminReports`,
    getEchoEcosByCompanyId: `${BASE_PATH}/getEchoEcosByCompanyId`,
    updatePlantation: `${BASE_PATH}/updatePlantation`,
    getRequestedReports: `${BASE_PATH}/getRequestedReports`,
    updateRequestedReports: `${BASE_PATH}/updateRequestedReports`,
    sendOtp: `${BASE_PATH}/sendOtp`,
    verifyEmail: `${BASE_PATH}/forgotPassword/verifyEmail`,
    resetPassword: `${BASE_PATH}/forgotPassword/resetPassword`
  },
  auth: {
    getAdminDetails: `${BASE_PATH}/getAdminDetails`,
  },
  announcements: {
    addAnnouncement: `${BASE_PATH}/addAnnouncement`,
    updateAnnouncement: `${BASE_PATH}/updateAnnouncement`,
    getAnnouncements: `${BASE_PATH}/getAnnouncements`,
  },
  superAdmin: {
    addSite: `${BASE_PATH}/addSite`,
    getSites: `${BASE_PATH}/getSites`,
    updateSite: `${BASE_PATH}/updateSite`,
    isSiteExist: `${BASE_PATH}/isSiteExist`,
    isEmailExist: `${BASE_PATH}/isEmailExist`,
  },
  area: {
    getUsedArea: `${BASE_PATH}/getUsedArea`
  },
  leaderBoard: {
    getNotifications: `${BASE_URL_PATH}/getNotifications`,
    getNotificationFlag: `${BASE_URL_PATH}/getNotificationFlag`,
    createSupportComplaint: `${BASE_PATH}/createSupportComplaint`,
    getSupportComplaint: `${BASE_PATH}/getSupportComplaint`,
    updateSupportComplaint: `${BASE_PATH}/updateSupportComplaint`
  }
};
