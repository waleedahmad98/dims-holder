import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { signECDSA, verifyECDSA } from '@stacks/encryption';
import { CHAIN_TYPE } from '../config'
import Modal from 'react-modal';

export default function CredDetails(props) {
    const [shareMode, setShareMode] = useState(0);
    const [shareAddressInput, setShareAddressInput] = useState('');
    const [access, setAccess] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement('#root');

    useState(() => {
        axios.get(`https://dims-backend.herokuapp.com/api/docs/${props.localProps.contract_call.function_args[0].repr}`).then(r => {
            setAccess(r);
        })
    }, [])

    const getDateTime = (date) => {
        if (date === "")
            return 'Mining in Progress'
        var localDate = new Date(date).toString()
        localDate = localDate.split(" ")
        return `${localDate[1]} ${localDate[2]} ${localDate[3]} (${localDate[4]})`
    }

    const remove = (item) => {
        let filteredArr = Object.values(access).filter((el) => el._id !== item._id);
        setAccess(filteredArr);
      };

    const shareCredential = () => {
        const sigObj = signECDSA(props.privateKey, props.localProps.contract_call.function_args[1].repr.replace('"', "").replace('"', "")); // encrypt hash

        // send signature to the verifier
        axios.post("https://dims-backend.herokuapp.com/api/share", { sender: props.localProps.contract_call.function_args[0].repr, txid: props.localProps.tx_id, signature: sigObj.signature, rcvr: shareAddressInput }).then((r) => {
            setShareMode(0);
        })



    }

    return (
        <>
            <div className='row mb-5'>
                <div className='col-1'><button className='anim-btn anim-btn-sm ms-2 mt-5' onClick={() => {
                    props.setLocalProps(null)
                }}>BACK</button></div>
            </div>
            <div className='row vh-100 d-flex flex-wrap'>
                {console.log(props.localProps)}
                <div className='col-md-4'>
                    <iframe src={`${props.localProps.contract_call.function_args[3].repr.replace('"', "").replace('"', "")}`}
                        style={{ border: "3px solid black" }} height="500" width="400" ></iframe>
                </div>
                <div className='col-md-8 text-start'>
                    <div>
                        <h5 class="mb-4" style={{ fontWeight: "700", fontSize: "4rem" }}>{props.localProps.contract_call !== undefined ? props.localProps.contract_call.function_args[2].repr.replace('"', "").replace('"', "") : <></>}</h5>
                        <div style={{ fontWeight: "700", fontSize: "2rem" }}>Owned By </div>
                        <h6 class="mb-4" style={{ fontSize: "1.5rem" }}>{props.localProps.contract_call !== undefined ? <>{props.localProps.contract_call.function_args[0].repr}</> : <></>}</h6>
                        <div style={{ fontWeight: "700", fontSize: "2rem" }}>Issued By</div>
                        <h6 class="mb-4" style={{ fontSize: "1.5rem" }} >{props.localProps.sender_address !== undefined ? <>{props.localProps.sender_address}</> : <></>}</h6>
                        <div style={{ fontWeight: "700", fontSize: "2rem" }}>Date Issued</div>
                        <div class="mb-4" style={{ fontSize: "1.5rem" }}>{props.localProps.burn_block_time_iso !== undefined ? <>{getDateTime(props.localProps.burn_block_time_iso)}</> : <></>}</div>
                    </div>
                    <div>
                        {shareMode === 0 ? <><button className='btn1 btn-md me-3' onClick={() => { window.open(`https://explorer.stacks.co/txid/${props.localProps.tx_id}?chain=${CHAIN_TYPE}`, "_blank") }}>DETAILS</button>
                            <button className='btn1 btn-md me-3' onClick={() => {
                                setShareMode(1);
                            }} >SHARE</button>
                            <button className='btn1 btn-md me-3' onClick={() => {
                                window.open(
                                    props.localProps.contract_call.function_args[3].repr.replace('"', "").replace('"', ""), "_blank"
                                )
                            }}>FULL PDF</button>
                            <button className='btn1 btn-md me-3' onClick={() => {
                                setIsOpen(true);
                            }}>MANAGE ACCESS</button>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => { setIsOpen(false) }}
                            >

                                <h2>MANAGE ACCESS</h2>
                                <div className='d-flex flex-column align-items-center'>
                                    {access.data !== undefined ? access.data.vc.map(a => <div class="card content-card w-50 mb-5">
                                        <div class="card-body text-start">

                                            <h5 class="card-title mb-4" style={{ fontWeight: "700" }}><span style={{ fontWeight: "300", fontSize: "medium" }}>Shared with <br /></span>{a.sharedWith}</h5>

                                            <div className='d-flex flex-row'>
                                                <button className='card-btn me-3 py-3' onClick={() => { window.open(`https://explorer.stacks.co/txid/${a.txid}?chain=${CHAIN_TYPE}`, "_blank") }}>DETAILS</button>
                                                <button className='card-btn me-3 py-3' onClick={async () => {
                                                    await axios.delete("https://dims-backend.herokuapp.com/api/docs", { headers: {}, data: { "objectid": a._id } })
                                                    await axios.delete("https://dims-backend.herokuapp.com/api/docsvc", { headers: {}, data: { "objectid": a._id } })
                                                    remove(a)
                                                }}>REVOKE</button>
                                            </div>
                                        </div>
                                    </div>) : <></>}
                                </div>
                            </Modal>



                        </> : <div className='d-flex flex-column align-items-start'>
                            <input className='searchbar py-2 w-100' placeholder='Receiver STACKS Wallet Address' value={shareAddressInput} onChange={(e) => { setShareAddressInput(e.target.value) }} />
                            <div className='d-flex flex-row'>
                                <button className='btn1 btn-md me-3 mt-2' onClick={() => {
                                    shareCredential();
                                }} >SHARE</button>
                                <button className='btn1 btn-md me-3 mt-2' onClick={() => {
                                    setShareMode(0)
                                }} >CANCEL</button>
                            </div>

                        </div>}


                    </div>
                </div>
            </div>
        </>
    )
}
