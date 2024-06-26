"use client";
import { useCreatePaymentMutation, useListConcertQuery } from "@/redux/services/payment";
import { Button, Card, Divider, Form, Modal } from "antd";
import Title from "antd/es/typography/Title";

import React, { useState } from "react";
import PaymentForm from "./partials/payment-form";

export default function CustomerPage() {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListConcertQuery();
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
      <Title level={3}>Available Concerts</Title>
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
                {concert && concert.payments.length > 0 ? (
                  concert?.payments[0].verified ? (
                    <Button type="primary" style={{ marginTop: "16px" }} disabled>
                      Ticket Already Purchased
                    </Button>
                  ) : (
                    <Button type="primary" style={{ marginTop: "16px" }} disabled>
                      Waiting Verification
                    </Button>
                  )
                ) : (
                  <Button type="primary" style={{ marginTop: "16px" }} onClick={() => showModal(concert)}>
                    Purchase Ticket
                  </Button>
                )}
                {/* Add margin-top to create space between button and description */}
              </div>
            </Card>
          ))}
      </div>
      <Modal
        title="Confirm your payment"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel Payment
          </Button>,
          <Button key="confirm" type="primary" onClick={handleOk}>
            Confirm Payment
          </Button>,
        ]}
      >
        <PaymentForm data={selectedConcert} form={form} />
      </Modal>
    </>
  );
}