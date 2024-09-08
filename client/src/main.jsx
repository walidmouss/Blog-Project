import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider for theming
import App from './App';
import './index.css';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  </React.StrictMode>
);
