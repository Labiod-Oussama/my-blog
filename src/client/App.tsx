import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Components/Home/Home";
import { token, UserInfos } from './Components/Global/Config';
import { theme } from './Components/Global/Theme'
import { ThemeProvider } from "@mui/material";
import Signup from "./Components/Register/Signup";
import Login from "./Components/Register/Login";
import Admin from './Components/Dashborad/Admin';
import SingleOne from "./Components/Home/SingleOne";
import CreateBlog from "./Components/Dashborad/CreateBlog";
interface ContextData {
  infos: {
    token: string | undefined;
    UserInfos: any;
  },
  setInfos: React.Dispatch<React.SetStateAction<{ token: string | undefined; UserInfos: any }>>
}
export const infoGlobal = createContext<ContextData>({} as ContextData);
function App() {
  const [infos, setInfos] = useState({ token, UserInfos });
  console.log(UserInfos);
  return (
    <infoGlobal.Provider value={{ infos, setInfos }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:blogID" element={<SingleOne />} />
            <Route path="/admin/dashborad" element={<Admin />} />
            <Route path="/admin/dashborad/create" element={<CreateBlog />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </infoGlobal.Provider>
  );
}

export default App;
