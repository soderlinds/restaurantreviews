import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CedarGrill from './pages/CedarGrill';
import SubmitReviewPage from './pages/SubmitReviewPage';
import QRCodeScanner from './components/QRCodeScanner';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cedar-grill" element={<CedarGrill />} />
      <Route path="/submit-review" element={<SubmitReviewPage />} />
      <Route path="/scan" element={<QRCodeScanner />} />
    </Routes>
  );
};

export default App;
