import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Form, Input, DatePicker } from "antd";
import { SketchPicker } from "react-color";
import moment from "moment";
import "moment/locale/id";

const localizer = momentLocalizer(moment);

const ScheduleCenter = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "#3182CE",
  });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setModalVisible(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      color: "#3182CE",
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      color: "#3182CE",
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

  const renderModalContent = () => (
    <Form layout="vertical">
      <Form.Item label="Event Title">
        <Input
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Start Date">
        <DatePicker
          showTime
          value={moment(newEvent.start)}
          onChange={(date) =>
            setNewEvent({
              ...newEvent,
              start: date.toDate(),
            })
          }
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item label="End Date">
        <DatePicker
          showTime
          value={moment(newEvent.end)}
          onChange={(date) =>
            setNewEvent({
              ...newEvent,
              end: date.toDate(),
            })
          }
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item label="Color">
        <SketchPicker
          color={newEvent.color}
          onChangeComplete={(color) =>
            setNewEvent({ ...newEvent, color: color.hex })
          }
        />
      </Form.Item>
    </Form>
  );

  return (
    <div className="schedule-center">
      {" "}
      {/* Tambahkan kelas schedule-center */}
      <h2>Schedule Center</h2>
      <Modal
        title="Add Event"
        open={modalVisible}
        onOk={handleAddEvent}
        onCancel={handleCancel}
      >
        {renderModalContent()}
      </Modal>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "agenda"]}
        selectable
        onSelectSlot={(slotInfo) => showModal(slotInfo)}
      />
    </div>
  );
};

export default ScheduleCenter;
