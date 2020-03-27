import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Export from 'Utils/Export';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a style={{ marginRight: 16 }}>Invite {record.name}</a>
                <a>Delete</a>
            </span>
        ),
    },
];

const dataSource = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default class Download extends Component {
    constructor(props) {
        super(props);

    }

    _handleDownload(){
        Export.exportXlsx(columns, dataSource);
    }

    render() {
        return <div>
            <h1>Hello React</h1>
            <h2>Download</h2>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    showTotal: () => {
                        return (
                            <div>
                                <Button onClick={this._handleDownload} type="primary" shape="circle" icon={<DownloadOutlined />}/>
                            </div>
                        )
                    }
                }}
            />

        </div>
    }
}
