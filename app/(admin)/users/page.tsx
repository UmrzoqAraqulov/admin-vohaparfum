"use client";

import { useEffect, useState,Fragment } from "react";

import { Table, Button, Modal, Form, Input, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";

import { User } from "@/types";
import { request } from "@/server/request";

export default function UsersP() {
  const [users, setUsers] = useState([] as User[]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([] as React.Key[]);
  const [form] = Form.useForm();

  const columns: ColumnsType<User> = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Actions",
      render: (user) => (
        <div className="flex gap-2">
          <Button onClick={() => deleteUser(user._id)} danger type="primary">
            Delete
          </Button>
          <Button onClick={() => editUser(user._id)} style={{background:"blue"}} type="primary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

 

  async function getUsers() {
    try {
      setLoading(true);
      let res = await request.get("user");
      
      
      
      let data: User[] = res.data;
      
      data = data.map((user) => {
        user.key = user._id;
        return user;
      });
      setUsers(data);
    } catch (err: any) {
      message.error(err.response ? err.response.data.msg : "Timeout");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
     getUsers();
   }, []);

  const openUserModal = () => {
    showModal();
    setSelected(null);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values: User) => {
      if (selected) {
        if (!values.password) {
          delete values.password;
        }
        request
          .put(`user/${selected}`, values)
          .then(() => {
            setIsModalOpen(false);
            getUsers();
            message.success("Successfully changed");
          })
          .catch((err) => {
            message.error(err.response ? err.response.data.msg : "Timeout");
          });
      } else {
        request
          .post("user", values)
          .then(() => {
            setIsModalOpen(false);
            getUsers();
          })
          .catch((err) => {
            message.error(err.response ? err.response.data.msg : "Timeout");
          });
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function editUser(id: string) {
    setSelected(id);
    try {
      const { data } = await request.get(`user/${id}`);
      form.setFieldsValue(data);
      showModal();
    } catch (err: any) {
      message.error(err.response ? err.response.data.msg : "Timeout");
    }
  }

  // rowSelection object indicates the need for row selection
  function getSelected(selectedRowKeys: React.Key[]) {
    setSelectedUsers(selectedRowKeys);
  }

  const deleteUser = async (id: string) => {
    const checkDelete = confirm("Do you want to launch this user?");
    if (checkDelete) {
      try {
        request.delete(`user/${id}`);
        getUsers();
        message.success("Deleted successfully!");
      } catch (err: any) {
        message.error(err.response ? err.response.data.msg : "Timeout");
      }
    }
  };

  return (
    <main className="">
      {users.length !== 0 ? (
        <Table
          title={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 className="text-xl font-semibold">All users</h1>
              <Button onClick={openUserModal}>Add</Button>
            </div>
          )}
          loading={loading}
          dataSource={users}
          columns={columns}
        />
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
      <Modal
        title={selected?"Editing user":"Adding user"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected?"Save":"Add"}
        className="md"
      >
        <Form
          name="user"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 500 }}
          initialValues={{ phoneNumber: "+998" }}
          autoComplete="off"
        >
          <Form.Item<User>
            label="FirstName"
            name="firstName"
            rules={[{ required: true, message: "Please fill this field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="LastName"
            name="lastName"
            rules={[{ required: true, message: "Please fill this field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please fill this field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="PhoneNumber"
            name="phoneNumber"
            rules={[{ required: true, message: "Please fill this field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Password"
            name="password"
            rules={[
              {
                required: selected ? false : true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
