import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { signECDSA, verifyECDSA } from '@stacks/encryption';
import { CHAIN_TYPE } from '../config'
import Modal from 'react-modal';

const ManageAccessModal = (props) => {
    return (
        <>
            <div class="modal fade" id="manageAccess" tabindex="-1" aria-labelledby="manageAccessLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="manageAccessLabel">Manage Access</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {console.log(props.access)}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function CredDetails(props) {
    const [shareMode, setShareMode] = useState(0);
    const [shareAddressInput, setShareAddressInput] = useState('');
    const [access, setAccess] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement('#root');

    useState(() => {
        axios.get(`http://localhost:8000/api/docs/${props.localProps.contract_call.function_args[0].repr}`).then(r => {
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

    const shareCredential = () => {
        const sigObj = signECDSA(props.privateKey, props.localProps.contract_call.function_args[1].repr.replace('"', "").replace('"', "")); // encrypt hash

        // send signature to the verifier
        axios.post("http://localhost:8000/api/share", { sender: props.localProps.contract_call.function_args[0].repr, txid: props.localProps.tx_id, signature: sigObj.signature, rcvr: shareAddressInput }).then((r) => {
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
                                contentLabel="Example Modal"
                            >
                                <h2>Hello</h2>
                                <button onClick={() => { setIsOpen(false) }}>close</button>
                                <div>I am a modal</div>
                                <form>
                                    <input />
                                    <button>tab navigation</button>
                                    <button>stays</button>
                                    <button>inside</button>
                                    <button>the modal</button>
                                </form>
                            </Modal>



                        </> : <>
                            <input placeholder='Receiver STACKS Wallet Address' value={shareAddressInput} onChange={(e) => { setShareAddressInput(e.target.value) }} />
                            <button className='btn1 btn-md me-3' onClick={() => {
                                shareCredential();
                            }} >SHARE</button>

                        </>}


                    </div>
                </div>
            </div>
        </>
    )
}
