import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import store from "@/redux/store";
import { Provider } from "react-redux";
import Providers from "@/providers";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Conve Apps",
  description: "Online concert ticket booking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/logo_conve.PNG" sizes="any" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#B77BFF",
          },
          components: {
            Typography: {
              margin: 0,
              padding: 0,
            },
          },
        }}
      >
        <body className={inter.className}>
          <Providers>
            <Toaster position="top-right" />
            <Navbar />
            <div>{children}</div>
            <Footer />
            <PopupWidget />
          </Providers>
        </body>
      </ConfigProvider>
    </html>
  );
}
