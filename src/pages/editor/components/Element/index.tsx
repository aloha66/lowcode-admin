import React, {
  useEffect,
  useRef,
  forwardRef,
  FC,
  useState,
  useMemo,
} from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const EleItem = styled.li`
  width: 107px;
  height: 2.2rem;
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
`;

interface ElementProps {
  //   text: string;
}

const Element: FC<ElementProps> = ({ text, name, schema, icon, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'box',
    item: {
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <EleItem className="EleItem" ref={dragRef}>
      {children}
    </EleItem>
  );
};

export default Element;
