import { Effect, ImmerReducer, Subscription } from 'umi';

/**
 * 全局状态
 * @param frProps form-render 的全局props
 */
export interface EditorModelState {
  preview?: boolean;
  schema?: any;
  flatten: {
    [key: string]: {
      schema: {
        type: 'object' | 'array' | (string & {});
        enum: unknown;
        width: number;
        widget: string;
        title: string;
      };
      children: object[];
    };
  };
  displaySchema: any;
  selected: undefined; // 被选中的$id, 如果object/array的内部，以首字母0标识
}

export interface IndexModelType {
  state: EditorModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    displayType: ImmerReducer<EditorModelState>;
    setSchema: ImmerReducer<EditorModelState>;
    setFormData: ImmerReducer<EditorModelState>;
    setFlatten: ImmerReducer<EditorModelState>;
    setSchemaAndFormData: ImmerReducer<EditorModelState>;
    setInitProps: ImmerReducer<EditorModelState>;
  };
  subscriptions: { displayType: Subscription };
}

const DEFAULT_SCHEMA = {
  schema: {
    type: 'object',
    properties: {},
  },
  uiSchema: {},
  formData: {},
};

const IndexModel: IndexModelType = {
  state: {
    formData: {},
    frProps: {
      displayType: 'row',
    }, // form-render 的全局props等
    hovering: undefined, // 目前没有用到
    preview: false, // preview = false 是编辑模式
    schema: {},
    flatten: {},
    displaySchema: {},
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
    displayType(state) {
      state.frProps.showDescIcon = state.frProps.displayType === 'row';
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setSchema(state, action) {
      state.schema = action.payload;
    },
    setFlatten(state, action) {
      // state.flatten = action.payload;
      console.log('setFlatten', state);
    },
    setInitProps(state, action) {
      state.widgets = action.payload.widgets;
      state.mapping = action.payload.mapping;
    },
    setSchemaAndFormData(state, action) {
      state.schema = action.payload.schema;
      state.formData = action.payload.formData;
      // 获取一层结构
      let _schema = {};
      if (state.schema) {
        _schema = combineSchema(state.schema.schema, state.schema.uiSchema); // TODO: 要不要判断是否都是object
      }
      const flatten = flattenSchema(_schema);
      const flattenWithData = dataToFlatten(flatten, state.formData);
      state.flatten = flattenWithData;
      // 获取Schema
      let displaySchema = {};
      let displaySchemaString = '';
      try {
        const _schema = {
          ...idToSchema(flattenWithData, '#', true),
          ...state.frProps,
        };
        state.displaySchema = action.transformTo(_schema);
        // displaySchemaString = JSON.stringify(displaySchema, null, 2);
      } catch (error) {}
    },
  },
  subscriptions: {
    displayType({ dispatch }) {
      dispatch({
        type: 'displayType',
      });
    },
  },
};

export default IndexModel;
