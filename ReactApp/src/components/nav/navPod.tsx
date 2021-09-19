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

    let [menuMobileStyle,setMenuMobileStyle] = useState({})

    let nav = {
        name:{
            text:'Feroz'
        },
        menu:{
            mobile:{
                style:menuMobileStyle
            },
            icon:{
                onClick:()=>{
                    setMenuMobileStyle({display:'flex'})
                }
            }
        },
        links:{
            items:["Login","Upload","Your NFT's"]
            .map((x,i)=>{
                return{
                    text:x,
                    onClick:()=>{
                        props.history.push(["/","/upload","/nfts"][i])
                    },
                    mobile:{
                        onClick:()=>{
                            setMenuMobileStyle({display:'none'})
                            props.history.push(["/","/upload","/nfts"][i])
                        },
                    }
                }
            })
        }
    }


    return (
        <>
        <div className={prefix0({val:''})}>
            <h1 className={prefix0({val:'Name'})}>{nav.name.text}</h1>
            <div className={prefix0({val:'0'})}>
            {
                nav.links.items.map((x,i)=>{
                    return <a onClick={x.onClick}key={i} className={prefix0({val:'0Link'})}>{x.text}</a>
                })
            }
            <div onClick={nav.menu.icon.onClick} className={prefix0({val:'0MenuIcon'})}></div>
            </div>
           
        </div>

        {/* mobile view */}
        <div style={nav.menu.mobile.style} className={prefix0({val:'0MenuPod'})}>
            {
                nav.links.items.map((x,i)=>{
                    return <a onClick={x.mobile.onClick}key={i} className={prefix0({val:'0MenuLink'})}>{x.text}</a>
                })
            }            
        </div>
        {/*  */}         


        </>
    )
    
}