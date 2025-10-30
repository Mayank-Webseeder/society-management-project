import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs([
      {
        _id: "j1",
        societyName: "Green Valley",
        title: "Plumbing Pipe Replacement",
        createdAt: "2024-07-04",
        status: "Completed",
        jobStage: "generated", 
        quotationRequired: true,
        description:
          "Pipes in Block A and Block B are leaking, causing water accumulation. Work to be completed within 3 days. Vendor to arrange material and labor.",
        vendorApplications: [
          {
            _id: "v1",
            name: "Sharma Plumbing Services",
            contact: "+91-9876543210",
            email: "sharma.plumbing@example.com",
            appliedDate: "2024-07-05",
            quotation: 15500,
            status: "Pending",
          },
          {
            _id: "v2",
            name: "Mohan Painter",
            contact: "+91-9123456789",
            email: "mohan12@example.com",
            appliedDate: "2024-07-06",
            quotation: 14800,
            status: "Pending",
          },
          {
            _id: "v3",
            name: "Reliable Infrastructure",
            contact: "+91-9988776655",
            email: "reliableinfra@example.com",
            appliedDate: "2024-07-07",
            quotation: 16200,
            status: "Pending",
          },
        ],
        selectedVendor: {
          _id: "v2",
          name: "Mohan Painter",
          contact: "+91-9123456789",
          email: "mohan12@example.com",
          appliedDate: "2024-07-06",
          quotation: 14800,
          remarks:
            "Vendor selected based on lowest quotation and positive reviews.",
        },
      },

      {
        _id: "j2",
        societyName: "Sunshine Residency",
        title: "Painting Building Entrance",
        createdAt: "2024-07-02",
        status: "Pending",
        jobStage: "achieved",
        quotationRequired: true,
        description:
          "Painting the main entrance of the building with weatherproof paint. Complete within 5 days.",
        vendorApplications: [
          {
            _id: "v4",
            name: "Bright Colors",
            contact: "+91-9988223344",
            email: "brightcolors@example.com",
            appliedDate: "2024-07-03",
            quotation: 12000,
            status: "Pending",
          },
        ],
        selectedVendor: null,
      },

      {
        _id: "j3",
        societyName: "Silver Heights",
        title: "Security Camera Installation",
        createdAt: "2024-06-28",
        status: "Expired",
        jobStage: "Expired", 
        quotationRequired: true,
        description:
          "Install 10 CCTV cameras around the premises. Ensure coverage of all entry points.",
        vendorApplications: [
          {
            _id: "v5",
            name: "SecureTech Solutions",
            contact: "+91-9877665544",
            email: "securetech@example.com",
            appliedDate: "2024-06-29",
            quotation: 25000,
            status: "Approved",
          },
        ],
        selectedVendor: {
          _id: "v5",
          name: "SecureTech Solutions",
          contact: "+91-9877665544",
          email: "securetech@example.com",
          appliedDate: "2024-06-29",
          quotation: 25000,
          remarks: "Vendor approved after site visit and demo.",
        },
      },

      {
        _id: "j4",
        societyName: "Royal Heights",
        title: "Lift Maintenance",
        createdAt: "2024-07-04",
        status: "Completed",
        jobStage: "generated", 
        quotationRequired: true,
        description:
          "Routine lift maintenance and safety checks for all 3 lifts in the building.",
        vendorApplications: [],
        selectedVendor: null,
      },

      {
        _id: "j5",
        societyName: "Palm County",
        title: "Clubhouse Painting",
        createdAt: "2024-06-30",
        status: "Expired",
        jobStage: "completed", 
        quotationRequired: false,
      },

      {
        _id: "j6",
        societyName: "Emerald Residency",
        title: "Parking Area Lighting Fix",
        createdAt: "2024-07-02",
        status: "Completed",
        jobStage: "generated", 
        quotationRequired: true,
      },

      {
        _id: "j7",
        societyName: "Maple Woods",
        title: "Boundary Wall Crack Repair",
        createdAt: "2024-06-28",
        status: "Completed",
        jobStage: "generated",
        quotationRequired: false,
      },
    ]);
  }, []);

  const totalJobs = jobs.length;

  return (
    <JobContext.Provider value={{ jobs, setJobs, totalJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobProvider, JobContext };
