<<<<<<< Updated upstream
import BacklogScreen from "./components/screens/BacklogScreen/BacklogScreen";
function App() {
  return (
    <>
      <BacklogScreen />
=======
import SprintScreen from "./components/screens/SprintScreen/SprintScreen";
import { CreateSprintModal } from "./components/ui/CreateSprintModal/CreateSprintModal";
function App() {
  return (
    <>
      <SprintScreen />
      <CreateSprintModal />
>>>>>>> Stashed changes
    </>
  );
}

export default App;
