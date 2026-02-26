import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CampaignsPage from './pages/CampaignsPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="*" element={<Navigate to="/campaigns" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
