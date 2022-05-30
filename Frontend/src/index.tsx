import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);
