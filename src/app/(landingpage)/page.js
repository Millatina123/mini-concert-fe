"use client";
import { Layout, Menu, Button, Row, Col, Typography, Space, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { benefitOne, benefitTwo } from "@/components/data";
import { Testimonials } from "@/components/Testimonials";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <Container className="bg-white px-4 mt-4">
      <Hero />
      <SectionTitle preTitle="What is CONVE" title=" Why you must try CONVE">
        Why Try CONVE? Enjoy exclusive online concerts, diverse music genres, high-quality streaming, interactive features, global access, and the comfort of home. Experience music redefined.
      </SectionTitle>

      <Benefits data={benefitOne} />

      <SectionTitle preTitle="Testimonials" title="Here's what our customers said">
        Testimonials is a great way to increase the brand trust and awareness. Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials />

      <Cta />
    </Container>
  );
}
