"use client";

import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import type { MenuProps } from "antd";
import {
  AlignCenterOutlined,
  TeamOutlined,
  FileTextOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteLocalStorage, getLocalStorage } from "@/const";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/dashboard">Dashboard</Link>,
    "/dashboard",
    <AlignCenterOutlined />
  ),
  getItem(<Link href="/users">Users</Link>, "/users", <TeamOutlined />),
  getItem(
    <Link href="/categories">Categories</Link>,
    "/categories",
    <ProfileOutlined />
  ),
  getItem(
    <Link href="/products">Products</Link>,
    "/products",
    <FileTextOutlined />
  ),
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/dashboard";

  const [collapsed, setCollapsed] = useState();

  const token = getLocalStorage();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });

  const logOutAdmin = () => {
    const check = window.confirm("Do you want to log out of this account?");
    if (check) {
      deleteLocalStorage();
      router.push("/login");
    }
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value: any) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={[pathname]} items={items} />
          <button
            onClick={logOutAdmin}
            className="w-full text-white py-1 hover:bg-white hover:text-gray-700 my-2"
          >
            LogOut
          </button>
        </Sider>
        <div
          style={{ background: `url(/header.png)`, backgroundSize: "cover" }}
          className="h-screen overflow-y-scroll w-full"
        >
          <Layout style={{ background: "transparent" }}>{children}</Layout>
        </div>
      </Layout>
    </div>
  );
}
