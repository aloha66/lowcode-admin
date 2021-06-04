import React, { FC, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { useStore } from 'umi';
import { flattenToData, dataToFlatten } from './utils/utils';

const PreviewFR = () => {
  const form = useForm();
  const { editor } = useStore().getState();
  const { flatten, widgets, mapping, displaySchema } = editor;
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

export default PreviewFR;
