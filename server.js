// server.js
const app = require('./index');

const PORT = 2000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
