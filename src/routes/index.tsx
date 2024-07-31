import { Route, Routes } from "react-router-dom";
import MainScreen from "../screens/mainScreen";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainScreen />} path="/" />
    </Routes>
  );
}

export default AppRoutes;
