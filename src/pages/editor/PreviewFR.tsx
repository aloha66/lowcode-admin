import React, { FC, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { Loading, connect } from 'umi';
import type { PartOfMain, PageProps, EditorModelState } from './types';
import { flattenToData, dataToFlatten } from './utils/utils';

const PreviewFR: FC<PageProps> = (props) => {
  const form = useForm();
  const { flatten, widgets, mapping, displaySchema } = props.editor;
  console.log('displaySchema', displaySchema);

  useEffect(() => {
    form.setValues(flattenToData(flatten));
  }, []);

  return (
    <FormRender
      schema={displaySchema}
      form={form}
      widgets={widgets}
      mapping={mapping}
      //   watch={{
      //     '#': (formData) => {
      //       onFlattenChange(dataToFlatten(flatten, formData), 'data');
      //     },
      //   }}
    />
  );
};

export default connect(
  ({ editor, loading }: { editor: EditorModelState; loading: Loading }) => ({
    editor,
    loading: loading.models.index,
  }),
)(PreviewFR);
