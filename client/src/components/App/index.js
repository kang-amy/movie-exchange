import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewPage from '../Review';
import SearchPage from '../Search';
import MyPage from '../MyPage';
import LandingPage from '../Landing';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/MyPage" element={<MyPage  />} />
          <Route path="/Review" element={<ReviewPage  />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
