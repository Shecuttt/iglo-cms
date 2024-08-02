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

const { Meta } = Card;

const TASKS_KEY = "tasks";

const TaskEntry = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [judulTask, setJudulTask] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasksFromLocalStorage();
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage();
  }, [tasks]);

  const fetchTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS_KEY));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  const saveTasksToLocalStorage = () => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
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

  const handleOk = () => {
    if (!judulTask.trim()) {
      message.error("Task title cannot be empty");
      return;
    }

    const newTask = {
      id: Date.now(),
      judul_task: judulTask,
      keterangan: keterangan,
    };

    if (editingTaskId) {
      // Edit existing task
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? newTask : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks([...tasks, newTask]);
    }

    setIsModalVisible(false);
    setJudulTask("");
    setKeterangan("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setJudulTask("");
    setKeterangan("");
  };

  const handleDelete = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
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
    <div className="p-4 mt-3">
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
