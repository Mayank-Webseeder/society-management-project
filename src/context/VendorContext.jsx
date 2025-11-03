import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/Token";

const VendorContext = createContext();

const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [pendingVendors, setPendingVendors] = useState([]);
  const [blacklistedVendors, setBlacklistedVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null); // ✅ For single vendor details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch all vendors data
useEffect(() => {
  const fetchVendorsData = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        return;
      }

      // ✅ Fetch all vendors
      const allRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/all-vendors-profiles`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const allVendors = allRes.data || [];

      // ✅ Fetch pending vendors
      const pendingRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-vendors`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const pendingData = pendingRes.data || [];
      setPendingVendors(pendingData);

      // ✅ Fetch blacklisted vendors
      const blacklistedRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/blacklisted-vendors`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const blacklistedData = blacklistedRes.data || [];
      setBlacklistedVendors(blacklistedData);

      // ✅ Normalize all vendor arrays
      const normalize = (arr) =>
        arr.map((v) => ({
          ...v,
          servicesProvided: v.servicesProvided?.length
            ? v.servicesProvided
            : ["-"],
        }));

      // ✅ Combine all vendors — don't remove duplicates
      const mergedData = [
        ...normalize(allVendors),
        ...normalize(pendingData),
        ...normalize(blacklistedData),
      ];

      setVendors(mergedData);
    } catch (err) {
      console.error("Error fetching vendor data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchVendorsData();
}, []);



  // 🔹 Fetch single vendor by ID
  const fetchVendorById = async (vendorId) => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/vendors-profiles/${vendorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedVendor(res.data || null);
      return res.data;
    } catch (error) {
      console.error("Error fetching vendor by ID:", error);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Approve Vendor
  const handleApprove = async (vendorId) => {
    try {
      const token = getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve-vendor/${vendorId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVendors((prev) =>
        prev.map((v) =>
          v._id === vendorId || v.id === vendorId
            ? { ...v, status: "Active" }
            : v
        )
      );
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  // 🔹 Reject Vendor
  const handleReject = (vendorId) => {
    setVendors((prev) =>
      prev.map((v) =>
        v._id === vendorId || v.id === vendorId
          ? { ...v, status: "Rejected" }
          : v
      )
    );
  };

  // 🔹 Blacklist Vendor
  const handleBlacklist = async (vendorId) => {
    try {
      const token = getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin//blacklist-vendor/${vendorId}`,
        { reason: "Fraudulent activity" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVendors((prev) =>
        prev.map((v) =>
          v._id === vendorId || v.id === vendorId
            ? { ...v, status: "Blacklisted" }
            : v
        )
      );
    } catch (error) {
      console.error("Error blacklisting vendor:", error);
    }
  };

  // 🔹 Delete Vendor
  const handleDeleteVendor = async (vendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        const token = getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/vendor/${vendorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setVendors((prev) =>
          prev.filter((v) => v._id !== vendorId && v.id !== vendorId)
        );
      } catch (error) {
        console.error("Error deleting vendor:", error);
      }
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        pendingVendors,
        blacklistedVendors,
        selectedVendor, // ✅ Expose single vendor
        loading,
        error,
        setVendors,
        fetchVendorById, // ✅ Added new method
        handleApprove,
        handleReject,
        handleBlacklist,
        handleDeleteVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

const useVendorContext = () => useContext(VendorContext);

export { VendorProvider, useVendorContext };
