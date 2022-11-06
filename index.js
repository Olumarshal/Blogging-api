const app = require('./app')
const Database = require("./database/db");

const PORT = process.env.PORT || 8000;

// connect to database
Database.connectToDB();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
