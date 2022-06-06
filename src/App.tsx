import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import { Toaster } from "react-hot-toast";
import "./App.css";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-right"></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomID" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
