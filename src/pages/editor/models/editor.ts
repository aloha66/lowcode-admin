import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import deepClone from 'clone';
import type { EditorModelState, PageProps } from '../types';
import {
  combineSchema,
  flattenSchema,
  flattenToData,
  dataToFlatten,
  idToSchema,
} from '../utils/utils';

export interface EditorModelType {
  state: EditorModelState;
  effects: {
    query: Effect;
    onFlattenChange: Effect;
    onItemChange: Effect;
  };
  reducers: {
    // 启用 immer 之后
    setSchema: ImmerReducer<EditorModelState>;
    setInit: ImmerReducer<EditorModelState>;
    setFlatten: ImmerReducer<EditorModelState>;
    setDisplaySchema: ImmerReducer<EditorModelState>;
    setSelected: ImmerReducer<EditorModelState>;
    // onFlattenChange: ImmerReducer<EditorModelState>;
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
    frProps: {
      displayType: 'column',
      column: 1,
    },
    transformTo: () => {},
    selected: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *onFlattenChange({ payload }, { put }) {
      const { newFlatten, changeSource = 'schema' } = payload;
      const newSchema = idToSchema(newFlatten);
      const newData = flattenToData(newFlatten);
      // 判断只有schema变化时才调用，一般需求的用户不需要
      if (changeSource === 'schema') {
        // onSchemaChange(newSchema);
        yield put({ type: 'setFlatten', payload: newSchema });
      }
      // schema 变化大都会触发 data 变化
      // onChange(newData);
    },
    *onItemChange({ payload, ...rest }, { put, select }) {
      const newFlatten = deepClone(
        yield select((state: PageProps) => state.editor.flatten),
      );
      const { key, value, changeSource } = payload;
      newFlatten[key] = value;
      console.log('ssss', newFlatten, value);
      yield put({
        type: 'onFlattenChange',
        payload: { newFlatten, changeSource },
      });
    },
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
    setSelected(state, { payload }) {
      state.selected = payload;
    },
    // onFlattenChange(state, { payload }) {
    //   const { newFlatten, changeSource = 'schema' } = payload;
    //   const newSchema = idToSchema(newFlatten);
    //   const newData = flattenToData(newFlatten);
    //   console.log('newSchema', newSchema, changeSource);
    //   // 判断只有schema变化时才调用，一般需求的用户不需要
    //   if (changeSource === 'schema') {
    //     // onSchemaChange(newSchema);
    //     state.schema = newSchema;
    //   }
    //   // schema 变化大都会触发 data 变化
    //   // onChange(newData);
    // },
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
