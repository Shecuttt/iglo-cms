import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Input, Form, message } from "antd";
import axios from "axios";

const { Meta } = Card;

const TaskEntry = () => {
  const [tasks, setTasks] = useState({
    unassigned: [],
    toDo: [],
    inProgress: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      // Pastikan struktur data yang diterima sesuai dengan yang diharapkan
      const fetchedTasks = response.data || {
        unassigned: [],
        toDo: [],
        inProgress: [],
      };
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("Failed to fetch tasks");
    }
  };

  const showModal = (category) => {
    setCurrentCategory(category);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!newTask.trim()) {
      message.error("Task cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/tasks", {
        category: currentCategory,
        task: newTask,
      });
      setTasks((prevTasks) => {
        const updatedCategoryTasks = Array.isArray(prevTasks[currentCategory])
          ? [...prevTasks[currentCategory], response.data]
          : [response.data];
        return {
          ...prevTasks,
          [currentCategory]: updatedCategoryTasks,
        };
      });
      message.success("Task added successfully");
      setIsModalVisible(false);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTask("");
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const renderTasks = (taskList) => {
    return taskList && taskList.length > 0 ? (
      taskList.map((task, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Meta description={task.task} />
        </Card>
      ))
    ) : (
      <Card style={{ marginBottom: 10 }}>
        <Meta description="No tasks available" />
      </Card>
    );
  };

  return (
    <div className="p-4 mt-3 bg-red-50">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Unassigned"
            extra={
              <Button type="primary" onClick={() => showModal("unassigned")}>
                Add New Task
              </Button>
            }
          >
            {renderTasks(tasks.unassigned)}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="To Do"
            extra={
              <Button type="primary" onClick={() => showModal("toDo")}>
                Add New Task
              </Button>
            }
          >
            {renderTasks(tasks.toDo)}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="In Progress"
            extra={
              <Button type="primary" onClick={() => showModal("inProgress")}>
                Add New Task
              </Button>
            }
          >
            {renderTasks(tasks.inProgress)}
          </Card>
        </Col>
      </Row>
      <Modal
        title="Add New Task"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Input
              value={newTask}
              onChange={handleInputChange}
              placeholder="Enter new task"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskEntry;
