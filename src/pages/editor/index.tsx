/**
 * 拖动组件
 * 业务入口
 */
import React, { FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import type { PartOfMain, PageProps, EditorModelState } from './types';

const Editor: FC<PartOfMain> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main {...props} />
    </DndProvider>
  );
};

const defaultValue = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      required: true,
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['选项1', '选项2', '选项3'],
      widget: 'radio',
    },
  },
};

const EditorPage = () => {
  // 模拟一个独立组件
  return <Editor defaultValue={defaultValue} />;
};

export default EditorPage;
