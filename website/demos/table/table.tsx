import * as React from 'react';
import { useState } from 'react';
import { ReactMarkdown } from '../../components/react-markdown-wrap/index';
import { Table } from 'packages/kzui/src';
import { ColumnsProps } from '../../types/table'
import { DemoDisplayCard } from '../../components'
import { code1, code2, code3 } from './constant';
import docContent from '../../docs/table.md';

import './style.less';

const pseudoColumns: Array<ColumnsProps> = [
    {
        title: 'col 1',
        key: 'col 1',
        dataIndex: 'one',
        align: 'center',
        width: '50%',
    },
    {
        title: 'col 2',
        key: 'col 2',
        dataIndex: 'two',
    },
    {
        title: 'col 3',
        key: 'col 3',
        dataIndex: 'three',
    }
];

const example2 = [
  {
      title: 'col 1',
      key: 'col 1',
      dataIndex: 'one',
  },
  {
      title: 'col 2',
      key: 'col 2',
      dataIndex: 'two',
      colSpan: 2,
      render:({ item }) => {
          return item
      }
  },
  {
      title: 'col 3',
      key: 'col 3',
      dataIndex: 'three',
      colSpan: 0,
      render: ({ item, index }) => {
        if (index < 2) {
          return <a>{item}</a>
        }
        return {
          children: <a>{item}</a>,
          props: {
            colSpan: 0,
          }
        }
      }
  }
]

const pseudoDataSource = [
    {
        one: '1',
        two: '1',
        three: '2'
    },
    {
        one: '2',
        two: '2',
        three: '3'
    },
    {
        one: '3',
        two: '3',
        three: '4'
    }
];



const demoList = [
  {
    description: {
      title: '表格',
      content: '带分页的用法。如果不需要分页，就不传 pagination。* 当前表的隔行样式是在样式文件中设置的。'
    },
    code: code1,
    reactCode: () => {
      const [curPage, setCurPage] = useState(1)
      return (
        <Table
            columns={pseudoColumns}
            dataSource={pseudoDataSource}
            className='new-table-demo'
            headerStyle={{ borderTop: '1px solid #ededed', borderBottom: '1px solid #ededed' }}
            bodyStyle={{ borderLeft: '1px solid #ededed', borderRight: '1px solid #ededed' }}
            pagination={{
              totalPage: 2,
              curPage: curPage,
              onPageChange: page => setCurPage(page),
              pageSize: 2,
              position: 'right'
            }}
        />
      );
    }
  },
  {
    description: {
      title: '表格列合并',
      content: '可以通过 column.colSpan 使表头列合并； 另外可以通过 render 返回 children 和 props，并在 props 中设置 colSpan，以此实现body列合并。'
    },
    code: code2,
    reactCode:() => {
      return (
        <Table
            columns={example2}
            dataSource={pseudoDataSource}
            className='new-table-demo'
            bordered
        />
      );
    }
  },
  {
    description: {
      title: '自定义表格',
      content: 'children属性，覆盖原本table组件的内部。'
    },
    code: code3,
    reactCode: () => {
      return (
          <Table className="table-wrap">
              <thead>
                  <tr className="table-header">
                      <th>封面</th>
                      <th>标题</th>
                      <th>更新时间</th>
                  </tr>
              </thead>
              <tbody className="list-tbody">
                  <tr className="post-list-item">
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  <tr className="post-list-item">
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                  </tr>
              </tbody>
          </Table>
      )
    }  
  },
  {
    description: {
      title: '暂无数据',
      content: 'children属性，覆盖原本table组件的内部。'
    },
    code: code3,
    reactCode: () => {
      return (
        <Table columns={pseudoColumns} dataSource={[]} />
      )
    }  
  }
]
const TableDemo:React.FC<{}> = () => {
    return (
      <div>
        {
          demoList.map((demo, index) => (
            <DemoDisplayCard
              description={demo.description}
              code={demo.code}
              key={index}
            >
              {demo.reactCode()}
            </DemoDisplayCard>
          ))
        }
        <ReactMarkdown source={docContent} />
    </div>
    );
};

export { TableDemo };