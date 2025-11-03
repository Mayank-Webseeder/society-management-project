import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("token");

  // ✅ Fetch all jobs
  const fetchAllJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setError("Authentication token missing");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/all-jobs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching all jobs:", err);
      setError(err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch a single job by ID
  const fetchJobById = async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setError("Authentication token missing");
        setLoading(false);
        return null;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (err) {
      console.error("Error fetching job by ID:", err);
      setError(err.message || "Failed to fetch job");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs(); // Auto-fetch all jobs on mount
  }, []);

  const totalJobs = jobs?.length || 0;

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        totalJobs,
        loading,
        error,
        fetchAllJobs,
        fetchJobById, // 👈 Exposed to use in components
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobProvider, JobContext };
