const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const connectToDataBase = require('./config/database');

const PORT = process.env.PORT || 3000;

connectToDataBase()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
