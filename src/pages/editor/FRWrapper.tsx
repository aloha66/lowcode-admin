/**
 * 基本布局
 * 左侧tab  右侧工作台
 */
import React, { useEffect, useRef, FC, useState, useMemo } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import {
  PieChartOutlined,
  HighlightOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import Header from './components/Header';
import Element from './components/Element';
import Workbench from './components/Workbench';
import { elements } from '../../config/setting';
import useWindowResize from '@hook/useWindowResize';
const { TabPane } = Tabs;

const Wrapper = styled.div`
  padding-top: 78px;
  height: 100%;
  background: #f2f2f2;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ComponentList = styled.div`
  padding: 0 10px;
  height: 100%;
`;

interface LeftLayout {
  collapsed: boolean;
}

const Left = styled.div`
  flex: ${(props: LeftLayout) => (props.collapsed ? '0 0 300px' : '0')};
  width: 50px; // 当flex为0的时候可以控制宽度
  height: 100%;
  margin-right: 10px;
  background-color: #fff;
  transition: all 0.5s ease-in-out 0s;
`;

const EleWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const EleTitle = styled.div`
  padding-left: 12px;
  font-weight: 700;
`;

const LeftColl = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 10px;
  cursor: pointer;
`;

// 构造commonTabRender结构

const COMMON_TABPANE = [
  {
    tab: '基础',
    key: 'base',
    section: [
      {
        title: '基础组件',
        elements,
      },
    ],
  },
  {
    tab: '其他',
    key: 'others',
    section: [
      {
        title: '基础组件',
        elements,
      },
    ],
  },
];

const CpIcon = {
  base: <HighlightOutlined />,
  others: <PieChartOutlined />,
};

type ComponentsType = 'base' | 'others';

interface GenerateHeaderProps {
  key: ComponentsType;
  tab: string;
}

const generateHeader = ({ key, tab }: GenerateHeaderProps) => (
  <div>
    <div>{CpIcon[key]}</div>
    <div>{tab}</div>
  </div>
);

const FRWrapper: FC = () => {
  console.log('FRWrapper render');
  const [collapsed, toggle] = useWindowResize();

  const commonTabRender = useMemo(() => {
    return (
      <>
        {COMMON_TABPANE.map((com, i) => (
          // @ts-expect-error
          <TabPane tab={generateHeader(com)} key={i + 1}>
            {com.section.map((sec, j) => (
              <div key={j}>
                <EleTitle>{sec.title}</EleTitle>
                <EleWrap>
                  {sec.elements.map((ele, k) => (
                    <Element key={ele.name} {...ele}>
                      {ele.text}
                    </Element>
                  ))}
                </EleWrap>
              </div>
            ))}
          </TabPane>
        ))}
      </>
    );
  }, [collapsed]);

  return (
    <Wrapper className="fr-generator-container">
      <Header />
      <Container>
        <Left collapsed={collapsed}>
          <ComponentList>
            <Tabs
              className="editorTabclass"
              // onTabClick={() => setCollapsed(false)}
              defaultActiveKey="1"
            >
              <TabPane tab="通用" key="1">
                <Tabs
                  className="editorTabclass"
                  // onTabClick={() => setCollapsed(false)}
                  defaultActiveKey="1"
                  tabPosition={'left'}
                >
                  {commonTabRender}
                </Tabs>
              </TabPane>
              <TabPane tab="自定义" key="2">
                Content of Tab 2
              </TabPane>

              {/* {tabRender} */}
            </Tabs>
          </ComponentList>
          <LeftColl onClick={toggle}>
            {collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </LeftColl>
        </Left>
        <Workbench />
      </Container>
    </Wrapper>
  );
};

export default FRWrapper;
