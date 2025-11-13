import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Backend API',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});

