//import and init express
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));