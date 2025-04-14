import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <AntApp>
        <Component {...pageProps} />
      </AntApp>
    </ConfigProvider>
  );
}
