import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';
import {Provider} from "react-redux"
import { store } from './store/store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
