"use client";
import React, { useState } from "react";
import { Table, Typography, Button, Modal, Form, message } from "antd";
import { useAddConcertMutation, useListConcertQuery } from "@/redux/services/concert";
import moment from "moment";
import { useListVerifyPaymentsQuery, useVerifyPaymentMutation } from "@/redux/services/payment";

const { Title } = Typography;

const PaymentsPage = () => {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListVerifyPaymentsQuery();

  const [addConcert] = useAddConcertMutation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [verifyPayment] = useVerifyPaymentMutation();
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleViewEvidence = (evidenceUrl) => {
    setSelectedImage(evidenceUrl);
    showModal();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.start_date = values.start_date ? values.start_date.format("DD-MM-YYYY") : null;
      values.start_hours = values.start_hours ? values.start_hours.format("HH:mm:ss") : null;
      await addConcert(values).unwrap();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create concert:", error);
    }
  };

  const handleVerify = async (paymentId) => {
    try {
      await verifyPayment({ id: paymentId }).unwrap();
      message.success("Payment verified successfully");
    } catch (error) {
      message.error("Failed to verify payment");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transaction Code",
      dataIndex: "transaction_code",
      render: (text) => text,
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      render: (text) => text,
    },
    {
      title: "Concert Name",
      dataIndex: ["concert", "name"],
      render: (text) => text,
    },
    {
      title: "Total",
      dataIndex: ["concert", "price"],
      render: (text) => text,
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).locale("id").format("D MMMM YYYY"), // Format the date
    },
    {
      title: "Evidence",
      key: "evidence",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewEvidence(record.evidence)}>
          View
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleVerify(record.id)}>
          Verify
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Payments Page</Title>

      <Table columns={columns} dataSource={concerts} loading={isLoading} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedImage && <img alt="Evidence" src={`${process.env.NEXT_PUBLIC_BACKEND_URL + selectedImage}`} style={{ width: "100%" }} />}
      </Modal>
    </div>
  );
};

export default PaymentsPage;
