import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, List, Avatar, message } from "antd";
import {
  UserOutlined,
  BankOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Line } from "@ant-design/charts";
import axios from "axios";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [salesData, setSalesData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  });
  const [data, setData] = useState({
    users: 0,
    companies: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get(
          "http://iglo-cms-api.xyz/api/user-manage"
        );
        const data = response.data;

        // Get the last 3 users from the data array
        const recentUsers = data.slice(-3);
        setRecentUsers(recentUsers); // Set the state with recent users
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    const fetchRecentProducts = async () => {
      try {
        const response = await axios.get("http://iglo-cms-api.xyz/api/product");
        const data = response.data;

        // Get the last 3 products from the data array
        const recentProducts = data.slice(-3);
        setRecentProducts(recentProducts); // Set the state with recent products
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    };

    const fetchTotalData = async () => {
      try {
        const usersResponse = await axios.get(
          "https://iglo-cms-api.xyz/api/user-manage"
        );
        const companiesResponse = await axios.get(
          "https://iglo-cms-api.xyz/api/product"
        );
        const productsResponse = await axios.get(
          "https://iglo-cms-api.xyz/api/product"
        );

        setData({
          users: usersResponse.data.length,
          companies: companiesResponse.data.length,
          products: productsResponse.data.length,
        });
      } catch (error) {
        console.error("Failed fetching total data: ", error);
        message.error("Error fetching total!");
      }
    };

    fetchTotalData();
    fetchRecentUsers();
    fetchRecentProducts();
  }, []);

  return (
    <div className="p-8">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Users"
            bordered={false}
            hoverable
            onClick={() => navigate("/usermanage")}
          >
            <Statistic
              value={data.users}
              prefix={<UserOutlined className="mr-2" />}
              suffix="Users"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Companies"
            bordered={false}
            hoverable
            onClick={() => navigate("/companymanage")}
          >
            <Statistic
              value={data.companies}
              prefix={<BankOutlined className="mr-2" />}
              suffix="Companies"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Products"
            bordered={false}
            hoverable
            onClick={() => navigate("/productmanage")}
          >
            <Statistic
              value={data.products}
              prefix={<ShoppingOutlined className="mr-2" />}
              suffix="Products"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Sales Data" bordered={false}>
            <Line data={salesData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Users" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentUsers}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.nama}
                    description={user.email}
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card
            title="Recent Products"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentProducts}
              renderItem={(product) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`http://iglo-cms-api.xyz/${product.image}`}
                      />
                    }
                    title={product.nama}
                    description={product.deskripsi}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponent;
