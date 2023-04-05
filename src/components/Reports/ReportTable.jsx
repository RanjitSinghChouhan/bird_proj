import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function ReportTable({ search, reports, sendReport }) {
  const [filteredReports, setFilteredReports] = useState(reports);

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    let data = reports.filter(
      (item) =>
        item.apiName?.toLowerCase().includes(search.toLowerCase()) ||
        item.companyName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReports(data);
  }, [debounced, reports, search]);

  return (
    <table
      className="w-full"
      style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}
    >
      <thead>
        <tr className="text-left font-normal text-[#AEAEAE] text-lg">
          <td>SL No.</td>
          <td>Echo Eco</td>
          <td>Company Name</td>
          <td>Company email</td>
          <td>Year</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {filteredReports?.length ? (
          <>
            {filteredReports.map((item, i) => (
              <tr key={item.id}>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {i + 1}
                </td>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {item.apiName}
                </td>
                <td className="py-1 font-normal text-lg text-[#000000] cursor-pointer hover:text-[#6DB935]">
                  <a
                    href={`https://byrds-frontend.azurewebsites.net/company/${item.companyName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.companyName}
                  </a>
                </td>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {item.companyAdminEmail}
                </td>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {item.createdYear}
                </td>
                <td>
                  <button
                    className="py-1 px-6 text-white rounded-lg bg-green-gradient cursor-pointer"
                    onClick={() => sendReport(item.id)}
                  >
                    Sent
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            <tr className="text-4xl font-medium text-gray-400 absolute w-full text-center top-28 flex items-center justify-center">
              <td className="w-full">No Reports Requested</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

export default ReportTable;
