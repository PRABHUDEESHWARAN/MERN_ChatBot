import Header from "./components/Header";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import { useAuth } from "./context/AuthContext";

function App() {
const auth=useAuth();
  return(
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />;
        <Route path="/SignUp" element={<SignUp/>} />;
        <Route path="/signIn" element={<Login/>} />;
        {auth?.isLoggedIn && auth.user && <Route path="/Chat" element={<Chat/>} />};
        <Route path="*" element={<NotFound/>} />;
      </Routes>




    </main>


  ) 
}

export default App
