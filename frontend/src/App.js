import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Study from "./pages/Study/Study";
import Readme from "./pages/ReadMe/Readme";
import Layout from "./UI/Layout";
import QA from "./pages/QA/Qa";
import CardBuilder from "./pages/CardBuilder/CardBuilder";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profile } from "./features/auth/authSlice";

function App() {

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(profile());
  // }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<Study />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/readme" element={<Readme />} /> */}
            <Route path="/qa" element={<QA />} />
            <Route path="/card-builder" element={<CardBuilder />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
