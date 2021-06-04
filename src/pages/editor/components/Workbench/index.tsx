/**
 * 工作台包括
 * 左侧字段列表
 * 右侧拖曳区域（预览区域）
 * 右侧侧边栏
 */
import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
import FormRender, { useForm } from 'form-render';
import { defaultGlobalSettings, apiTest } from '@conf/schema';
import LeftRight from '@com/layout/LeftRight';
import FieldList from '../FieldList';
import FR from '../FR';
import PreviewFR from '../../PreviewFR';
// import { getWidgetName } from '../../../../utils/mapping';

const { TabPane } = Tabs;

const Wrap = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  padding: 0 8px;
  /* background: #f2f2f2; */
`;

const DndContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background: #fff;
  margin-right: ${(props: { show: boolean }) => (props.show ? `304px` : 0)};
  transition: all 0.5s ease-in-out 0s;
`;

const RightBtn = styled.div`
  position: absolute;
  right: ${(props: { show: boolean }) => (props.show ? `304px` : 0)};
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 80px;
  background: #fff;
  box-shadow: -2px 0 4px 0 rgb(0 0 0 / 10%);
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
`;

const RightWrap = styled.div`
  position: fixed;
  right: 0;
  overflow: auto;
  transform: ${(props: { show: boolean }) =>
    props.show
      ? 'unset'
      : `translate(100%, 0px)`}; // translate(100%可以把多余的padding隐藏
  width: 304px;
  /* width: ${(props: { show: boolean }) => (props.show ? `304px` : 0)}; */
  padding: 10px;
  background: #fff;
  height: 100%;
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out 0s;
`;

const Right = ({ show, toggle }: { show: boolean; toggle: () => void }) => {
  const form = useForm();

  // const [showItemSettings, setShowItemSettings] = useState(1);

  const onFinish = () => {};
  return (
    <div>
      <RightWrap show={show}>
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          {/* {showItemSettings && (
            <TabPane tab="组件配置" key="1">
              <ItemSettings />
            </TabPane>
          )} */}
          <TabPane tab="表单配置" key={'1'}>
            <FormRender
              form={form}
              schema={defaultGlobalSettings}
              onFinish={onFinish}
              //   watch={{
              //     '#': v => onDataChange(v),
              //   }}
            />
          </TabPane>
        </Tabs>
      </RightWrap>
      <RightBtn show={show} onClick={() => toggle()}>
        {show ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </RightBtn>
    </div>
  );
};

const Workbench: FC = () => {
  console.log('Workbench render');
  const [state, { toggle }] = useToggle(true);
  return (
    <LeftRight
      width={240}
      left={<FieldList />}
      mr={1}
      right={
        <Wrap>
          <DndContainer show={state}>
            <PreviewFR />
          </DndContainer>

          {/* <FR /> */}
        </Wrap>
      }
      aside={<Right show={state} toggle={toggle} />}
    />
  );
};

export default Workbench;
