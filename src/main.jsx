import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as React from 'react'
import {ChakraProvider, Image} from '@chakra-ui/react'

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);

rootElement.render(
    <ChakraProvider>
        <div className="background">
            <App/>
        </div>
    </ChakraProvider>
);
