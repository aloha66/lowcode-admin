/**
 * 拖动组件
 * 业务入口
 */
import React, { FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';

const Editor: FC<ReactNode> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main {...props} />
    </DndProvider>
  );
};

const EditorPage = () => {
  // 模拟一个独立组件
  return <Editor />;
};

export default EditorPage;
