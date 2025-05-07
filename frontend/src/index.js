// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Thêm dòng này
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            stateTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 15 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false, // Khong tự động refetch khi chuyển tab
        }
    }
})

ReactDOM.render(
    <QueryClientProvider client = {queryClient}>
        <App />
    </QueryClientProvider>, 
    document.getElementById('root')
);  