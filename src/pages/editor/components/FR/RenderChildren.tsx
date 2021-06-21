import React, { FC } from 'react';
import FR from './index';

const RenderChildren: FC<{ children: string[]; preview?: boolean }> = ({
  children = [],
  preview,
}) => {
  return (
    <>
      {children?.map((child, i) => {
        const FRProps = {
          id: child,
          preview,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
