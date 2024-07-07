"use client";
import store from "@/redux/app/store";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28AEE7",
        },
      }}
    >
      <SessionProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>;
      </SessionProvider>
    </ConfigProvider>
  );
};

export default Provider;
