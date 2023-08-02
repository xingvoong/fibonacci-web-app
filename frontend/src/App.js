import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [fibonacciNumbers, setFibonacciNumbers] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/fibonacci', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ n: parseInt(inputValue) }),
      });
      const data = await response.json();
      setFibonacciNumbers(data.fibonacciNumbers);
    } catch (error) {
      console.error('Error fetching Fibonacci numbers:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the value of n:
          <input type="number" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Generate Fibonacci Numbers</button>
      </form>
      {fibonacciNumbers.length > 0 && (
        <div>
          <h2>Fibonacci Numbers:</h2>
          <ul>
            {fibonacciNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
