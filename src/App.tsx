import Messageform from "./components/Messageform";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gray-100">
      <Toaster /> {/* ← Add this here to make toasts work globally */}
      <Home />
    </div>
  );
};

export default App;
