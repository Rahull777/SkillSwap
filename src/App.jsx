import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSkills } from './components/ExploreSkills';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SkillDetails } from './components/SkillDetails';
import { TeacherList } from './components/TeacherList';
import { useState } from 'react';
import { TeacherProfile } from './components/TeacherProfile';
import { SwapRequest } from './components/SwapRequests';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Signup } from './components/signup';
import { Requests } from './components/Requests';
import { MySwaps } from "./components/MySwaps";
import { ProtectedRoute } from './components/ProtectedRoute';
import { HowItWorks } from './components/howitworks';
import './App.css';

function AppContent() {
  const [search, setSearch] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  function toggleDarkMode() {
    setDarkMode((currentMode) => {
      const newMode = !currentMode;

      localStorage.setItem("darkMode", newMode);

      return newMode;
    });
  }

  return (
    <div className={darkMode ? "dark-mode" : ""}>

      {!hideNavbar && (
        <Navbar
          search={search}
          setSearch={setSearch}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <Routes>

        <Route
          path="/skill/:skillName"
          element={<SkillDetails />}
        />

        <Route
          path="/teachers/:skillName"
          element={<TeacherList />}
        />

        <Route
          path="/teacher/:id/:skill"
          element={<TeacherProfile />}
        />

        <Route
          path="/swap/:skillName"
          element={
            <ProtectedRoute>
              <SwapRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-swaps"
          element={
            <ProtectedRoute>
              <MySwaps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Hero loggedIn={loggedIn} />
              <ExploreSkills search={search} />
              <HowItWorks />
            </>
          }
        />

      </Routes>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App;