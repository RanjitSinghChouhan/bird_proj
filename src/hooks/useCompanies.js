import { useEffect, useState } from "react";
import axiosClient from "../utils/httpClient";
import { PATH } from "../utils/httpContants";

export default function useCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            let res = await axiosClient({
                method: "GET",
                url: PATH.adminPortal.getCompanies,
            })
            if (res.status) {
                setCompanies(res.data.data)
            }
            else{
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchReports();
    }, []);

    return { loading, companies };
}
