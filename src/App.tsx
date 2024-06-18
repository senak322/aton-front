import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/clients"
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
