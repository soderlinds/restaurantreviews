import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubmitReviewPage from './pages/SubmitReviewPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit-review" element={<SubmitReviewPage />} />
    </Routes>
  );
};

export default App;
