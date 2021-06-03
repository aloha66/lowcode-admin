/**
 * 组件容器，传入父组件配置
 * 配置到全局状态
 * 外层存放不变的状态
 * 内层存放常变的状态
 */
import React, { FC } from 'react';
import FRWrapper from './FRWrapper';

const Main: FC = () => {
  return <FRWrapper />;
};

export default Main;
