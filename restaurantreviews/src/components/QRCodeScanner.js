import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = ({ onScan, onSubmitReview }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const reviewData = JSON.parse(data);
        onScan(data);
        onSubmitReview();
      } catch (error) {
        setError('Invalid QR code');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to scan QR code');
  };

  return (
    <div>
      <h3>Scan the QR code to submit your review</h3>
      <div className="qr-scanner">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
