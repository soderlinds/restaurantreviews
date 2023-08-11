import React from 'react';
import { Link } from 'react-router-dom';

const QRCodeScanner = ({ reviewData }) => {
  return (
    <div>
      <h2>Scan QR Code</h2>
      <p>Simulate a QR code scan by clicking the button below:</p>
      <Link to={{ pathname: '/submit-review', state: { reviewData } }}>
        <button>Scan QR Code</button>
      </Link>
    </div>
  );
};

export default QRCodeScanner;
