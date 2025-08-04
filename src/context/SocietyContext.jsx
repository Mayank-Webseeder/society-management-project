// src/context/SocietyContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const SocietyContext = createContext();

export const SocietyProvider = ({ children }) => {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    // Mock data fetch simulation
    const fetchSociety = async () => {
      setSocieties([
        {
          id: 1,
          name: "Dolphine plaza",
          location: "Vijay Nagar",
          status: "Active",
          totalJobsPosted: 25,
          activeJobs: 5,
        },
        {
          id: 2,
          name: "Sunshine Apartments",
          location: "Bengali Square",
          status: "Pending",
          totalJobsPosted: 10,
          activeJobs: 0,
        },
        {
          id: 3,
          name: "PQR Heights",
          location: "Bhawarkuan",
          status: "Rejected",
          totalJobsPosted: 15,
          activeJobs: 0,
        },
        {
          id: 4,
          name: "Green Valley Society",
          location: "MR 10",
          status: "Active",
          totalJobsPosted: 18,
          activeJobs: 3,
        },
        {
          id: 5,
          name: "Maple Residency",
          location: "Scheme No. 78",
          status: "Active",
          totalJobsPosted: 30,
          activeJobs: 7,
        },
        {
          id: 6,
          name: "Ocean View Apartments",
          location: "Rajendra Nagar",
          status: "Pending",
          totalJobsPosted: 12,
          activeJobs: 0,
        },
        {
          id: 7,
          name: "ABC Apartments",
          location: "Palasia",
          status: "Active",
          totalJobsPosted: 26,
          activeJobs: 11,
        },
      ]);
    };

    fetchSociety();
  }, []);

  const handleApprove = (id) =>
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Active" } : soc))
    );

  const handleReject = (id) =>
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Rejected" } : soc))
    );

  const handlePending = (id) =>
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Pending" } : soc))
    );

  const handleBan = (id) =>
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Banned" } : soc))
    );

  const handleDeleteSociety = (id) => {
    if (window.confirm("Are you sure you want to delete this society?")) {
      setSocieties((prev) => prev.filter((soc) => soc.id !== id));
    }
  };


  return (
    <SocietyContext.Provider
      value={{
        societies,
        setSocieties,
        handleApprove,
        handleReject,
        handlePending,
        handleBan,
        handleDeleteSociety,
   
      }}
    >
      {children}
    </SocietyContext.Provider>
  );
};

export const useSocietyContext = () => useContext(SocietyContext);
