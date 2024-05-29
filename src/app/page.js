"use client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "@/Pages/Navbar/Navbar";
import Homepage from "@/Pages/Homepage/Homepage";
import Experience from "@/Pages/Experience/Experience"
import MyWork from "@/Pages/MyWork/MyWork"
import Contact from "@/Pages/Contact/Contact"
import Login from "@/Pages/Login/Login"
import Register from "@/Pages/Register/Register"
import Admin from "@/Pages/Admin/Admin"
import styles from "./page.module.css";

function Home() {
    return (
        <main className={styles.main}>
            <Router>
                <div className="Home">
                    <Navbar/>
                    <Routes>
                        <Route path="/Experience" element={<Experience />} />
                        <Route path="/MyWork" element={<MyWork />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/Homepage" element={<Homepage />} />
                        <Route path="/Admin" element={<Admin />} />
                        <Route exact path="/" element={<Homepage />} />
                    </Routes>
                </div>
            </Router>
        </main>
    );
}

export default Home;
