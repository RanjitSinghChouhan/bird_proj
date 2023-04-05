import axiosClient from "./httpClient"
import { PATH } from "./httpContants"

export const getReports = async (data) => {
    try {
        let res = await axiosClient({
            method: "GET",
            url: PATH.adminPortal.getRequestedReports,
            params: {
                companyName: data?.companyName || '',
                offset: data?.offset || 0
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const updateRequestedReports = async (data) => {
    try {
        let res = await axiosClient({
            method: "POST",
            url: PATH.adminPortal.updateRequestedReports,
            data: data
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const getAnnouncements = async ({ admin }) => {
    try {
        let res = await axiosClient({
            method: "GET",
            url: PATH.announcements.getAnnouncements,
            params: {
                admin: admin
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const updateAnnouncement = async (data) => {
    try {
        let res = await axiosClient({
            method: "POST",
            url: PATH.announcements.updateAnnouncement,
            data: data
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const addAnnouncement = async (data) => {
    try {
        let res = await axiosClient({
            method: "POST",
            url: PATH.announcements.addAnnouncement,
            data: data
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const checkSiteName = async (search) => {
    try {
        let res = await axiosClient({
            method: "GET",
            url: PATH.superAdmin.isSiteExist,
            params: {
                search: search || ''
            }
        })
        return res.data.status
    } catch (error) {
        return true
    }
}
export const checkEmail = async (search) => {
    try {
        let res = await axiosClient({
            method: "GET",
            url: PATH.superAdmin.isEmailExist,
            params: {
                search: search || ''
            }
        })
        return res.data.status
    } catch (error) {
        return true
    }
}
