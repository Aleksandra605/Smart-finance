import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import 'modern-normalize/modern-normalize.css';

import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/smart-finance">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

reportWebVitals();
