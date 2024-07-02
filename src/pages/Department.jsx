import { useContext, useState } from 'react';
import { Table, Radio } from 'antd';
import AppContext from '../context/AppContext';

export default function Department() {
    const { state, filteredData } = useContext(AppContext);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Image',
            dataIndex: 'Image_1',
            render: (text) => (
                <img src={text} alt="Product" className="circular-image" />
            ),
        },
        {
            title: 'SKU',
            dataIndex: 'SKU',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
        },
        {
            title: 'Title',
            dataIndex: 'Title',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
        },
        {
            title: 'Brand',
            dataIndex: 'brandOrSupplier',
            render: (text, record) => record.brand || record.supplier || 'N/A',
        },
        {
            title: 'Cost Price',
            dataIndex: 'Cost Price',
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
        },
        {
            title: 'Size',
            dataIndex: 'size',
        },
    ];

const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };


    if (state.loading) {
        return (
            <div className="loader">
                <span className="loading-text">
                    <span className="bounce">U</span>
                    <span className="bounce">n</span>
                    <span className="bounce">l</span>
                    <span className="bounce">i</span>
                    <span className="bounce">m</span>
                    <span className="bounce">i</span>
                    <span className="bounce">.</span>
                </span>
            </div>
        );
    }
    if (state.error) {
        return <div className='error'>{state.error}.....</div>;
    }

    return (
        <div className='table-container'>
            <div className='header-text'>
                <h5>Department List</h5>
            </div>
            <div>
                <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                </Radio.Group>
            </div>
            <div>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={filteredData.map((item, index) => ({...item, key: item.SKU }))}
                    pagination={{
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                />
            </div>
        </div>
    );
}
