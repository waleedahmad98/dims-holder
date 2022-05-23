import React, { useEffect, useState } from 'react';
//import { Storage } from "@stacks/storage";
import { getPublicKeyFromPrivate } from '@stacks/encryption';
import {
  Person,
} from 'blockstack';
import axios from 'axios';
import Fuse from 'fuse.js';
import { BASE_API_URL, CHAIN_TYPE } from '../config';
import CredDetails from './CredDetails';
import randomColor from 'randomcolor';

export const Profile = ({ userData, userSession, handleSignOut }) => {
  const person = new Person(userData.profile);
  //const storage = new Storage({ userSession });
  const [localProps, setLocalProps] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const [searchedNfts, setSearchedNFTs] = useState([]);
  const [txids, setTxids] = useState([]);
  const [check, setCheck] = useState(false);
  const [stx, setStx] = useState("")
  const [reveal, setReveal] = useState(0)
  const [searchText, setSearchText] = useState("")

  const fuzzySearch = (query) => {
    if (query === "") {
      setNFTs(searchedNfts);
    }
    else {
      const fuse = new Fuse(nfts, {
        keys: ["contract_call.function_args.repr"]
      });
      const result = fuse.search(query);
      console.log(result)
      setNFTs(result.map(r => { return r.item }))
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
    let principal = null;
    if (CHAIN_TYPE === 'testnet')
      principal = person._profile.stxAddress.testnet
    else
      principal = person._profile.stxAddress.mainnet
    axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/assets?unanchored=true`).then((resp) => {
      const data = resp.data.results
      let temp = []
      for (let i = 0; i < data.length; i = i + 1) {
        temp.push(data[i].tx_id)
      }
      setTxids(temp)
      setCheck(true)
    })
  }, [])

  // save public key on mongo db
  useEffect(() => {

    const privateKey = userData.appPrivateKey;
    const publicKey = getPublicKeyFromPrivate(privateKey);

    axios.post("/api/save", { stxAddress: person._profile.stxAddress.testnet, publicKey: publicKey }).then((r) => {
      console.log(r);
    })
  }, [])

  useEffect(() => {
    if (check === true) {
      let temp = []
      let promises = []

      for (let i = 0; i < txids.length; i = i + 1) {
        promises.push(axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txids[i]}`).then((resp) => {
          if (resp.data.tx_type === "contract_call")
            temp.push(resp.data)
        }))
      }
      Promise.all(promises).then(() => {
        temp = temp.sort((a, b) => parseFloat(b.burn_block_time) - parseFloat(a.burn_block_time));
        setNFTs(temp)
        setSearchedNFTs(temp)
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


  if (localProps === null)
    return (
      <div className="container">
        <div className='d-flex flex-row justify-content-between mt-5'>
          {reveal === 0 ? <button className='anim-btn anim-btn-sm' onClick={() => { setReveal(1) }}>REVEAL ADDRESS</button> : <><button className='anim-btn anim-btn-sm' data-bs-dismiss="alert" onClick={() => {
            navigator.clipboard.writeText(CHAIN_TYPE === "testnet" ? person._profile.stxAddress.testnet : person._profile.stxAddress.mainnet)
            setReveal(0);

          }}> {CHAIN_TYPE === "testnet" ? person._profile.stxAddress.testnet : person._profile.stxAddress.mainnet} </button></>}
          <input className='searchbar' type="text" placeholder='Search transactions' value={searchText} onChange={(e) => {
            setSearchText(e.target.value);
            fuzzySearch(e.target.value)
          }} />
          <div>
            <button className='reveal-btn' disabled>STX Balance: {stx}</button>
            <button type="button" className='btn1 btn-md ms-2' onClick={handleSignOut}> Sign Out</button>
          </div>
        </div>
        <div className='container mt-5 d-flex flex-row flex-wrap justify-content-around'>
          {nfts.length !== 0 ? <>{nfts.map(nft => <>
            <div class="card px-4 py-2 content-card mb-5" style={{backgroundColor: randomColor({luminosity: 'dark', hue: 'blue'})}} onClick={() => {
              setLocalProps(nft);
            }}>
              <div class="card-body">
                <div className='d-flex justify-content-between text-start'>
                  <h2 class="card-title mb-4" style={{ fontWeight: "700" }}>{nft.contract_call !== undefined ? nft.contract_call.function_args[2].repr.replace('"', "").replace('"', "") : <></>}</h2>
                  <div>
                    <div class="card-subtitle mb-4" >{nft.burn_block_time_iso !== undefined ? <>{getDateTime(nft.burn_block_time_iso)}</> : <></>}</div>
                  </div>
                </div>
                <hr/>
                <h6 class="card-subtitle mb-4 text-start">{nft.contract_call !== undefined ? <><span style={{ fontWeight: "800", color: "white" }}>Owned by <br /> </span>{nft.contract_call.function_args[0].repr}</> : <></>}</h6>
                <h6 class="card-subtitle mb-4 text-start" >{nft.sender_address !== undefined ? <><span style={{ fontWeight: "800", color: "white" }}>Issued by<br /> </span>{nft.sender_address}</> : <></>}</h6>
                <hr/>
                <div className='d-flex flex-row'>
                  <button className='card-btn me-3 w-50 py-3' onClick={(e) => {
                    e.stopPropagation()
                    window.open(`https://explorer.stacks.co/txid/${nft.tx_id}?chain=${CHAIN_TYPE}`, "_blank")
                  }}>DETAILS</button>
                  <button className='card-btn me-3 w-50' onClick={(e) => {
                    e.stopPropagation()
                    window.open(
                      nft.contract_call.function_args[3].repr.replace('"', "").replace('"', ""), "_blank"
                    )
                  }}>PDF</button>
                </div>
              </div>
            </div>

          </>)}</> : <><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            xmlSpace="preserve"
            height="8rem"
          >
            <circle
              fill="none"
              stroke="#000"
              strokeWidth={4}
              cx={50}
              cy={50}
              r={44}
              style={{
                opacity: 0.5,
              }}
            />
            <circle fill="#fff" stroke="#331d96" strokeWidth={3} cx={8} cy={54} r={6}>
              <animateTransform
                attributeName="transform"
                dur="2s"
                type="rotate"
                from="0 50 48"
                to="360 50 52"
                repeatCount="indefinite"
              />
            </circle>
          </svg></>}

        </div>
      </div>
    );
  else {
    return (
      <div className='container'>
        <CredDetails localProps={localProps} setLocalProps={setLocalProps} privateKey={userData.appPrivateKey} />
      </div>
    );
  }

}

export default Profile

