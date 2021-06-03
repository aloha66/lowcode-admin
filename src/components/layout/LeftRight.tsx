import { useToggle } from 'ahooks';
import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useResizeObserver } from '../../hooks/useResizeObserver';

const Wrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

interface LeftProps {
  show: boolean;
  width?: number;
  mr?: number;
}

const Left = styled.div`
  background: #fff;
  transition: width 0.3s;
  width: ${(props: LeftProps) => (props.show ? `${props.width ?? 300}px` : 0)};
  margin-right: ${(props: LeftProps) =>
    props.show ? `${props.mr ?? 10}px` : 0};
`;

const Right = styled.div`
  flex: 1;
  z-index: 0; // 防止左侧元素视图层级比右侧高 出现遮挡
  background: #fff;
`;

const Head = styled.div`
  position: relative;
  text-align: center;
  line-height: 40px;
`;

const Arrow = styled.div`
  position: absolute;
  left: 0;
  width: 40px;
  text-align: left;
  padding-left: 10px;
  line-height: inherit;
  cursor: pointer;
`;

interface ClickEvent {
  onClick?: (e: any) => void;
}

const RightArrow: FC<ClickEvent> = (props) => (
  <Arrow onClick={props.onClick}>
    <RightOutlined />
  </Arrow>
);

const LeftArrow: FC<ClickEvent> = (props) => (
  <Arrow onClick={props.onClick}>
    <LeftOutlined />
  </Arrow>
);

interface LeftRightProps {
  left: React.ReactNode;
  right: React.ReactNode;
  title?: string;
  width?: number;
  mr?: number;
}

const LeftRight: FC<LeftRightProps> = ({ left, right, title, width, mr }) => {
  const [state, { toggle }] = useToggle(true);
  const leftRef = useRef(null);

  useResizeObserver(document.documentElement, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    if (width < 768) {
      toggle(false);
    } else {
      toggle(true);
    }
  });

  return (
    <Wrap>
      <Left mr={mr} width={width} show={state}>
        {left}
      </Left>
      <Right>
        <Head>
          {state ? (
            <LeftArrow onClick={() => toggle()} />
          ) : (
            <RightArrow onClick={() => toggle()} />
          )}
          {title || 'title'}
        </Head>
        {right}
      </Right>
    </Wrap>
  );
};

export default LeftRight;
