import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
} from '@admiral-ds/react-ui';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <App />
      </DropdownProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
