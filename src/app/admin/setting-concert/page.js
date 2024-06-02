"use client";
import { useCreatePaymentMutation, useListConcertQuery, useListTicketCustomerQuery } from "@/redux/services/payment";
import { useListSettingConcertQuery } from "@/redux/services/settingConcert";
import { Button, Card, Descriptions, Divider, Form, Modal } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";

import React, { useState } from "react";

export default function SettingConcert() {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListSettingConcertQuery();
  const [visible, setVisible] = useState(false);
  const [selectedConcert, setSelelectedConcert] = useState(false);
  const [form] = Form.useForm();
  const [createPayment] = useCreatePaymentMutation();

  const showModal = (data) => {
    setSelelectedConcert(data);
    setVisible(true);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createPayment(values).unwrap();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create concert:", error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Title level={3}>Setting Concert</Title>
      <p className="text-black">Concert arrangements can only be done if the concert date is equal to today's date </p>
      <div className="mt-4 grid gap-x-5 grid-cols-4 gap-y-6">
        {concerts &&
          concerts.map((concert) => (
            <Card
              key={concert.id} // Make sure to set a unique key for each Card
              hoverable
              cover={<img alt={concert.name} className="object-cover size-40" src={`${process.env.NEXT_PUBLIC_BACKEND_URL + concert.logo}`} />} // Use concert logo as the image source
            >
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {concert.name}
                </Title>{" "}
                {/* Apply margin: 0 to remove margin */}
                <Title level={5} style={{ marginTop: "2px" }}>
                  Rp.{concert.price}
                </Title>
                <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
                {/* Apply margin: 0 to remove margin */}
                <p style={{ marginTop: "4px" }}>{concert.description}</p> {/* Apply margin: 0 to remove margin */}
                <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
                <p style={{ marginTop: "4px" }}>
                  Start at: {moment(concert.start_date, "DD-MM-YYYY").format("DD MMMM YYYY")} {concert.start_hours}
                </p>
                {concert.is_start ? (
                  <Button type="primary" danger style={{ marginTop: "16px" }}>
                    Stop Concert
                  </Button>
                ) : (
                  <Button type="primary" style={{ marginTop: "16px" }}>
                    Start Concert
                  </Button>
                )}
                {/* Add margin-top to create space between button and description */}
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}
