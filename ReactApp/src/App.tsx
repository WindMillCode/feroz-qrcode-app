import React , {useState,useEffect} from 'react';
import './App.scss';
import { mediaPrefix,NftsItems,ipfs_conversion } from './customExports'
import NavPod from './components/nav/navPod'
import LoginPod from './components/login/loginPod'
import UploadPod from './components/upload/uploadPod';
import NFTSPod from './components/ntfs/nftsPod';
import { Route, Switch, useHistory } from 'react-router-dom';
import {env} from './env/prod';



function App() {

    let history = useHistory();
    let [nftsItems,setNftsItems] = useState<NftsItems[]>([]);

    window.addEventListener('resize',()=>{
        console.log(window.innerWidth)
    })
    useEffect(()=>{
        fetch(`${env.backend.url}/ipfs_list/${env.creds.user}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            ipfs_conversion({
                items:res.message.files,
                setFn:setNftsItems
            })
        })
        .catch(console.error)        
    },[env.creds.user])


    return (
        <>
            <NavPod history={history}/>
            <Switch>
                <Route exact path="/" render={
                    (props:any) => {

                        props.history = history
                        return <LoginPod  {...props}/>
                    }
                }>
                </Route>
                <Route path="/upload" render={
                    (props:any) => {

                        props.env = env
                        return <UploadPod  {...props}/>
                    }
                }>                    
                </Route>
                <Route path="/nfts" render={
                    (props:any) => {
                        props.env = env
                        props.nftsItems = nftsItems
                        props.setNftsItems = setNftsItems
                        return <NFTSPod  {...props}/>
                    }
                }>                    
                </Route>                
            </Switch>
        </>
    )
}

export default App;
