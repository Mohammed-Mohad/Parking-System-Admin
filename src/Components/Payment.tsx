import React, { useState } from 'react';

interface PaymentProps {
  entryTime: Date;
  exitTime: Date;
}

const Payment: React.FC<PaymentProps> = ({ entryTime, exitTime }) => {
  const [payment, setPayment] = useState(0);

  React.useEffect(() => {
    const durationInSeconds = (exitTime.getTime() - entryTime.getTime()) / 1000;
    const cost = durationInSeconds * 0.01; // 1 cent for 0.01 second
    setPayment(cost);
  }, [entryTime, exitTime]);

  return (
    <div className="bg-gray-100 border border-gray-200 rounded p-3 m-2 w-64 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2>Total Cost</h2>
      <p>${payment.toFixed(2)}</p>
    </div>
  );
};

export default Payment;