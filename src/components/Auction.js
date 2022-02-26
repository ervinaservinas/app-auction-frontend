import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Auction = ({index, user}) => {
    const [timeLeft, setTimeLeft] = useState("")
    useEffect(() => {
        if (user.time - Date.now() > 0) {

            setTimeout(() => setTimeLeft(user.time - Date.now()), 1000);
        } else {
            setTimeLeft('Time expired');
        }
    });

    const nav = useNavigate()

    const getSingle = (arg) => {
        console.log("nav", arg)
        nav("/singleauction/" + arg)
    }

    return (
        <div>
            <div className='card d-flex'>
                <div className="flex-grow1">
                    <img onClick={() => getSingle(user._id)} src={user.image} alt="no img"/>
                </div>
                <div className="flex-grow2">
                    <p><i>{user.title}</i></p>
                    <p>Start price: <i>{user.startprice}</i></p>
                    <p>Current price: <i>{user.sellprice}</i></p>
                    <p>Owner: <b>{user.username}</b></p>
                </div>
                <div className="flex-grow2">
                    <p>End time: {(new Date(user.time)).toLocaleString('lt-Lt')}</p>
                    <p>{Number(timeLeft > 0) ? new Date(timeLeft).toISOString('lt-Lt').slice(11, 19) :
                        <b>{timeLeft}</b>}</p>
                </div>
            </div>
        </div>
    )
}

export default Auction