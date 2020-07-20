import React from 'react';
import { Menu } from 'antd';

export default function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  );
}
