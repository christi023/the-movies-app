import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import MenuIcon from '@material-ui/icons/Menu';

import '../NavBar/Sections/NavBar.css';

// image
const Logo = require('../../assets/images/Logo.png');

export default function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu">
      <div className="menu__logo">
        <a href="/">
          <img src={Logo} alt="Logo" style={{ width: '100%', marginTop: '-5px' }} />
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>

        <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
          <MenuIcon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}
