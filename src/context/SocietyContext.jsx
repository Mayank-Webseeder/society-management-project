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
        const [pendingRes, approvedRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-societies`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/approved-societies`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        const pendingSocieties = pendingRes.data?.societies || [];
        const approvedSocieties = approvedRes.data?.societies || [];
        const apiSocieties = [...pendingSocieties, ...approvedSocieties];

        // Step 2️⃣ — Fetch Job Details for each society
        const societiesWithJobs = await Promise.all(
          apiSocieties.map(async (society) => {
            const id = society._id?._id || society._id || society.id;

            if (!id) return { ...society, jobDetails: [], totalJobs: 0 };
            try {
              const jobRes = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/society-directory/${id}/all-jobs`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              return {
                ...society,
                jobDetails: jobRes.data?.jobs || [],
                totalJobs: jobRes.data?.totalJobs || 0,
              };
            } catch (err) {
              console.error(`Error fetching jobs for society ${society}:`, err);
              return { ...society, jobDetails: [], totalJobs: 0 };
            }
          })
        );

        const normalizedSocieties = societiesWithJobs.map((society) => ({
          id: society._id,
          _id: society._id,
          username: society.username,
          name: society.buildingName,
          location: society.location?.default || society.address || "Not provided",
          address: society.address,
          email: society.email,
          residentsCount: society.residentsCount || 0,
          profilePicture: society.profilePicture || "",
          totalJobsPosted: society.totalJobs || 0,
          activeJobs:
            society.jobDetails?.filter((job) => job.status === "Active").length || 0,
          jobDetails: society.jobDetails || [],
          status: society.isApproved ? "Active" : "Pending",
          isApproved: society.isApproved,
          createdAt: society.createdAt,
          updatedAt: society.updatedAt,
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
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve-society/${societyId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/reject-society/${societyId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/ban-society/${societyId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
    if (!window.confirm("Are you sure you want to delete this society?")) return;

    const token = getToken();

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/society/${societyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
