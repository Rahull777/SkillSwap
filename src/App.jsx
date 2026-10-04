
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSkills } from './components/ExploreSkills';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SkillDetails } from './components/SkillDetails';
import { TeacherList } from './components/TeacherList';
import { useState } from 'react';
import { TeacherProfile } from './components/TeacherProfile';
import { SwapRequest } from './components/SwapRequests';
import {Login} from './components/Login';
import {Profile} from './components/Profile';
import {Signup} from './components/signup';
import {Requests} from './components/Requests';
import { MySwaps } from "./components/MySwaps";
import './App.css';
function App() {
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ExploreSkills search={search} />
            </>
          }
        />
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
          element={<SwapRequest />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route path="/requests" 
        element={<Requests />} 
        />
        <Route path="/my-swaps"
        element={<MySwaps />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App


