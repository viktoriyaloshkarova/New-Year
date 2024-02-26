import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './context/QueryClient';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, {persistor} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <QueryClientProvider client={queryClient}>
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserProvider>
    </QueryClientProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
