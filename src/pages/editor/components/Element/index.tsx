import React, { FC } from 'react';
import { useStore, useSelector } from 'umi';
import type { Schema, PageProps, EditorModelState } from '../../types';
import { useDrag } from 'react-dnd';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { addItem } from '../../utils/utils';

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
  text: string;
  name: string;
  schema: Schema;
  icon: unknown;
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
      $id: `#/${name}_${nanoid(6)}`,
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

  const editor = useSelector<PageProps, EditorModelState>(
    (state: PageProps) => state.editor,
  );

  const { dispatch } = useStore();
  const { flatten, selected } = editor;

  const handleElementClick = () => {
    const { newId, newFlatten } = addItem({ selected, name, schema, flatten });
    dispatch?.({ type: 'editor/onFlattenChange', payload: { newFlatten } });
    dispatch?.({ type: 'editor/setSelected', payload: newId });
  };
  return (
    <EleItem className="EleItem" ref={dragRef} onClick={handleElementClick}>
      {children}
    </EleItem>
  );
};

export default Element;
