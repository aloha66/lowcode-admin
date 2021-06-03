import axios from 'axios';
import { notification } from 'antd';

var logoutEvent = new CustomEvent('logout', { detail: { aa: 22 } });

function throwErr(err) {
  return Promise.reject({
    data: err.data,
    request: err.config,
    location: location.href,
  });
}

const service = axios.create({
  timeout: 500000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use((res) => {
  const data = res;
  // test
  // 新规范开始
  if (data.result === 'fail') {
    if (data.code === 400401) {
      // 抛出登出事件 通知父页面登出
      console.log('errorrrrr', data);
      debugger;
      parent.window.dispatchEvent(logoutEvent);
    }
    if (![504001].includes(data.code)) {
      notification.error({
        message: `错误`,
        description: data.message,
      });
    }

    throwErr(res);
    // throw new Error(JSON.stringify(res.data));
    throw res.data;
  }

  if (data.result === 'success') {
    // 200009 查询为空
    if (data.code === 200009) {
      // TODO
    }
  }
  return data;
});

export default service;
