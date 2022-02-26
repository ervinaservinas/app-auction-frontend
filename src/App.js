import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from 'react';

import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import AllAuctions from './pages/AllAuctions';

import SingleAuction from './pages/SingleAuction';
import CreateAuction from './pages/CreateAuction';

import './App.css';


function App() {


    const [toolbar, setToolbar] = useState((true))
    const [message, setMessage] = useState("")
    const [thisUser, setThisUser] = useState({username: "", money: ""})

    return (
        <div className="App">
            <BrowserRouter>

                <Header toolbar={toolbar} setToolbar={setToolbar} setMessage={setMessage} thisUser={thisUser}
                        setThisUser={setThisUser}/>
                <Routes>
                    <Route path="/" element={<Login toolbar={toolbar} setToolbar={setToolbar} message={message} setMessage={setMessage}
                                                    setThisUser={setThisUser}/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/allauctions" element={<AllAuctions/>}></Route>
                    <Route path="/createauction" element={<CreateAuction/>}/>
                    <Route path="/singleauction/:id" element={<SingleAuction/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
