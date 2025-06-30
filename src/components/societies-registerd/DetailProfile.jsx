import React from "react";
import {
  FileUser,
  User,
  PhoneCall,
  Mails,
  MapPinHouse,
  Building2,
  ListTodo,
  CircleCheckBig,
  CircleAlert,
  CircleX,
} from "lucide-react";

const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold max-w-max">
          <CircleCheckBig className="w-5 h-5 mr-2" /> Approved
        </span>
      );
    case "Pending":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold max-w-max">
          <CircleAlert className="w-5 h-5 mr-2" /> Pending
        </span>
      );
    case "Rejected":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold max-w-max">
          <CircleX className="w-5 h-5 mr-2" /> Rejected
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold max-w-max">
          {status}
        </span>
      );
  }
};

const DetailProfile = ({
  selectSociety,
  onApprove,
  onReject,
  onBan,
  onEdit,
  onDelete,
}) => {
  if (!selectSociety) return null;

  const { status } = selectSociety;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg outline outline-1 outline-[#adccd6] max-w-5xl mx-auto">
      {/* Header: Name + Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {selectSociety.name}
        </h1>
        <div>{getStatusBadge(status)}</div>
      </div>

      <p className="text-gray-600 mb-8">{selectSociety.location}</p>

      {/* details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <FileUser className="text-blue-600" /> Contact Information
          </h2>
          <div className="space-y-4 text-gray-700 ml-2">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{selectSociety.contactPerson}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{selectSociety.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mails className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{selectSociety.email}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <MapPinHouse className="text-blue-600" /> Address
          </h2>
          <div className="space-y-4 text-gray-700 ml-2">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{selectSociety.address}</span>
            </div>
            <p className="text-sm text-gray-500 ml-7">
              {selectSociety.city} - {selectSociety.pincode}
            </p>
          </div>
        </section>

        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <ListTodo className="text-blue-600" /> Job Status
          </h2>
          <div className="space-y-5 text-gray-700 ml-2 text-sm md:text-base">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Total Jobs Posted:</span>
              <span>{selectSociety.totalJobsPosted}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Active Jobs:</span>
              <span>{selectSociety.activeJobs}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Completed Jobs:</span>
              <span>
                {selectSociety.totalJobsPosted - selectSociety.activeJobs}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {status === "Pending" && (
          <>
            <button
              onClick={() => onApprove(selectSociety.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(selectSociety.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
            >
              Reject
            </button>
          </>
        )}

        {status === "Approved" && (
          <button
            onClick={() => onBan(selectSociety.id)}
            className="bg-[#ebb912] hover:bg-yellow-500 text-white px-5 py-2 rounded shadow"
          >
            Ban / Suspend
          </button>
        )}

        <button
          onClick={() => onEdit(selectSociety.id)}
          className="bg-[#118ab2] hover:bg-[#00b4d8] text-white px-5 py-2 rounded shadow"
        >
          Edit
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(selectSociety.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailProfile;
