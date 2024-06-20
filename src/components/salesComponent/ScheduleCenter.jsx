import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Breadcrumb,
} from "antd";
import { SketchPicker } from "react-color";
import moment from "moment";
import "moment/locale/id";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

const ScheduleCenter = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "#3182CE",
    type: "",
    repeat: "",
    location: "",
    reminder: "",
    attendees: "",
    taskPlan: "",
    status: "",
    product: "",
  });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setModalVisible(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      color: "#3182CE",
      type: "",
      repeat: "",
      location: "",
      reminder: "",
      attendees: "",
      taskPlan: "",
      status: "",
      product: "",
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      color: "#3182CE",
      type: "",
      repeat: "",
      location: "",
      reminder: "",
      attendees: "",
      taskPlan: "",
      status: "",
      product: "",
    });
  };

  const showModal = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setModalVisible(true);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const renderModalContent = () => (
    <Form layout="vertical">
      <Form.Item label="Event Title">
        <Input
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Add Date">
        <DatePicker
          value={moment(newEvent.start)}
          onChange={(date) =>
            setNewEvent({
              ...newEvent,
              start: date.toDate(),
            })
          }
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <Form.Item label="Start Time">
        <TimePicker
          value={moment(newEvent.start)}
          onChange={(time) =>
            setNewEvent({
              ...newEvent,
              start: moment(newEvent.start)
                .set({
                  hour: time.hour(),
                  minute: time.minute(),
                })
                .toDate(),
            })
          }
          format="HH:mm"
        />
      </Form.Item>
      <Form.Item label="End Time">
        <TimePicker
          value={moment(newEvent.end)}
          onChange={(time) =>
            setNewEvent({
              ...newEvent,
              end: moment(newEvent.end)
                .set({
                  hour: time.hour(),
                  minute: time.minute(),
                })
                .toDate(),
            })
          }
          format="HH:mm"
        />
      </Form.Item>
      <Form.Item label="Type">
        <Input
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Repeat">
        <Input
          value={newEvent.repeat}
          onChange={(e) => setNewEvent({ ...newEvent, repeat: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Location">
        <Input
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Reminder">
        <Input
          value={newEvent.reminder}
          onChange={(e) =>
            setNewEvent({ ...newEvent, reminder: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Attendees">
        <Input
          value={newEvent.attendees}
          onChange={(e) =>
            setNewEvent({ ...newEvent, attendees: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Task/Plan">
        <Input
          value={newEvent.taskPlan}
          onChange={(e) =>
            setNewEvent({ ...newEvent, taskPlan: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Status">
        <Input
          value={newEvent.status}
          onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Product">
        <Input
          value={newEvent.product}
          onChange={(e) =>
            setNewEvent({ ...newEvent, product: e.target.value })
          }
        />
      </Form.Item>
    </Form>
  );

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          {
            title: <Link to="/salesplan">Sales Plan</Link>,
          },
          {
            title: "Activity",
          },
          {
            title: "Schedule Center",
          },
        ]}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">Schedule Center</h1>
      <Modal
        title="Add Event"
        open={modalVisible}
        onOk={handleAddEvent}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={handleAddEvent}>
            Create
          </Button>,
        ]}
      >
        {renderModalContent()}
      </Modal>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day", "agenda"]}
        selectable
        onSelectSlot={(slotInfo) => showModal(slotInfo)}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default ScheduleCenter;
