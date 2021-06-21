import { ConnectProps, Loading, connect } from 'umi';

//FormRender的porps
interface FormRender {
  column: number;
  displayType: 'row' | 'column' | 'inline';
  labelWidth?: number | string;
  showValidate?: boolean;
}

type Widget = 'switch' | 'widget' | (string & {});
type WidgetObj = {
  [key in Widget]?: object;
};

interface MainProps {
  defaultValue: object;
  widgets: WidgetObj;
  mapping: object;
  settings: {};
  transformer: {
    fromFormRender: unknown;
    toFormRender: unknown;
    from: unknown;
    to: unknown;
  };
}

export type PartOfMain = Partial<MainProps>;

export type Schema = Partial<{
  type: 'object' | 'array' | 'boolean';
  enum?: unknown;
  width: number | string;
  title: string;
  description: string;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  default: unknown;
  format: unknown;
  props: {};
  widget: 'switch' | 'widget' | (string & {});
}>;

interface Flatten {
  [key: string]: FlattenItem;
}

export interface FlattenItem {
  schema: Schema;
  children: string[];
  data?: unknown;
}

/**
 * @param frProps orm-render 的全局 props 等
 */
export interface EditorModelState {
  schema: Schema;
  preview: boolean;
  widgets: WidgetObj;
  mapping: {};
  flatten: Flatten;
  formData: {};
  displaySchema: {};
  frProps: FormRender;
  transformTo: any;
  selected: string;
  hovering?: unknown;
  settings?: {};
}

export interface PageProps extends ConnectProps {
  editor: EditorModelState;
  loading: boolean;
}
