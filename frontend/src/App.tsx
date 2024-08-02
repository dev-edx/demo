import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:1600/users', {
        email: 'dev@yopmail.com',
        user: 'dev',
      });
      console.log('response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>My Simple Component</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
