import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./components/auth/Login";
import SignIn from "./components/auth/SignIn";
import { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import SocietyList from "./components/societies-registerd/SocietyList";

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

        <Route path="/societies" element={
          <AppLayout setIsLoggedIn={setIsLoggedIn}>
            <SocietyList/>
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
