import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import QRCodeScanner from './components/QRCodeScanner';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit-review" element={<SubmitReviewPage />} />
      <Route path="/scan" element={<QRCodeScanner />} />
    </Routes>
  );
};

export default App;
