/**
 * 拖动组件
 * 业务入口
 */
import React, { FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import type { PartOfMain } from './types';
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
    // string1: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string2: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string3: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string4: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string5: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string6: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string7: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string8: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string9: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string10: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
    // string11: {
    //   title: '字符串',
    //   type: 'string',
    //   required: true,
    // },
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

  return <Editor />;
  // return <Editor defaultValue={defaultValue} />;
};

export default EditorPage;
