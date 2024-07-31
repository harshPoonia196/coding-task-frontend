import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfig } from "./utils";

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarUtilsConfig />
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
