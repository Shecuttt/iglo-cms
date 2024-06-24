import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Input,
  Form,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";

const { Meta } = Card;

const TaskEntry = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [judulTask, setJudulTask] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://iglo-cms-api.xyz/api/task_entry"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("Failed to fetch tasks");
    }
  };

  const showModal = (task) => {
    if (task) {
      setEditingTaskId(task.id);
      setJudulTask(task.judul_task);
      setKeterangan(task.keterangan);
    } else {
      setEditingTaskId(null);
      setJudulTask("");
      setKeterangan("");
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!judulTask.trim()) {
      message.error("Task title cannot be empty");
      return;
    }

    try {
      if (editingTaskId) {
        // Edit existing task
        await axios.put(
          `https://iglo-cms-api.xyz/api/task_entry/${editingTaskId}`,
          {
            judul_task: judulTask,
            keterangan: keterangan,
          }
        );
        message.success("Task updated successfully");
      } else {
        // Add new task
        await axios.post("https://iglo-cms-api.xyz/api/task_entry", {
          judul_task: judulTask,
          keterangan: keterangan,
        });
        message.success("Task added successfully");
      }
      setIsModalVisible(false);
      setJudulTask("");
      setKeterangan("");
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error adding/updating task:", error);
      message.error("Failed to add/update task");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setJudulTask("");
    setKeterangan("");
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://iglo-cms-api.xyz/api/task_entry/${taskId}`);
      message.success("Task deleted successfully");
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Failed to delete task");
    }
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <Card key={task.id} style={{ marginBottom: 10 }}>
        <Meta title={task.judul_task} description={task.keterangan} />
        <div style={{ marginTop: 20 }}>
          <Button
            type="primary"
            onClick={() => showModal(task)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(task.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      </Card>
    ));
  };

  const handleJudulTaskChange = (e) => {
    setJudulTask(e.target.value);
  };

  const handleKeteranganChange = (e) => {
    setKeterangan(e.target.value);
  };

  return (
    <div className="p-4 mt-3 bg-red-50">
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Tasks"
            extra={
              <Button type="primary" onClick={() => showModal(null)}>
                Add New Task
              </Button>
            }
          >
            {tasks.length > 0 ? (
              renderTasks()
            ) : (
              <Meta description="No tasks available" />
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title={editingTaskId ? "Edit Task" : "Add New Task"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form>
          <Form.Item>
            <Input
              value={judulTask}
              onChange={handleJudulTaskChange}
              placeholder="Task Title"
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              value={keterangan}
              onChange={handleKeteranganChange}
              placeholder="Task Description"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskEntry;
