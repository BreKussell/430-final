const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mealRoutes = require('./routes/mealRoutes');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mealplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api', mealRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
