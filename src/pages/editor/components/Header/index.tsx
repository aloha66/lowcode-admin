import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Button, Menu, Dropdown, Space } from 'antd';

const Head = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 76px;
  padding: 10px 30px;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const BackBtn = styled(ArrowLeftOutlined)`
  display: inline-block;
  padding: 12px 10px;
  margin-right: 22px;
  cursor: pointer;
`;

const Logo = styled.div`
  border: 1px dashed #000;
  width: 100px;
  height: 30px;
  margin-right: 10px;
`;

const Header: FC = (props) => {
  const history = useHistory();

  const [preview, setPreview] = useState(false);

  const handleMenuClick = (e: any) => {
    console.log('e', e);
  };
  const save = () => {
    console.log('save');
  };
  const toBack = () => {
    history.push('/');
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">保存为模板</Menu.Item>
    </Menu>
  );

  return (
    <Head>
      <BackBtn onClick={toBack} />
      <Logo />
      <Space>
        <Dropdown.Button onClick={save} overlay={menu}>
          保存
        </Dropdown.Button>

        <Button onClick={() => setPreview((prev) => !prev)}>
          {preview ? '预览' : '编辑'}
        </Button>
        <Button>清空</Button>
      </Space>
    </Head>
  );
};

export default Header;
