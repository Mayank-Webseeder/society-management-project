import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/Token";
import axios from "axios";

const SocietyContext = createContext();

export const SocietyProvider = ({ children }) => {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockSocieties = [
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
  ];

  useEffect(() => {
    const fetchSocieties = async () => {
      setLoading(true);
      const token = getToken();

      try {
        // API calls
        const [pendingRes, approvedRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-societies`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/approved-societies`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        // console.log("Pending Res", pendingRes.data.societies);
        const pendingSocieties = pendingRes.data.societies || [];

        // console.log("Approve res", approvedRes.data.societies);
        const approvedSocieties = approvedRes.data.societies || [];

        // Merge all API societies
        const apiSocieties = [...pendingSocieties, ...approvedSocieties];

        // Merge mock data for now
        const mergedSocieties = [
          ...apiSocieties,
          ...mockSocieties.filter(
            (mock) => !apiSocieties.some((api) => api.id === mock.id)
          ),
        ];

        setSocieties(mergedSocieties);
      } catch (error) {
        console.error("Error fetching societies:", error);

        setSocieties(mockSocieties);
      } finally {
        setLoading(false);
      }
    };

    fetchSocieties();
  }, []);

  const handleApprove = async (vendorId) => {
    const token = getToken();

    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/approve-vendor/${vendorId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("Approve click", res.data);

      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, status: "Active" } : vendor
        )
      );
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

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
        loading,
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
