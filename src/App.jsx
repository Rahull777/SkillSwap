
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSkills } from './components/ExploreSkills';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SkillDetails } from './components/SkillDetails';
import {useState} from 'react';
import './App.css';
function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ExploreSkills search={search}/>
            </>
          }
        />
        <Route
          path="/skill/:skillName"
          element={<SkillDetails />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App


