import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import campaignRoutes from './routes/campaigns.route';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', campaignRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Campaigns API running on http://localhost:${PORT}`);
    console.log(`📊 Try: http://localhost:${PORT}/api/campaigns`);
});

export default app;
