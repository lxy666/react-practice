import React from 'react';
import { Switch, Layout } from 'antd'

import './index.less'


export default class Container extends React.Component {
  state = {
    theme: 'dark',
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  render() {
    return (
          <a className="switch">
            <Switch
              checked={this.state.theme === 'dark'}
              onChange={this.changeTheme}
              checkedChildren="Open"
              unCheckedChildren="Close"
            />
          </a>

    );
  }
}