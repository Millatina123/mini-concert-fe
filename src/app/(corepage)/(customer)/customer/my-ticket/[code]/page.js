"use client";
import { useConcertQuery } from "@/redux/services/concert";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export default function page({ params }) {
  const concert = useConcertQuery(params.code);
  return (
    <div className="h-screen">
      <Title level={3}>{concert.data?.payload.data.name}</Title>

      <div className="flex flex-row mt-4 gap-x-3 h-1/2 ">
        <div className="w-3/5">
          <iframe
            className="w-full h-full "
            src={`https://www.youtube.com/embed/${concert.data?.payload.data.link_yt}`}
            title="[Dota 2 Live] Nigma Galaxy vs PSG Quest - GRAND FINAL BO 5 - MENA CQ @AvenueYT"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <Card className="w-2/5">
          <Title level={5}>Concert Name</Title>
          <p>{concert.data?.payload.data.name}</p>
          <Title level={5} className="mt-4">
            Description
          </Title>
          <p>{concert.data?.payload.data.description}</p>
        </Card>
      </div>
    </div>
  );
}
