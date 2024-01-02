const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const client = mongoose.connection;
