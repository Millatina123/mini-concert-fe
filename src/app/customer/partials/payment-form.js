import React, { useState } from "react";
import { Modal, Button, Typography, Divider } from "antd";
const { Text, Title } = Typography;

const PaymentForm = () => {
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between py-2">
          <Text>Date</Text>
          <Text strong>03-04-2024</Text>
        </div>
        <div className="flex justify-between py-2">
          <Text>Payment method</Text>
          <Text strong>Visa</Text>
        </div>
        <div className="flex justify-between py-2">
          <Text>Card number</Text>
          <Text strong>**** **** **** 8888</Text>
        </div>
        <div className="flex justify-between py-2">
          <Text>Cardholder name</Text>
          <Text strong>James White</Text>
        </div>
        <div className="flex justify-between py-2">
          <Text>Email</Text>
          <Text strong>jamesw@mail.com</Text>
        </div>
        <div className="flex justify-between py-2">
          <Text>Total amount</Text>
          <Text strong>$740.99</Text>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
