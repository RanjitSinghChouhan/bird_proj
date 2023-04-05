import { useEffect, useState } from "react";
import axiosClient from "../utils/httpClient";
import { PATH } from "../utils/httpContants";

export default function useReports(companyName) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            let res = await axiosClient({
                method: "GET",
                url: PATH.adminPortal.getRequestedReports,
                params: {
                    companyName: companyName || ''
                }
            })
            if (res.status) {
                setReports(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchReports();
    }, [companyName]);

    return { loading, reports };
}