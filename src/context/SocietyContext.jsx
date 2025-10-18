import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/Token";
import axios from "axios";

const SocietyContext = createContext();

export const SocietyProvider = ({ children }) => {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(false);

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

        const pendingSocieties = pendingRes.data.societies || [];
        const approvedSocieties = approvedRes.data.societies || [];

        // Merge and normalize API data
        const apiSocieties = [...pendingSocieties, ...approvedSocieties];
        
        // Transform API response to match component expectations
        const normalizedSocieties = apiSocieties.map(society => ({
          id: society._id,
          _id: society._id,
          username: society.username,
          name: society.buildingName || society.username,
          location: society.location?.default || society.address || "Not provided",
          address: society.address,
          email: society.email,
          residentsCount: society.residentsCount,
          profilePicture: society.profilePicture,
          totalJobsPosted: society.jobs?.length || 0,
          activeJobs: society.jobs?.filter(job => job.status === 'active').length || 0,
          status: society.isApproved ? "Active" : "Pending",
          isApproved: society.isApproved,
          createdAt: society.createdAt,
          updatedAt: society.updatedAt
        }));

        setSocieties(normalizedSocieties);
       
      } catch (error) {
        console.error("Error fetching societies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocieties();
  }, []);

  const handleApprove = async (societyId) => {
    const token = getToken();

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve-society/${societyId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Approve success:", res.data);

      setSocieties((prev) =>
        prev.map((society) =>
          society._id === societyId || society.id === societyId
            ? { ...society, status: "Active", isApproved: true }
            : society
        )
      );
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

  const handleReject = async (societyId) => {
    const token = getToken();

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/reject-society/${societyId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Reject success:", res.data);

      setSocieties((prev) =>
        prev.map((society) =>
          society._id === societyId || society.id === societyId
            ? { ...society, status: "Rejected", isApproved: false }
            : society
        )
      );
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  const handleBan = async (societyId) => {
    const token = getToken();

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/ban-society/${societyId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Ban success:", res.data);

      setSocieties((prev) =>
        prev.map((society) =>
          society._id === societyId || society.id === societyId
            ? { ...society, status: "Banned" }
            : society
        )
      );
    } catch (error) {
      console.error("Ban failed:", error);
    }
  };

  const handleDeleteSociety = async (societyId) => {
    if (!window.confirm("Are you sure you want to delete this society?")) {
      return;
    }

    const token = getToken();

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/society/${societyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Delete success:", res.data);

      setSocieties((prev) => 
        prev.filter((society) => society._id !== societyId && society.id !== societyId)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <SocietyContext.Provider
      value={{
        societies,
        setSocieties,
        loading,
        handleApprove,
        handleReject,
        handleBan,
        handleDeleteSociety,
      }}
    >
      {children}
    </SocietyContext.Provider>
  );
};

export const useSocietyContext = () => useContext(SocietyContext);