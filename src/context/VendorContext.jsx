import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/Token";

const VendorContext = createContext();

const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [pendingVendors, setPendingVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blacklistedVendors, setBlacklistedVendors] = useState([]);

  useEffect(() => {
 const mockVendors = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91-9876543210",
    location: "Indore",
    status: "Active",
    subscriptionStatus: "active",
    servicesProvided: ["Plumber", "Electrical"],
    rating: 4.5,
    totalJobsApplied: 23,
    completedJobs: 18,
    ongoingJobs: 2,
    jobSuccessRate: 85,
    documents: [
      { name: "Aadhar Card", type: "Identity Proof", status: "Verified", uploadedOn: "2024-05-10" },
      { name: "Address Proof", type: "Address Proof", status: "Pending", uploadedOn: "--" },
      { name: "PAN Card", type: "Tax Document", status: "Verified", uploadedOn: "2024-05-15" },
    ],
    jobHistory: [
      { id: "J001", title: "Leakage Fix", type: "Plumbing", status: "Completed", price: 1200, date: "2025-05-05" },
      { id: "J002", title: "Fan Installation", type: "Electrical", status: "Completed", price: 800, date: "2025-05-22" },
      { id: "J003", title: "Geyser Repair", type: "Electrical", status: "Ongoing", price: 1500, date: "2025-06-30" },
      { id: "J004", title: "Bathroom Fitting", type: "Plumbing", status: "Completed", price: 2500, date: "2025-07-03" },
    ],
    subscription: { startDate: "2024-04-01", endDate: "2025-03-31", paymentStatus: "Paid", renewalDue: false },
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91-9812345678",
    location: "Bhopal",
    status: "Active",
    subscriptionStatus: "active",
    servicesProvided: ["Carpentry", "Painting"],
    rating: 4.8,
    totalJobsApplied: 30,
    completedJobs: 27,
    ongoingJobs: 1,
    jobSuccessRate: 90,
    documents: [
      { name: "Aadhar Card", type: "Identity Proof", status: "Verified", uploadedOn: "2024-06-12" },
      { name: "GST Certificate", type: "Business Proof", status: "Verified", uploadedOn: "2024-07-10" },
      { name: "Address Proof", type: "Address Proof", status: "Verified", uploadedOn: "2024-06-20" },
    ],
    jobHistory: [
      { id: "J101", title: "Wall Painting", type: "Painting", status: "Completed", price: 3000, date: "2025-02-15" },
      { id: "J102", title: "Furniture Repair", type: "Carpentry", status: "Completed", price: 1800, date: "2025-03-05" },
      { id: "J103", title: "Cabinet Installation", type: "Carpentry", status: "Ongoing", price: 2500, date: "2025-06-01" },
    ],
    subscription: { startDate: "2024-05-01", endDate: "2025-04-30", paymentStatus: "Paid", renewalDue: false },
  },
  // {
  //   id: 3,
  //   name: "Ravi Verma",
  //   email: "ravi.verma@example.com",
  //   phone: "+91-9123456789",
  //   location: "Gwalior",
  //   status: "Pending",
  //   subscriptionStatus: "inactive",
  //   servicesProvided: ["Cleaning", "Gardening"],
  //   rating: 3.9,
  //   totalJobsApplied: 15,
  //   completedJobs: 10,
  //   ongoingJobs: 3,
  //   jobSuccessRate: 67,
  //   documents: [
  //     { name: "Aadhar Card", type: "Identity Proof", status: "Pending", uploadedOn: "--" },
  //     { name: "Address Proof", type: "Address Proof", status: "Pending", uploadedOn: "--" },
  //   ],
  //   jobHistory: [
  //     { id: "J201", title: "Garden Maintenance", type: "Gardening", status: "Completed", price: 1200, date: "2025-04-10" },
  //     { id: "J202", title: "Home Deep Cleaning", type: "Cleaning", status: "Completed", price: 3500, date: "2025-05-12" },
  //     { id: "J203", title: "Lawn Trimming", type: "Gardening", status: "Ongoing", price: 800, date: "2025-06-22" },
  //   ],
  //   subscription: { startDate: "2024-01-10", endDate: "2025-01-09", paymentStatus: "Unpaid", renewalDue: true },
  // },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91-9765432109",
    location: "Jabalpur",
    status: "Inactive",
    subscriptionStatus: "expired",
    servicesProvided: ["AC Repair", "Refrigerator Repair"],
    rating: 4.2,
    totalJobsApplied: 20,
    completedJobs: 15,
    ongoingJobs: 0,
    jobSuccessRate: 75,
    documents: [
      { name: "Aadhar Card", type: "Identity Proof", status: "Verified", uploadedOn: "2024-03-22" },
      { name: "PAN Card", type: "Tax Document", status: "Verified", uploadedOn: "2024-03-25" },
      { name: "License", type: "Business Document", status: "Expired", uploadedOn: "2024-03-30" },
    ],
    jobHistory: [
      { id: "J301", title: "AC Gas Refill", type: "AC Repair", status: "Completed", price: 2000, date: "2025-01-15" },
      { id: "J302", title: "Refrigerator Cooling Issue", type: "Refrigerator Repair", status: "Completed", price: 2500, date: "2025-02-05" },
      { id: "J303", title: "AC Servicing", type: "AC Repair", status: "Completed", price: 1500, date: "2025-03-10" },
    ],
    subscription: { startDate: "2023-03-01", endDate: "2024-02-29", paymentStatus: "Expired", renewalDue: true },
  },
];


    const fetchAllVendors = async () => {
      setLoading(true);
      try {
        const token = getToken();

        // All Vendors API
        const allRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/all-vendors`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        let allVendors = allRes.data || [];

        // Pending Vendors API
        const pendingRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-vendors`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPendingVendors(pendingRes.data || []);

        // Merge all vendors 
        let merged = allVendors.map((v) => ({
          ...v,
          servicesProvided: v.servicesProvided?.length
            ? v.servicesProvided
            : ["-"],
        }));

        // Merge pending vendors (avoid duplicates)
        let finalList = [...merged, ...pendingVendors].filter(
          (v, index, self) =>
            index === self.findIndex((obj) =>  v.id)
        );

        setVendors([...mockVendors, ...finalList]);
      } catch (error) {
        console.error("Error fetching vendors", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlacklistedVendors = async () => {
      try {
        const token = getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/blacklisted-vendors`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlacklistedVendors(res.data || []);
       // console.log("Blacklist vendors", res.data);
      } catch (error) {
        console.error("Error fetching blacklisted vendors", error);
      }
    };

    fetchAllVendors();
    fetchBlacklistedVendors();
  }, []);

  const handleApprove = async (vendorId) => {
    //console.log("Approving vendor with ID:", vendorId);
    try {
      const token = getToken();
      await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/approve-vendor/${vendorId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId || v._id === vendorId
            ? { ...v, status: "Active" }
            : v
        )
      );
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleReject = (id) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id || v._id === id ? { ...v, status: "Rejected" } : v
      )
    );
  };

  const handleBlacklist = async (id) => {
    try {
      const token = getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/blacklist-vendor/${id}`,
        { reason: "Fraudulent activity" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVendors((prev) =>
        prev.map((v) =>
          v.id === id || v._id === id ? { ...v, status: "Blacklisted" } : v
        )
      );
    } catch (error) {
      console.error("Blacklist API failed", error);
    }
  };

const handleDeleteVendor = (id) => {
  if (window.confirm("Are you sure you want to delete this vendor?")) {
    // Optionally: call your API here if needed
    // await axios.delete(`https://backendfullstack-if68.onrender.com/api/v1/vendor/${id}`);

    // Update local state (removes from UI)
    setVendors((prev) => prev.filter((v) => v.id !== id && v._id !== id));

    // ✅ Then refresh the page
    window.location.reload();
  }
};


  return (
    <VendorContext.Provider
      value={{
        vendors,
        setVendors,
        handleApprove,
        handleReject,
        handleBlacklist,
        handleDeleteVendor,
        loading,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

const useVendorContext = () => useContext(VendorContext);

export { VendorProvider, useVendorContext };
