import React, { FC, ReactNode, useRef, useState } from 'react';
import { Card, Menu, Dropdown, Popconfirm, Button } from 'antd';
import styled from 'styled-components';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import { useRequest } from 'ahooks';
import { useDrag } from 'react-dnd';
import { apiTest } from '@conf/schema';

const Desp = styled.a`
  font-size: 12px;
`;

const EditIcon = styled(EditOutlined)`
  cursor: pointer;
`;

const FieldItem = styled.li`
  .editIcon {
    display: none;
  }
  &:hover .editIcon {
    display: inline-block;
  }
`;

const menu = (
  <Menu>
    <Menu.ItemGroup title="Group title">
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);

const tabList = [
  {
    key: 'field',
    tab: '字段',
  },
  {
    key: 'test',
    tab: 'api测试',
  },
];

interface ContentList {
  field: ReactNode;
  test: ReactNode;
}

const Field: FC = (props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'box',
    item: {
      $id: 1,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <FieldItem ref={dragRef}>
      aaa
      <a className="editIcon">
        <EditIcon title="编辑" />
        编辑
      </a>
    </FieldItem>
  );
};

const FieldArr = () => {
  return (
    <ul>
      {[1, 2, 3, 4].map((item, i) => (
        <Field key={i} />
      ))}
    </ul>
  );
};

interface GetRequestConfig {
  method: 'get' | 'post';
  params: unknown;
  payload: unknown;
  data: unknown;
  baseUrl: string;
  proxyPass: string;
  url: string;
}

function getRequestConfig(config: GetRequestConfig) {
  const _conf = { ...config };
  _conf.method === 'get'
    ? (_conf.params = _conf.payload)
    : (_conf.data = _conf.payload);

  const { baseUrl = '', proxyPass = '', url } = _conf;
  _conf.url = baseUrl + proxyPass + url;
  delete _conf.payload;
  return _conf;
}

const TestDemo = () => {
  const form = useForm();

  const { data, error, loading, run } = useRequest(getRequestConfig, {
    manual: true,
  });

  //   @ts-ignore
  const onFinish = (formData, errors) => {
    if (errors.length > 0) {
      return;
    }
    console.log('formData', formData);
    const payload = getRequestConfig(formData);
    run(payload);
  };
  return (
    <>
      <FormRender
        form={form}
        schema={apiTest}
        onFinish={onFinish}
        //   watch={{
        //     '#': v => onDataChange(v),
        //   }}
      />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </>
  );
};
const contentList: ContentList = {
  field: <FieldArr />,
  test: <TestDemo />,
};

const FieldList: FC = () => {
  const [active, setActive] = useState('field');

  const gotoFieldDetail = () => {
    console.log(11111111111);
  };

  return (
    <Card
      size="small"
      bordered={false}
      title={
        <>
          <div>字段列表</div>
          <Popconfirm
            title="是否跳转?"
            onConfirm={gotoFieldDetail}
            okText="Yes"
            cancelText="No"
          >
            <Desp>跳转到字段页面</Desp>
          </Popconfirm>
        </>
      }
      tabList={tabList}
      tabProps={{ size: 'small' }}
      onTabChange={setActive}
      extra={
        <Dropdown overlay={menu} placement="bottomCenter">
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <PlusOutlined />
          </a>
        </Dropdown>
      }
    >
      <div>
        {
          //   @ts-ignore
          contentList[active]
        }
      </div>
    </Card>
  );
};

export default FieldList;
