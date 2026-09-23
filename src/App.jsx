
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSkills } from './components/ExploreSkills';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ExploreSkills />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App


