import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import LeftRight from '@com/layout/LeftRight';
import FieldList from '../FieldList';
import FR from '../FR';
// import { getWidgetName } from '../../../../utils/mapping';
const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const Workbench: FC = () => {
  // TODO Right Preview

  return <LeftRight width={240} left={<FieldList />} mr={1} right={<FR />} />;
};

export default Workbench;
