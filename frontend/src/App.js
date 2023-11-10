
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeConverter from "./component/CodeConverter";
import Push from "./component/Push";
import "./App.css"
import Githuboauth from "./component/Githuboauth";


function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Githuboauth />} />
        <Route exact path="/code/:id" element={<CodeConverter />} />
        <Route exact path="/push" element={<Push/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
