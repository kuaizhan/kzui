export const code1 = `
\`\`\`js
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
const [curPage, setCurPage] = useState(1)
return (
  <Table
      columns={pseudoColumns}
      dataSource={pseudoDataSource}
      className='new-table-demo'
      headerStyle={{ borderTop: '1px solid #ededed', borderBottom: '1px solid #ededed' }}
      bodyStyle={{ borderLeft: '1px solid #ededed', borderRight: '1px solid #ededed' }}
      bordered
      pagination={{
        totalPage: 2,
        curPage: curPage,
        onPageChange: page => setCurPage(page),
        pageSize: 2,
        position: 'right'
      }}
  />
);
\`\`\
`

export const code2 = `
\`\`\`js
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
        render:({ item, index }) => {
          if (index < 2) {
            return <a>{item}</a>;
          }
          return {
            children: <a>{item}</a>,
            props: {
              colSpan: 2,
            },
          };
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
return (
    <Table
        columns={example2}
        dataSource={pseudoDataSource}
        className='new-table-demo'
        bordered
    />
);
\`\`\`
`

export const code3 = `
\`\`\`js
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
\`\`\`
`