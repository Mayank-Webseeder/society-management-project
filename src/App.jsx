import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./components/auth/Login";
import SignIn from "./components/auth/SignIn";
import { useState } from "react";
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
import VendorServicesList from "./components/services/catg&services/VendorServicesList";
import RatingSummary from "./components/review-feedback/RatingSummary";
import MyProfile from "./components/adminSettting/MyProfile";
import Setting from "./components/adminSettting/Setting";
import Reports from "./components/reports/Reports";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route
            path="/"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <Dashboard />
              </AppLayout>
            }
          />

          <Route
            path="/societies"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <SocietyList />
              </AppLayout>
            }
          />
          <Route
            path="/society-details/:id"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <DetailProfile />
              </AppLayout>
            }
          />
          <Route
            path="/edit-society/:societyId"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <EditSociety />
              </AppLayout>
            }
          />

          <Route
            path="/vendors"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <VendorList />
              </AppLayout>
            }
          />

          <Route
            path="/vendor-details/:vendorId"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <VendorDetailProfile />
              </AppLayout>
            }
          />

          <Route
            path="/vendor-edit/:vendorId"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <VendorEditDetails />
              </AppLayout>
            }
          />

          <Route
            path="/jobs"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <JobsList />
              </AppLayout>
            }
          />

          <Route
            path="/job-details/:id"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <JobDetailProfile />
              </AppLayout>
            }
          />

          <Route
            path="/subscriptions"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <Subscription />
              </AppLayout>
            }
          />

          <Route
            path="/services-categories"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <ServicesList />
              </AppLayout>
            }
          />

          <Route
            path="/vendors-by-service/:serviceName"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <VendorServicesList />
              </AppLayout>
            }
          />

          <Route
            path="/ratings"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <RatingSummary />
              </AppLayout>
            }
          />

          <Route
            path="/admin-settings"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <Setting/>
              </AppLayout>
            }
          />

            <Route
            path="/reports"
            element={
              <AppLayout setIsLoggedIn={setIsLoggedIn}>
                <Reports/>
              </AppLayout>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/login"
            element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
