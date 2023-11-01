import React, { useState } from 'react';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleCreateRoom = () => {
    // Generate a unique room ID (you can use a library or backend for a more robust solution)
    const newRoomId = Math.random().toString(36).substring(7);
    setRooms([...rooms, newRoomId]);
  };

  const handleJoinRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <div>
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="">Select a room</option>
          {rooms.map((roomId) => (
            <option key={roomId} value={roomId}>
              Room {roomId}
            </option>
          ))}
        </select>
        <button onClick={() => handleJoinRoom(selectedRoom)} disabled={!selectedRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomManagement;
