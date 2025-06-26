import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./components/auth/Login";
import SignIn from "./components/auth/SignIn";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <AppLayout setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
