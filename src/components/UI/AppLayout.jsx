import { Avatar, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Assistant from "../Assistant/Assistant";
import { useLogout } from "../Auth/useLogout";
const { Header, Content, Sider } = Layout;

function AppLayout() {
  const { mode, full_name } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useLogout();

  const {
    token: { colorBgContainer, headerBg },
  } = theme.useToken();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const layoutConfig = {
    true: "ml-[80px] transition-ml duration-300 ",
    false: "ml-[200px] transition-ml duration-300 ",
  };

  return (
    <Layout hasSider>
      <Sider
        theme={mode === "light" ? "dark" : "light"}
        className="!overflow-auto !h-screen !fixed !left-0 !top-0  !bottom-0 z-20"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className=" h-16 flex items-center justify-center font-bold text-slate-300"></div>
        <Menu
          className="font-bold"
          items={[
            {
              label: "Home",
              key: "/dashboard",
              icon: <HiOutlineHome />,
            },
            {
              label: "Schedule",
              key: "/schedules",
              icon: <HiOutlineCalendar />,
            },

            {
              label: "Note",
              key: "/notes",
              icon: <HiOutlineBookOpen />,
            },
            {
              label: "User",
              key: "/user",
              icon: <HiOutlineUser />,
            },
          ]}
          theme={mode === "light" ? "dark" : "light"}
          mode="inline"
          selectedKeys={selectedKey}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>

      <Layout className={`${layoutConfig[collapsed]}  `}>
        <Header
          style={{
            background: mode === "light" ? headerBg : colorBgContainer,
          }}
          className="fixed w-full top-0 left-0 z-10 flex items-center font-bold "
        >
          <p className="justify-self-end">Hê</p>
          <Menu
            theme={mode === "light" ? "dark" : "light"}
            className="flex-1 min-w-0  justify-end"
            mode="horizontal"
            selectedKeys={["2"]}
            onClick={({ key }) => {
              if (key === "/logout") logout();
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
                    <span>{full_name || "anonymous"}</span>
                  </div>
                ),
                key: "avatar",
              },
              {
                label: "Log out",
                key: "/logout",
                icon: <FaSignOutAlt />,
              },
            ]}
          />
        </Header>

        <Content className="m-6 mt-20 lg:mt-16 mx-4 ">
          <div
            className=" lg:mt-4 lg:p-6  b rounded-lg min-h-[90vh]"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>

          <Assistant />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
