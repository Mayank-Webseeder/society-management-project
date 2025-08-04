import React, { createContext, useContext, useEffect, useState } from "react";

const VendorContext = createContext();

const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);

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
          {
            name: "Aadhar Card",
            type: "Identity Proof",
            status: "Verified",
            uploadedOn: "2024-05-10",
          },
          {
            name: "Address Proof",
            type: "Address Proof",
            status: "Pending",
            uploadedOn: "--",
          },
          {
            name: "PAN Card",
            type: "Tax Document",
            status: "Verified",
            uploadedOn: "2024-05-15",
          },
        ],

        jobHistory: [
          {
            id: "J001",
            title: "Leakage Fix",
            type: "Plumbing",
            status: "Completed",
            price: 1200,
            date: "2025-05-05",
          },
          {
            id: "J002",
            title: "Fan Installation",
            type: "Electrical",
            status: "Completed",
            price: 800,
            date: "2025-05-22",
          },
          {
            id: "J003",
            title: "Geyser Repair",
            type: "Electrical",
            status: "Ongoing",
            price: 1500,
            date: "2025-06-30",
          },
          {
            id: "J004",
            title: "Bathroom Fitting",
            type: "Plumbing",
            status: "Completed",
            price: 2500,
            date: "2025-07-3",
          },
        ],
        subscription: {
          startDate: "2024-04-01",
          endDate: "2025-03-31",
          paymentStatus: "Paid",
          renewalDue: false,
        },
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91-9123456780",
        location: "Bhopal",
        status: "Active",
        subscriptionStatus: "expired",
        servicesProvided: ["Cleaning", "Pest Control"],
        rating: 4.2,
        totalJobsApplied: 15,
      },
      {
        id: 3,
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        phone: "+91-9988776655",
        location: "Ujjain",
        status: "Pending",
        subscriptionStatus: "inactive",
        servicesProvided: ["Carpenter", "Painting"],
        rating: 4.8,
        totalJobsApplied: 35,
      },
      {
        id: 4,
        name: "Neha Verma",
        email: "neha.verma@example.com",
        phone: "+91-9345612789",
        location: "Indore",
        status: "Rejected",
        subscriptionStatus: "inactive",
        servicesProvided: ["Electrician"],
        rating: 4.0,
        totalJobsApplied: 12,
      },
      {
        id: 5,
        name: "Suresh Patel",
        email: "suresh.patel@example.com",
        phone: "+91-9812345678",
        location: "Dewas",
        status: "Active",
        subscriptionStatus: "expired",
        servicesProvided: ["Plumber", "Cleaning"],
        rating: 3.9,
        totalJobsApplied: 8,
      },
      {
        id: 6,
        name: "Amit Singh",
        email: "amit.singh@example.com",
        phone: "+91-9977554433",
        location: "Indore",
        status: "Active",
        subscriptionStatus: "active",
        servicesProvided: ["Security", "CCTV Maintenance", "Access Control"],
        rating: 4.7,
        totalJobsApplied: 18,
      },
      {
        id: 7,
        name: "Meera Joshi",
        email: "meera.joshi@example.com",
        phone: "+91-9988665544",
        location: "Bhopal",
        status: "Rejected",
        subscriptionStatus: "inactive",
        servicesProvided: ["Gardening", "Waste Management"],
        rating: 4.3,
        totalJobsApplied: 10,
      },
      {
        id: 8,
        name: "Sneha Kapoor",
        email: "sneha.kapoor@example.com",
        phone: "+91-9876543211",
        location: "Indore",
        status: "Active",
        subscriptionStatus: "active",
        servicesProvided: ["Maid Services", "Cleaning"],
        rating: 4.6,
        totalJobsApplied: 20,
      },

      {
        id: 9,
        name: "Rohit Mehta",
        email: "rohit.mehta@example.com",
        phone: "+91-9123456789",
        location: "Bhopal",
        status: "Active",
        subscriptionStatus: "expired",
        servicesProvided: ["Driver on Demand", "Transport Services"],
        rating: 4.4,
        totalJobsApplied: 15,
      },
    ];
    setVendors(mockVendors);
  }, []);

  const handleApprove = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Active" } : v))
    );
  };

  const handleReject = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Rejected" } : v))
    );
  };

  const handlePending = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Pending" } : v))
    );
  };

  const handleDisable = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Disabled" } : v))
    );
  };

  const handleDeleteVendor = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleDeleteSociety = (id) => {
    if (window.confirm("Are you sure you want to delete this society?")) {
      setSocieties((prev) => prev.filter((soc) => soc.id !== id));
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        setVendors,
        handleApprove,
        handleReject,
        handlePending,
        handleDisable,
        handleDeleteVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

const useVendorContext = () => useContext(VendorContext);

export { VendorProvider, useVendorContext };
