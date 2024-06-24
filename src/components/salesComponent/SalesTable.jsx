import React, { useState } from "react";
import { Table, Select, Input, InputNumber, Button } from "antd";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const { Option } = Select;

const SalesTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const handleAmountChange = (value, record, monthIndex) => {
    const newData = dataSource.map((item) => {
      if (item.key === record.key) {
        const newAmounts = [...item.amounts];
        newAmounts[monthIndex] = value;
        const newTotal = newAmounts.reduce((acc, curr) => acc + curr, 0);
        return { ...item, amounts: newAmounts, total: newTotal };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleFrequencyChange = (value, record) => {
    const newData = dataSource.map((item) =>
      item.key === record.key ? { ...item, frequency: value } : item
    );
    setDataSource(newData);
  };

  const handleAddRow = () => {
    const newRow = {
      key: Date.now().toString(),
      target: "",
      frequency: "monthly",
      amounts: Array(12).fill(0),
      total: 0,
    };
    setDataSource([...dataSource, newRow]);
  };

  const columns = [
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      fixed: "left",
      width: 150,
      render: (text, record) => (
        <Input
          style={{ width: "100%" }}
          value={record.target}
          onChange={(e) => {
            const newData = dataSource.map((item) =>
              item.key === record.key
                ? { ...item, target: e.target.value }
                : item
            );
            setDataSource(newData);
          }}
        />
      ),
    },
    ...Array.from({ length: 12 }, (_, i) => ({
      title: `${i + 1} Month`,
      dataIndex: `month_${i + 1}`,
      key: `month_${i + 1}`,
      render: (text, record) => (
        <InputNumber
          style={{ width: "100%" }}
          value={record.amounts[i]}
          onChange={(value) => handleAmountChange(value, record, i)}
        />
      ),
    })),
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      fixed: "right",
      width: 170,
      render: (text, record) => (
        <Select
          style={{ width: "100%" }}
          value={record.frequency}
          onChange={(value) => handleFrequencyChange(value, record)}
        >
          <Option value="monthly">Monthly</Option>
          <Option value="quarterly">Quarterly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      fixed: "right",
      render: (text, record) => (
        <InputNumber style={{ width: "100%" }} value={record.total} disabled />
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddRow}
        style={{ marginBottom: 16 }}
      >
        Add Row
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 1500 }} // Adjust the value as per the requirement to enable horizontal scrolling
      />
    </div>
  );
};

export default SalesTable;
