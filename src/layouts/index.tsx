import { IRouteComponentProps, history } from 'umi';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@sty/GlobalStyles';
import Theme from '@sty/theme';
import zhCN from 'antd/lib/locale/zh_CN';
import { UseRequestProvider } from 'ahooks';
import { ConfigProvider } from 'antd';
import request from '@util/request';

export default function Layout({ children }: IRouteComponentProps) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <UseRequestProvider
        value={{
          requestMethod: (param) => request(param),
        }}
      >
        <ConfigProvider locale={zhCN}> {children}</ConfigProvider>
      </UseRequestProvider>
    </ThemeProvider>
  );
}
