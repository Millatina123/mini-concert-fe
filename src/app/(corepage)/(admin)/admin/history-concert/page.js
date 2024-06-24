"use client";
import { useDetailConcertQuery, useLazyDetailConcertQuery, useListHistoryConcertAdminQuery } from "@/redux/services/historyConcertAdmin";
import { Avatar, Button, Card, Col, Divider, List, Modal, Row, Typography } from "antd";
import { UserOutlined, DollarOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function HistoryConcertAdmin() {
  const { data: { payload: { data: concerts } = {} } = {}, isLoading } = useListHistoryConcertAdminQuery();
  const [trigger, { data: { payload: { data: concertDetail } = {} } = {}, isLoading: isDetailLoading }] = useLazyDetailConcertQuery();
  const [visible, setVisible] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState(null);

  useEffect(() => {
    if (selectedConcert) {
      trigger(selectedConcert.id);
    }
  }, [selectedConcert]);

  const showModal = (concert) => {
    setSelectedConcert(concert);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedConcert(null); // Reset selected concert when closing modal
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <>
      <Title level={3}>History Concert</Title>
      <div className="mt-4 grid gap-x-5 grid-cols-4 gap-y-6">
        {concerts &&
          concerts.map((concert) => (
            <Card key={concert.id} hoverable cover={<img alt={concert.name} className="object-cover size-40" src={`${process.env.NEXT_PUBLIC_BACKEND_URL + concert.logo}`} />}>
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {concert.name}
                </Title>
                <Title level={5} style={{ marginTop: "2px" }}>
                  Rp.{concert.price}
                </Title>
                <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
                <p style={{ marginTop: "4px" }} className="line-clamp-4">
                  {concert.description}
                </p>
                <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
                <p style={{ marginTop: "4px" }}>
                  Start at: {moment(concert.start_date, "DD-MM-YYYY").format("DD MMMM YYYY")} {concert.start_hours}
                </p>
                <Button type="primary" style={{ marginTop: "16px" }} onClick={() => showModal(concert)}>
                  Detail
                </Button>
              </div>
            </Card>
          ))}
      </div>
      <Modal visible={visible} onCancel={handleCancel} width={1000}>
        {isDetailLoading ? (
          <p>Loading...</p>
        ) : (
          concertDetail && (
            <>
              <Row gutter={16} className="mb-4">
                <Col span={8}>
                  <Card title="Total Buyer" bordered={false}>
                    <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
                    <span className="font-bold text-2xl">{concertDetail.totalPayments}</span>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Total Revenue" bordered={false}>
                    <DollarOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
                    <span className="font-bold text-2xl"> Rp.{concertDetail?.totalRevenue}</span>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Average Rating" bordered={false}>
                    <StarOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
                    <span className="font-bold text-2xl"> {concertDetail?.averageRating} </span>
                  </Card>
                </Col>
              </Row>
              <Card className="mt-8">
                <Title level={5}>Review</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={concertDetail.concert.payments}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={
                          <div>
                            {item.review || "No review available"}
                            {item.rating && (
                              <span style={{ marginLeft: "10px", display: "inline-flex", alignItems: "center" }}>
                                <StarFilled style={{ color: "#fadb14", marginRight: "4px" }} />
                                {item.rating}
                              </span>
                            )}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </>
          )
        )}
      </Modal>
    </>
  );
}
