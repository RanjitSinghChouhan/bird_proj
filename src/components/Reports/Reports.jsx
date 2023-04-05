import React, { useEffect, useState } from 'react'
import UserElement from '../NavBar/UserElement'
import Loader from '../Loader/Loader'
import ReportTable from './ReportTable';
import { getReports, updateRequestedReports } from '../../utils/service';

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchReports = async () => {
        let res = await getReports();
        if (res.status && res.data)
            setReports(res.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchReports();
    }, [])

    const sendReport = async (id) => {
        let res = await updateRequestedReports({ id });
        if (res.status)
            fetchReports()
    }

    if (loading) return <Loader />
    return (
        <>
            <UserElement children={<h1 className='text-3xl text-black font-medium'>Reports</h1>} />

            <section className='p-6'>

                <div className='flex items-center gap-4 justify-between pr-6'>
                    <div className='flex items-center px-4 bg-gray-50 rounded-3xl border border-gray-100 focus-within:border-green-200 focus-within:shadow-md w-full max-w-xl'>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0771 12.0774C9.60712 14.5461 5.588 14.5467 3.11801 12.0774C0.648656 9.60738 0.648656 5.58826 3.11801 3.11827C5.588 0.649548 9.60712 0.649548 12.0771 3.11827C14.5465 5.58826 14.5465 9.60738 12.0771 12.0774ZM18.8145 17.9186L13.3976 12.5023C15.9234 9.51872 15.7847 5.03537 12.9727 2.22275C10.0087 -0.740601 5.1865 -0.741234 2.22252 2.22275C-0.740839 5.18674 -0.740839 10.0096 2.22252 12.9729C5.0193 15.7697 9.49442 15.9445 12.5021 13.3979L17.9183 18.8148C18.166 19.0618 18.5669 19.0618 18.8145 18.8148C19.0615 18.5671 19.0615 18.1662 18.8145 17.9186Z" fill="#393939" />
                        </svg>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-full flex-grow p-2 outline-none border-none bg-transparent placeholder-gray-400' placeholder='Search for company or api name' />
                    </div>

                    <div className=''>
                        {/* <div className='flex items-center gap-6'>
                            <div>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.33001 13.593H1.0293" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.1406 3.90066H16.4413" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.72629 3.84625C5.72629 2.5506 4.66813 1.5 3.36314 1.5C2.05816 1.5 1 2.5506 1 3.84625C1 5.14191 2.05816 6.19251 3.36314 6.19251C4.66813 6.19251 5.72629 5.14191 5.72629 3.84625Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0002 13.5533C17.0002 12.2576 15.9429 11.207 14.6379 11.207C13.3321 11.207 12.2739 12.2576 12.2739 13.5533C12.2739 14.8489 13.3321 15.8995 14.6379 15.8995C15.9429 15.8995 17.0002 14.8489 17.0002 13.5533Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.56517 1C1.70108 1 1 1.71286 1 2.5904V3.52644C1 4.17647 1.24719 4.80158 1.68936 5.27177L6.5351 10.4243L6.53723 10.4211C7.47271 11.3788 7.99905 12.6734 7.99905 14.0233V18.5952C7.99905 18.9007 8.31869 19.0957 8.58399 18.9516L11.3436 17.4479C11.7602 17.2204 12.0201 16.7784 12.0201 16.2984V14.0114C12.0201 12.6691 12.539 11.3799 13.466 10.4243L18.3117 5.27177C18.7528 4.80158 19 4.17647 19 3.52644V2.5904C19 1.71286 18.3 1 17.4359 1H2.56517Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className='mt-6 p-4 rounded-xl shadow-xl min-h-[400px] max-h-[75vh] overflow-y-auto relative'>
                    <ReportTable search={search} reports={reports} sendReport={sendReport} />
                </div>

            </section>
        </>
    )
}

export default Reports