const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function generateFibonacci(n) {
    const fibonacciArray = [0, 1];
    for (let i = 2; i < n; i++) {
        fibonacciArray.push(fibonacciArray[i - 1] + fibonacciArray[i - 2]);
    }
  return fibonacciArray;
}

app.post('/fibonacci', (req, res) => {
  const { n } = req.body;
  if (!n || typeof n !== 'number' || n <= 0) {
    return res.status(400).json({ error: 'Invalid input. Please provide a positive integer.' });
  }

  const fibonacciNumbers = generateFibonacci(n);
  res.json({ fibonacciNumbers });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});