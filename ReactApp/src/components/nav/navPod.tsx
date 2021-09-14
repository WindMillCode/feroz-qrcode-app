import React, {useState,useEffect} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix} from '../../customExports'
import {Pane} from 'evergreen-ui'

let prefix = classPrefix({view:'Nav'});
let prefix0 = classPrefix({view:'NavMainPod'});

interface Props {
    history:any
}

export default function NavPod(props:Props){


    let nav = {
        name:{
            text:'Feroz'
        },
        links:{
            items:["Login","Upload","Your NFT's"]
            .map((x,i)=>{
                return{
                    text:x,
                    onClick:()=>{
                        props.history.push(["/","/upload","/nfts"][i])
                    }
                }
            })
        }
    }


    return (
        <div className={prefix0({val:''})}>
            <h1 className={prefix0({val:'Name'})}>{nav.name.text}</h1>
            <div className={prefix0({val:'0'})}>
            {
                nav.links.items.map((x,i)=>{
                    return <a onClick={x.onClick}key={i} className={prefix0({val:'0Link'})}>{x.text}</a>
                })
            }
            </div>
        </div>
    )
    
}