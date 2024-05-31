"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AntdRegistry>{children}</AntdRegistry>
    </Provider>
  );
}
