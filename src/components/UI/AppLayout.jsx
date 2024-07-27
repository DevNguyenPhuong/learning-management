import { Avatar, Layout, Menu, Switch, theme } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

function AppLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const layoutConfig = {
    true: "ml-[80px] transition-ml duration-300 ",
    false: "ml-[200px] transition-ml duration-300 ",
  };

  return (
    <Layout hasSider>
      <Sider
        className="!overflow-auto !h-screen !fixed !left-0 !top-0  !bottom-0 z-20"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className=" h-16 flex items-center justify-center font-bold text-slate-300"></div>
        <Menu
          className="[&_svg]:text-2xl font-bold"
          items={[
            {
              label: "Home",
              key: "/dashboard",
              icon: <HiOutlineHome className="!text-2xl" />,
            },
            {
              label: "Schedule",
              key: "/schedule",
              icon: <HiOutlineCalendar className="!text-2xl" />,
            },
            {
              label: "Note",
              key: "/notes",
              icon: <HiOutlineBookOpen className="!text-2xl" />,
            },
            {
              label: "User",
              key: "/user",
              icon: <HiOutlineUser className="!text-2xl" />,
            },
          ]}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={"/dashboard"}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>

      <Layout className={`${layoutConfig[collapsed]}  `}>
        <Header className="fixed w-full top-0 left-0 z-10 flex items-center font-bold ">
          <Menu
            className="flex-1 min-w-0  justify-end"
            theme="dark"
            mode="horizontal"
            selectedKeys={["2"]}
            onClick={({ key }) => {
              // if (key === "/logout") logout();
              // if (key === "/") navigate("/");
            }}
            items={[
              {
                label: (
                  <div className="flex justify-center items-center gap-3">
                    <Avatar
                      className="bg-zinc-300"
                      size={32}
                      icon={<FaUser />}
                    />
                    <span>Anonymous</span>
                  </div>
                ),
                key: "avatar",
              },
              {
                key: "/",
                label: "Ngân hàng máu",
                icon: <FaHome />,
              },
              {
                label: "Đăng xuất",
                key: "/logout",
                icon: <FaSignOutAlt />,
              },
            ]}
          />
        </Header>

        <Content className="m-6 mx-4">
          <div
            className="mt-16 p-6 text-center b rounded-lg min-h-screen"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
