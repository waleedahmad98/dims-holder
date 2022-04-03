import React, { useEffect, useState } from 'react';
import { Storage } from "@stacks/storage";
import {
  Person,
} from 'blockstack';
import axios from 'axios';
import { BASE_API_URL, CHAIN_TYPE } from '../config';

export const Profile = ({ userData, userSession, handleSignOut }) => {
  const person = new Person(userData.profile);
  const storage = new Storage({ userSession });
  const [nfts, setNFTs] = useState([]);
  const [txids, setTxids] = useState([]);
  const [check, setCheck] = useState(false);
  const [stx, setStx] = useState("")
  const [reveal, setReveal] = useState(0)

  const getThumbnails = ()=>{
    for (let i=0; i<nfts.length; i++){
      console.log("test", nfts[i])
    }
  }

  useEffect(() => {
    try {
      let principal = null;
      if (CHAIN_TYPE === 'testnet')
        principal = person._profile.stxAddress.testnet
      else
        principal = person._profile.stxAddress.mainnet

      axios.get(`${BASE_API_URL}/extended/v1/address/${principal}/stx`).then((res) => {
        setStx((parseInt(res.data.balance) / 1000000).toString())
      })
    }
    catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${person._profile.stxAddress.testnet}/assets?unanchored=true`).then((resp) => {
      const data = resp.data.results
      let temp = []
      for (let i = 0; i < data.length; i = i + 1) {
        temp.push(data[i].tx_id)
      }
      setTxids(temp)
      setCheck(true)
    })
  }, [])

  useEffect(() => {
    if (check === true) {
      let temp = []
      let promises = []

      for (let i = 0; i < txids.length; i = i + 1) {
        promises.push(axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txids[i]}`).then((resp) => {
          temp.push(resp.data)
        }))
      }
      Promise.all(promises).then(() => {
        console.log(temp)
        setNFTs(temp)
      })
    }
  }, [check])

  const getDateTime = (date) => {
    if (date === "")
        return 'Mining in Progress'
    var localDate = new Date(date).toString()
    localDate = localDate.split(" ")
    return `${localDate[1]} ${localDate[2]} ${localDate[3]} (${localDate[4]})`
}

  return (
    <div className="container">
      <div className='d-flex flex-row justify-content-between mt-5'>
        {reveal === 0 ? <button className='reveal-btn' onClick={() => { setReveal(1) }}>REVEAL ADDRESS</button> : <><button className='reveal-btn' data-bs-dismiss="alert" onClick={() => {
          navigator.clipboard.writeText(CHAIN_TYPE === "testnet" ? person._profile.stxAddress.testnet : person._profile.stxAddress.mainnet)
          setReveal(0);

        }}> {CHAIN_TYPE === "testnet" ? person._profile.stxAddress.testnet : person._profile.stxAddress.mainnet} </button></>}
        <div>
          <button className='reveal-btn' disabled>STX Balance: {stx}</button>
          <button type="button" className='btn1 btn-md ms-2' onClick={handleSignOut}> Sign Out</button>
        </div>
      </div>
      <div className='content-container d-flex flex-column align-items-center'>
        {nfts.length !== 0 ? <>{console.log(nfts)}{nfts.map(nft => <>
          <div class="card content-card w-50 mb-5 d-flex flex-row justify-content-start align-items-center">
            <div>
              x
            </div>
            <div class="card-body">
              <h5 class="card-title">{nft.contract_call !== undefined ? nft.contract_call.function_args[2].repr.replace('"', "").replace('"', "") : <></>}</h5>
              <h6 class="card-subtitle mb-2">{nft.contract_call !== undefined ? <><span style={{ fontWeight: "600", color: "white" }}>Owner Address: </span>{nft.contract_call.function_args[0].repr}</> : <></>}</h6>
              <h6 class="card-subtitle mb-2" >{nft.sender_address !== undefined ? <><span style={{ fontWeight: "600", color: "white" }}>Sender Address: </span>{nft.sender_address}</> : <></>}</h6>
              <h6 class="card-subtitle mb-2" >{nft.burn_block_time_iso !== undefined ? <><span style={{ fontWeight: "600", color: "white" }}>Date of Issue: </span>{getDateTime(nft.burn_block_time_iso)}</> : <></>}</h6>
              <div className='d-flex flex-row'>
                <button className='card-btn me-3' onClick={() => { window.open(`https://explorer.stacks.co/txid/${nft.tx_id}?chain=${CHAIN_TYPE}`, "_blank") }}>DETAILS</button>
                <button className='card-btn' onClick={() => {
                  window.open(
                    nft.contract_call.function_args[3].repr.replace('"', "").replace('"', ""), "_blank"
                  )
                }}>PDF</button>
              </div>
            </div>
          </div>

        </>)}</> : <></>}

      </div>
    </div>
  );
}

export default Profile

