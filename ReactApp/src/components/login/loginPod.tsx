import React, {useState,useEffect,MouseEventHandler} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix} from '../../customExports'
import {Pane} from 'evergreen-ui'

let prefix = classPrefix({view:'Login'});
let prefix0 = classPrefix({view:'LoginPod0'});

interface Props  {
    history:any
}

export default function LoginPod(props:Props) {

    let login = {
        user:{
            label:{
                text:'Username'
            }
        },
        pass:{
            label:{
                text:'Password'
            }
        },
        submit:{
            text:"Submit",
            onClick:(e: React.MouseEvent)=>{
                props.history.push('/upload')
            }
        }
    }


    return <div className={prefix({val:'View'})}>
        <div className={prefix0({val:''})}>
            <div className={prefix0({val:'Pod0'})}>
                <div className={prefix0({val:'Pod0Item'})} >
                    <label>{login.user.label.text}</label>
                    <input className={prefix0({val:'Pod0Input'})}/>
                </div>
                <div className={prefix0({val:'Pod0Item'})} >
                    <label>{login.pass.label.text}</label>
                    <input  className={prefix0({val:'Pod0Input'})}/>
                </div>  
                <button 
                onClick={login.submit.onClick}
                className={prefix0({val:'Pod0Button'})}>
                    {login.submit.text}
                </button>              
            </div>
        </div>
    </div>
}