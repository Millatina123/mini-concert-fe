"use client";
import { useListHistoryConcertCustomerQuery, useUpdateReviewRatingMutation } from "@/redux/services/historyTicketCustomer";
import { useCreatePaymentMutation, useListConcertQuery, useListTicketCustomerQuery } from "@/redux/services/payment";
import { Button, Card, Divider, Form, Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import moment from "moment";
import Link from "next/link";

import React, { useState } from "react";

export default function HistoryConcertCustomer() {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListHistoryConcertCustomerQuery();
  const [visible, setVisible] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(false);
  const [form] = Form.useForm();
  const [updateReviewRating] = useUpdateReviewRatingMutation();
  const [rating, setRating] = useState(0);

  const onChangeRating = (value) => {
    setRating(value);
  };
  const showModal = (data) => {
    setSelectedPaymentId(data);
    setVisible(true);
  };
  const handleOk = async () => {
    try {
      var data = {
        id: selectedPaymentId,
        rating: rating,
        review: form.getFieldValue("review"),
      };

      await updateReviewRating(data).unwrap();
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
      <Title level={3}>History Conert</Title>
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
                <p style={{ marginTop: "4px" }} className="line-clamp-4">
                  {concert.description}
                </p>{" "}
                {/* Apply margin: 0 to remove margin */}
                <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
                <p style={{ marginTop: "4px" }}>
                  Start at: {moment(concert.start_date, "DD-MM-YYYY").format("DD MMMM YYYY")} {concert.start_hours}
                </p>
                {concert.payments[0].review == null || concert.payments[0].rating == null ? (
                  <Button type="primary" style={{ marginTop: "16px" }} onClick={() => showModal(concert.payments[0].id)}>
                    Rate This!
                  </Button>
                ) : (
                  <Button type="primary" style={{ marginTop: "16px" }} disabled>
                    Thankyou For Rating
                  </Button>
                )}
                {/* Add margin-top to create space between button and description */}
              </div>
            </Card>
          ))}
      </div>
      <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <div className="text-center flex flex-col">
            <div>Thankyou for watching this concert, give rating for this concert</div>

            <div className="mt-4">
              <Rate className="mt-8" style={{ fontSize: "40px" }} onChange={onChangeRating} />
            </div>
          </div>
          <Form.Item label="Review" name="review">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
