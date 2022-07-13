import { EthProvider } from "./contexts/EthContext";
import Vote from "./components/Vote";
import "./App.css";

function App() {
  

  return (
    <EthProvider>
      <Vote/>
    </EthProvider>
  );
}

export default App;
