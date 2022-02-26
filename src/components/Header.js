import React from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

const Header = ({
                    toolbar,
                    setToolbar,
                    setMessage,
                    thisUser,
                    setThisUser
                }) => {


    const nav = useNavigate()

    const logout = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        }

        const res = await fetch('http://localhost:4000/logout', options)
        const data = await res.json()
        console.log(data)

        setMessage("")
        setToolbar(true)
        setThisUser({username: "", money: ""})
        nav("/")
    }

    return (
        <div>
            <div>
                {toolbar &&
                    <div className='d-flex j-evenly'>
                        <button className="btn"><Link to="/"> Login </Link></button>
                        <button className="btn"><Link to="/register"> Register </Link></button>
                    </div>
                }
                {!toolbar &&
                    <div>
                        <div className="d-flex a-around">
                            <div> User: {thisUser.username} </div>
                            <div>Money: {thisUser.money} €</div>
                        </div>
                        <div className='d-flex j-evenly'>
                            <button className='btn'><Link to="/createauction"> Create Auction </Link></button>
                            <button className='btn'><Link to="/allauctions"> All Auctions </Link></button>
                            <button className='btn' onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Header