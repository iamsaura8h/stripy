require("dotenv").config();
const connectDB = require("./src/config/db.js");
const app = require("./src/app");

connectDB();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
