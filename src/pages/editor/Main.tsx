/**
 * 组件容器，传入父组件配置
 * 配置到全局状态
 * 外层存放不变的状态
 * 内层存放常变的状态
 */
import React, { FC, useEffect } from 'react';
import FRWrapper from './FRWrapper';
import { Loading, connect } from 'umi';
import {
  // @ts-expect-error
  widgets as defaultWidgets,
  // @ts-expect-error
  mapping as defaultMapping,
} from 'form-render';
import type { PartOfMain, PageProps, EditorModelState } from './types';
import { fromFormRender, toFormRender } from './transformer/form-render';

type MainProps = PartOfMain & PageProps;

const DEFAULT_SCHEMA = {
  type: 'object',
  properties: {},
};

const Main: FC<MainProps> = (props) => {
  const {
    defaultValue,
    widgets = {},
    mapping = {},
    transformer,
    editor,
    dispatch,
  } = props;

  let transformFrom = fromFormRender;
  let transformTo = toFormRender;

  if (transformer) {
    if (typeof transformer.from === 'function') {
      // @ts-expect-error
      transformFrom = transformer.from;
    }
    if (typeof transformer.to === 'function') {
      // @ts-expect-error
      transformTo = transformer.to;
    }
  }
  console.log('main render');

  useEffect(() => {
    const _mapping = { ...defaultMapping, ...mapping };
    const _widgets = { ...defaultWidgets, ...widgets };

    dispatch?.({
      type: 'editor/setInit',
      payload: { mapping: _mapping, widgets: _widgets, transformTo },
    });
  }, []);
  useEffect(() => {
    // 可能需要对defaultValue进行转换 transformFrom
    const schema = defaultValue ? defaultValue : DEFAULT_SCHEMA;
    dispatch?.({ type: 'editor/setFlatten', payload: schema });
    dispatch?.({ type: 'editor/setDisplaySchema' });
  }, [defaultValue]);

  return <FRWrapper />;
};

export default connect(
  ({ editor, loading }: { editor: EditorModelState; loading: Loading }) => ({
    editor,
    loading: loading.models.index,
  }),
)(Main);

// export default Main;
