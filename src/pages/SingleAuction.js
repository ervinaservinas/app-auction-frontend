import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

const SingleAuction = () => {
    const {id}= useParams()
    const [thisAuction, setThisAuction] = useState({})
    const [thisUser, setThisUser] =useState()
    const [bids, setBids] = useState([])

    const inputBid = useRef()



    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        if (thisAuction.time-Date.now() > 0) {

            setTimeout(() => setTimeLeft(thisAuction.time-Date.now()), 1000);
        } else {
            setTimeLeft('Time expired');
        }
    });

    useEffect(()=>{
        const fechting = setInterval(() => {
            fetchData()

        }, 1000);
        return () => clearInterval(fechting)
    },[])

    async function fetchData(){
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",

        }

        const res = await fetch('http://localhost:4000/auction/'+id, options)
        const data = await res.json()


        if(data.user){

            setThisUser(data.user)
        }
        setThisAuction(data.singleauction)
        setBids(data.singleauction.bids)
    }

    const addBid = async(id) =>{
        if(thisAuction.time<Date.now()){
            console.log("Auction is not active")
            return
        }
        if(Number(inputBid.current.value)>thisUser.money){
            console.log("You need more money")
            return
        }
        if (Number(inputBid.current.value)<=thisAuction.sellprice){
            console.log("Big must be larger then previous one")
            return
        }
        const thisBid ={
            bid: Number(inputBid.current.value),
            username: thisUser.username,
            id: id
        }
        console.log("add bid ", thisBid)

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(thisBid)
        }

        const res = await fetch('http://localhost:4000/addbid', options)
        const data = await res.json()
        inputBid.current.value=""
        console.log(data)
        fetchData()
    }


    return (
        <div>
            <div className='d-flex j-evenly card'>
                {thisAuction?.startprice ?
                    <>
                        <div className='flex-grow2'>
                            <img className='post-img' src={thisAuction.image} alt="nieko ner..."/>
                        </div>
                        <div className='d-flex column j-center flex-grow3 text-left'>
                            <p className='mv-5'> <i>{thisAuction.title}</i></p>
                            <p className='mv-5'>Owner: <b>{thisAuction.username}</b></p>
                            <p className='mv-5'>End time: {(new Date(thisAuction.time)).toLocaleString('lt-Lt')}</p>
                            {thisAuction.time>Date.now() &&
                                <div>
                                    <input type='text' size='20' ref={inputBid}/> <button onClick={()=>addBid(thisAuction._id)}> Make bid </button>
                                </div>
                            }
                        </div>
                        <div className='flex-grow3 text-left'>
                            <p className='mv-5'>Start price: <i>{thisAuction.startprice}</i></p>
                            <p className='mv-5'>Current price: <b>{thisAuction.sellprice}</b></p>

                            <p>{Number(timeLeft>0) ? new Date(timeLeft).toISOString('lt-Lt').slice(11,19) : <b>{timeLeft}</b>}</p>

                        </div>

                    </> : 'loading...'}
            </div>

            <div>
                <h3>Bids</h3>
                <div className='d-flex column-reverse'>
                    {bids.map((x,index)=>
                        <div key={index}>
                            <div className='d-flex card j-center'>

                                <p className='mh-20' >Bidder: <b>{x.username} </b></p>
                                <p className='mh-20'> Bid: <i> {x.bid} € </i></p>
                                <p className='mh-20'> Bid time: <i>{(new Date(x.time)).toLocaleString('lt-Lt')}</i></p>

                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleAuction