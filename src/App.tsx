import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
