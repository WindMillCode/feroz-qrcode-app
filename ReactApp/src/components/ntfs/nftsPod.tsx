import React, {useState,useEffect} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix,NftsItems,conversion} from '../../customExports'
import {Pane} from 'evergreen-ui'
import QRCode from "react-qr-code";
import { io } from 'socket.io-client';



let prefix = classPrefix({view:'NFTS'});
let prefix0 = classPrefix({view:'NFTSPod0'});


interface Props {
    env:any,
    nftsItems:NftsItems[],
    setNftsItems:Function
}

export default function NFTSPod(props:Props){



    let nfts = {
        items:props.nftsItems,
        conversion,
        clientIo : io(props.env.backend.url)
    }

    // update from socketIo
        // make xhr for new items
    nfts.clientIo.on('update',(devObj:any)=>{
        fetch(`${props.env.backend.url}/list/${props.env.creds.user}`)
        .then(res=>res.json())
        .then(res=>{
            conversion({
                items:res.message.files,
                setFn:props.setNftsItems,
                bucket:props.env.creds.bucket
            })            
        })
        .catch(console.error)
    })
    // 
    

    return <div className={prefix({val:'View'})}>
        <div className={prefix({val:'MainPod'})}>
            <div className={prefix0({val:''})}>
                <h1>Your NFT's</h1>
                <div className={prefix0({val:'Item0'})}>
                {
                    nfts.items.map((x,i)=>{
                        return <div key={i} className={prefix0({val:'Item1'})}>
                            <h2>{x.title.text}</h2>
                            <QRCode size={64} value={x.qrcode.text}/>
                        </div>
                    })
                }
                </div>
            </div>
        </div>
    </div>
}