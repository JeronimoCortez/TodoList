import { Route, Routes } from "react-router-dom";
import BacklogScreen from "./components/screens/BacklogScreen/BacklogScreen";
import SprintScreen from "./components/screens/SprintScreen/SprintScreen";
function App() {
  return (
    <Routes>
      <Route path="/" element={<BacklogScreen />} />
      <Route path="/sprint/:id" element={<SprintScreen />} />
    </Routes>
  );
}

export default App;
