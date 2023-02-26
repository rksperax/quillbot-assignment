import React from "react";
import { Home } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster
        position="top-left"
        reverseOrder={false}
        toastOptions={{ style: { backgroundColor: "#00E0FF", width: "200px" } }}
      />
    </Router>
  );
};

export default App;
