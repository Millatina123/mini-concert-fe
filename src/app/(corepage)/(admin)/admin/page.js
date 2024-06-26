"use client";
import { useRegisterMutation, useVerifyTokenMutation } from "@/redux/services/auth";
import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";

export default function Admin() {
  const [verifyToken, { isLoading }] = useVerifyTokenMutation();
  useEffect(() => {
    // Call the register mutation function when the component mounts for the first time
    verifyToken(localStorage.getItem("authToken"));
  }, []);
  return (
    <div className="text-black">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
