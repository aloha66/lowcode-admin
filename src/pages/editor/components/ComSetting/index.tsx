/**
 * 右侧组件配置
 */
import React, { FC, useMemo, useRef, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { useSelector, useDispatch } from 'umi';
import deepClone from 'clone';
import type { PageProps, EditorModelState } from '../../types';
import { getWidgetName } from '../../mapping';
import { elements, defaultCommonSettings } from '@conf/setting';

const ComSetting: FC = () => {
  const form = useForm();

  const editor = useSelector<PageProps, EditorModelState>(
    (state: PageProps) => state.editor,
  );
  const { selected, flatten, mapping, widgets } = editor;
  const dispatch = useDispatch();
  // 避免切换选中项时 schema 对应出错
  const [ready, setReady] = useState({});

  const settingSchema = useMemo(() => {
    const item = flatten[selected];
    if (!item || selected === '#') return;
    setReady(false);
    const widgetName = getWidgetName(item.schema, mapping);
    const element = elements.find((e) => e.widget === widgetName) || {
      setting: {},
    }; // 有可能会没有找到
    const properties = { ...defaultCommonSettings, ...element.setting };
    form.setValues(item.schema);
    setTimeout(() => {
      setReady(true);
      onDataChange(form.getValues());
    }, 0);
    return {
      type: 'object',
      displayType: 'column',
      properties,
    };
  }, [selected, flatten]);

  const onDataChange = (value) => {
    console.log('value', value);
    try {
      if (!ready) return;
      const item = flatten[selected];
      if (item && item.schema) {
        const payload = {
          key: selected,
          value: {
            ...item,
            schema: value,
          },
        };
        // dispatch?.({ type: 'editor/onItemChange', payload });
      }
    } catch (error) {
      console.error(error, 'catch');
    }
  };

  return (
    <FormRender
      form={form}
      schema={settingSchema}
      widgets={{ ...widgets }}
      watch={{
        '#': (v) => onDataChange(v),
      }}
    />
  );
};

export default ComSetting;
