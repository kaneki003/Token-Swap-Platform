import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Token from "./components/Token";
import Pools from "./components/Pools";
import Swap from "./components/Swap";

const { Content, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("ERC20 Tokens", "1", <PieChartOutlined />),
  getItem("Liquidity Pools", "2", <DesktopOutlined />),
  getItem("Swap Tokens", "3", <FileOutlined />),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("ERC20 Tokens");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Handle menu item clicks to update the selected component
  const handleMenuItemClick = (item) => {
    switch (item.key) {
      case "1":
        setSelectedComponent("ERC20 Tokens");
        break;
      case "2":
        setSelectedComponent("Liquidity Pools");
        break;
      case "3":
        setSelectedComponent("Swap Tokens");
        break;
      default:
        break;
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "hidden", // Ensure no scrolling in sidebar
          position: "fixed", // Fix the sidebar position
          height: "100vh", // Set full viewport height
          left: 0, // Stick to the left side of the screen
          top: 0,
          zIndex: 10, // Ensure it's above other elements
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick} // Correct onClick usage
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? "80px" : "200px" }}>
        {" "}
        {/* Adjust content margin based on sidebar */}
        <Content
          style={{
            margin: "2px", // Slim margin
            // Inner padding for the content
            borderRadius: "8px", // Rounded edges
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Subtle shadow
            border: "1px solid #333", // Border to define edges
            color: "#ffffff", // Text color for dark mode
            overflowY: "auto", // Allow vertical scrolling in content
            maxHeight: "100vh", // Ensure content takes full viewport height
          }}
        >
          {selectedComponent === "ERC20 Tokens" && <Token />}
          {selectedComponent === "Liquidity Pools" && <Pools />}
          {selectedComponent === "Swap Tokens" && <Swap />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
