import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Card,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Project {
  key: string;
  name: string;
  description: string;
  owner: string;
}

const ProjectManagementPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { key: "1", name: "项目A", description: "这是一个示例项目", owner: "张三" },
    {
      key: "2",
      name: "项目B",
      description: "这是另一个示例项目",
      owner: "李四",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const showModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalVisible(true);
    if (project) {
      form.setFieldsValue(project);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p.key === editingProject.key ? { ...p, ...values } : p
          )
        );
      } else {
        const newProject = { ...values, key: String(projects.length + 1) };
        setProjects([...projects, newProject]);
      }
      setIsModalVisible(false);
      setEditingProject(null);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProject(null);
    form.resetFields();
  };

  const handleDelete = (key: string) => {
    setProjects(projects.filter((p) => p.key !== key));
  };

  const columns = [
    { title: "项目名称", dataIndex: "name", key: "name" },
    { title: "项目描述", dataIndex: "description", key: "description" },
    { title: "负责人", dataIndex: "owner", key: "owner" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Project) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record.key)} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const [searchText, setSearchText] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const { Title, Paragraph } = Typography;

  return (
    <Card style={{ margin: 24 }}>
      <Title level={4}>项目管理（主应用）</Title>
      <Paragraph>
        这里是主应用的项目管理功能，可以管理所有子应用的项目
      </Paragraph>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          onClick={() => showModal()}
          type="primary"
          icon={<PlusOutlined />}
        >
          新增项目
        </Button>
        <Input.Search
          placeholder="搜索项目名称"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
      </div>
      <Table columns={columns} dataSource={filteredProjects} rowKey="key" />
      <Modal
        title={editingProject ? "编辑项目" : "新增项目"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="项目描述"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="owner" label="负责人" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectManagementPage;
