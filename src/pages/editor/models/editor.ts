import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import type { EditorModelState } from '../types';
import {
  combineSchema,
  flattenSchema,
  dataToFlatten,
  idToSchema,
} from '../utils/utils';

export interface EditorModelType {
  state: EditorModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    // 启用 immer 之后
    setSchema: ImmerReducer<EditorModelState>;
    setInit: ImmerReducer<EditorModelState>;
    setFlatten: ImmerReducer<EditorModelState>;
    setDisplaySchema: ImmerReducer<EditorModelState>;
  };
  subscriptions: { setup: Subscription };
}

const EditorModel: EditorModelType = {
  state: {
    preview: false, // preview = false 是编辑模式
    schema: {},
    widgets: {},
    mapping: {},
    flatten: {},
    formData: {},
    displaySchema: {},
    frProps: {},
    transformTo: () => {},
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    // 启用 immer 之后
    setSchema(state, { payload }) {
      state.schema = payload;
    },
    setFlatten(state, { payload: schema }) {
      state.schema = schema;
      let _schema = {};
      if (schema) {
        _schema = combineSchema(schema); // TODO: 要不要判断是否都是object
      }
      const flatten = flattenSchema(_schema);
      const flattenWithData = dataToFlatten(flatten, state.formData);

      state.flatten = flattenWithData;
    },
    setDisplaySchema(state) {
      try {
        const _schema = {
          ...idToSchema(state.flatten, '#', true),
          ...state.frProps,
        };
        const displaySchema = state.transformTo(_schema);
        state.displaySchema = displaySchema;
      } catch (error) {}
    },
    setInit(state, { payload: { widgets, mapping, transformTo } }) {
      state.widgets = widgets;
      state.mapping = mapping;
      state.transformTo = transformTo;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default EditorModel;
