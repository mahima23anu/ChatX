// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');


import Prompt from './components/Prompt';
// import  { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Replace with your server URL

function MyComponent() {
  const [name, setName] = useState('');

  const sendName = () => {
    socket.emit('sendName', name);
  };

  useEffect(() => {
    socket.on('nameReceived', (response) => {
      console.log(response); // Log the response from the server
    });

    return () => {
      socket.off('nameReceived');
    };
  }, []);

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <button onClick={sendName}>Submit</button>
    </div>
  );
}

export default MyComponent;
