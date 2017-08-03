import React, {PropTypes} from 'react';
import {
  Table as AntTable,
  Menu,
  Dropdown,
  Icon,
  Tooltip
} from 'antd';
import Switch from 'components/switch'

import styles from './index.less';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.mountProps(props);
  }

  componentWillReceiveProps(props) {
    this.mountProps(props);
  }

  mountProps(props) {
    const {
      header,
      action,
      headerWidth,
      currentPage,
      data,
    } = props;
     this.state = {
      currentPage,
    }
    this.makeColumns(header, action, headerWidth, data);
  }

  makeColumns(headers, action, headerWidth, data) {
    this.columns = this.props.noIndex ? [] : [{
      dataIndex: 'rowIndex',
      title: '序号',
      width: 100,
      fixed: this.props.rowIndexFixed,
    }];

    for (const header of headers) {
      this.columns.push({
        ...header,
      });
    }
    if (action) {
      const maxActionCount = Math.max(...(data.map(action).map(i => (i ? i.length : 0))));  // action的数量
      this.columns.push({
        key: 'x',
        title: '操作',
        width: this.props.scroll ? 130 : maxActionCount * 50 + 30,
        fixed: this.props.fixed,
        render: (row) => {
          const actions = action(row);
          if (!actions) {
            return <div/>;
          }
          const buttons = actions.map(({color, name, key, icon, hidden, children}) => {
            console.log(1);
            return (<Tooltip title={name}><a
              key={key}
              onClick={(e) => {
                e.preventDefault();
                if ('onCtrlClick' in this.props) {
                  this.props.onCtrlClick(key, row);
                }
              }}
              style={{
                color,
                marginRight: 12,
                display: hidden ? 'none' : 'inline-block',
                fontSize: 14,
              }}
            ><Icon type={icon}/></a></Tooltip>)
          });
          return (<div>
            {buttons}
            <Switch />
          </div>);
        },
      });
    }
  }

  onPageChangeHandler = (currentPage) => {
    this.setState({
      currentPage,
    });
    if ('onChange' in this.props) {
      this.props.onChange(currentPage);
    }
  }

  render() {
    return (
      <div className="myy-table">

        <AntTable
          rowSelection={this.props.rowSelection}
          scroll={this.props.scroll}
          dataSource={this.props.data.map((row, i) => ({...row, rowIndex: i + 1, key: i + 1}))}
          columns={this.columns}
          rowClassName={this.props.getRowClassName}
          loading={this.props.loading}
          pagination={this.props.pagination !== false ? {
            total: this.props.total,
            pageSize: this.props.pageSize,
            current: this.state.currentPage,
            onChange: this.onPageChangeHandler,
            showTotal(total, range) {
              return <span className={styles.pageTotal}>共<span className={styles.count}>{total}</span>条</span>;
            },
          } : false}
          footer={this.props.footer}
        />
      </div>
    );
  }
}
Table.PropTypes = {
  scroll: PropTypes.object,
  fixed: PropTypes.string,
  pageSize: PropTypes.number,
  getRowClassName: PropTypes.func
}
Table.defaultProps = {
  pageSize: 20,
}
