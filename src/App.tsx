import "./App.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfig } from "./utils";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <SnackbarUtilsConfig />
            <AppRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
