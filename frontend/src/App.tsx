import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      
        <Router>
          <div className="h-screen bg">
          <Navbar/>
          <AppRoutes />
          </div>
          <ToastContainer toastClassName="font-quicksand text-black font-medium" />
        </Router>
    
    </AuthProvider>
  );
};

export default App;
