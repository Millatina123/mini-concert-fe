"use client";
import { useCreatePaymentMutation, useListConcertQuery, useListTicketCustomerQuery } from "@/redux/services/payment";
import { Button, Card, Divider, Form, Modal } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import Link from "next/link";

import React, { useState } from "react";

export default function ListTicketCustomer() {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListTicketCustomerQuery();
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
      <Title level={3}>My Ticket</Title>
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
                  <Link href={"/customer/my-ticket/" + concert.code}>
                    <Button type="primary" style={{ marginTop: "16px" }}>
                      Watch Concert
                    </Button>{" "}
                  </Link>
                ) : (
                  <Button type="primary" style={{ marginTop: "16px" }} disabled>
                    Start Soon
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
