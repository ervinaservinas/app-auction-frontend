import React from 'react'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Auction from '../components/Auction'

const AllAuctions = () => {

    const [allAuctions, setAllAuctions] = useState([])
    const [thisUser, setThisUser] =useState("")

    const nav=useNavigate()

    useEffect(() =>{
        const fecthPooling = setInterval(() => {
            fetchData()

        }, 1000);
        return () => clearInterval(fecthPooling)
    },[])

    async function fetchData(){
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",

        }

        const res = await fetch('http://localhost:4000/allauctions', options)
        const data = await res.json()

        if(data.user){

            setThisUser(data.user.username)
        }
        setAllAuctions(data.allAuctions)

    }

    return (
        <div>
            <h3>All Auctions</h3>
            <div className='flex-wrap auction'>
                {allAuctions.map((x, index)=>
                    <div className="flex-wrap auctionBox" key={index}>
                        <Auction index={index} user = {x} />
                    </div>
                )}

            </div>
        </div>
    )
}

export default AllAuctions