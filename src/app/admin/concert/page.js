"use client";
import React from "react";
import { Table, Typography, Button, Modal, Form } from "antd";
import { useAddConcertMutation, useListConcertQuery } from "@/redux/services/concert";
import ConcertForm from "./partials/add-data";
import moment from "moment";

const { Title } = Typography;

const ConcertPage = () => {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListConcertQuery();

  const [addConcert] = useAddConcertMutation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text) => <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL + text}`} alt="logo" style={{ width: 50 }} />,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Start Hours",
      dataIndex: "start_hours",
      key: "start_hours",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "YouTube Link",
      dataIndex: "link_yt",
      key: "link_yt",
      render: (text) => (
        <a href={`https://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Concerts List</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Data
      </Button>
      <Table columns={columns} dataSource={concerts} loading={isLoading} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal title="Add Concert Data" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <ConcertForm form={form} />
      </Modal>
    </div>
  );
};

export default ConcertPage;
