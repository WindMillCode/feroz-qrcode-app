import React , {useState,useEffect} from 'react';
import './App.scss';
import { mediaPrefix,NftsItems,conversion } from './customExports'
import NavPod from './components/nav/navPod'
import LoginPod from './components/login/loginPod'
import UploadPod from './components/upload/uploadPod';
import NFTSPod from './components/ntfs/nftsPod';
import { Route, Switch, useHistory } from 'react-router-dom';
import {env} from './env/dev';



function App() {

    let history = useHistory();
    let [nftsItems,setNftsItems] = useState<NftsItems[]>([]);
    useEffect(()=>{
        fetch(`${env.backend.url}/list/${env.creds.user}`)
        .then(res=>res.json())
        .then(res=>{
            conversion({
                items:res.message.files,
                setFn:setNftsItems,
                bucket:env.creds.bucket
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
