import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./components/layout/AppLayout";
import Login from "./components/auth/Login";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import SocietyList from "./components/societies-registerd/SocietyList";
import DetailProfile from "./components/societies-registerd/DetailProfile";
import VendorList from "./components/vendors/VendorList";
import VendorDetailProfile from "./components/vendors/VendorDetailProfile";
import VendorEditDetails from "./components/vendors/VendorEditDetails";
import EditSociety from "./components/societies-registerd/EditSociety";
import JobsList from "./components/jobs/JobsList";
import JobDetailProfile from "./components/jobs/JobDetailProfile";
import Subscription from "./components/subscription/Subscription";
import ServicesList from "./components/services/ServicesList";
import VendorServicesList from "./components/services/VendorServicesList";
import RatingSummary from "./components/review-feedback/RatingSummary";
import Setting from "./components/adminSettting/Setting";
import Reports from "./components/reports/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/societies"
          element={
            <PrivateRoute>
              <AppLayout>
                <SocietyList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/society-details/:id"
          element={
            <PrivateRoute>
              <AppLayout>
                <DetailProfile />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-society/:societyId"
          element={
            <PrivateRoute>
              <AppLayout>
                <EditSociety />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <PrivateRoute>
              <AppLayout>
                <VendorList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/vendor-details/:vendorId"
          element={
            <PrivateRoute>
              <AppLayout>
                <VendorDetailProfile />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/vendor-edit/:vendorId"
          element={
            <PrivateRoute>
              <AppLayout>
                <VendorEditDetails />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <AppLayout>
                <JobsList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/job-details/:id"
          element={
            <PrivateRoute>
              <AppLayout>
                <JobDetailProfile />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <AppLayout>
                <Subscription />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/services-categories"
          element={
            <PrivateRoute>
              <AppLayout>
                <ServicesList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/vendors-by-service/:serviceName"
          element={
            <PrivateRoute>
              <AppLayout>
                <VendorServicesList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ratings"
          element={
            <PrivateRoute>
              <AppLayout>
                <RatingSummary />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-settings"
          element={
            <PrivateRoute>
              <AppLayout>
                <Setting />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <AppLayout>
                <Reports />
              </AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
