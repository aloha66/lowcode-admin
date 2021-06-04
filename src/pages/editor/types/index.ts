import { ConnectProps, Loading, connect } from 'umi';

interface MainProps {
  defaultValue: object;
  widgets: object;
  mapping: object;
  transformer: {
    fromFormRender: unknown;
    toFormRender: unknown;
    from: unknown;
    to: unknown;
  };
}

export type PartOfMain = Partial<MainProps>;

/**
 * @param frProps orm-render 的全局 props 等
 */
export interface EditorModelState {
  schema: {};
  preview: boolean;
  widgets: {};
  mapping: {};
  flatten: {};
  formData: {};
  displaySchema: {};
  frProps: {};
  transformTo: any;
}

export interface PageProps extends ConnectProps {
  editor: EditorModelState;
  loading: boolean;
}
