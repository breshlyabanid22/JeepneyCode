import { useState } from 'react'
import './App.css'
import JeepneyCode from './JeepneyCode';
function App() {
 
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <label className='label'>Enter Jeep Codes:</label>
      <input
        type="text"
        id="jeepCodeInput"
        value={input}
        onChange={handleInputChange}
        placeholder="E.g., 01A,03C,06B"
      />
      <JeepneyCode input={input} />
    </div>
  )
}

export default App
