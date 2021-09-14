

export  function mediaPrefix(devObj:any){
    let {media} = devObj
    return "./assets/media/"+media
}


export function classPrefix(devObj:{view:string}){
    let {view} = devObj
    let prefix = "a_p_p_"+view 
    return (devObj:{val:string})=>{
        let {val} = devObj
        return prefix+val
    }
}

// dev additions
export interface NftsItems {
    title:{
        text:string
    },
    qrcode:{
        text:string
    }
}

export let conversion = (devObj:{
    items:any[],
    setFn:Function
    bucket:string
})=>{
    let {items,setFn,bucket} = devObj
    let newItems = items.map((x,i)=>{
        return{
            title:{
                text:x.Key
            },
            qrcode:{
                text:`https://${bucket}.s3.amazonaws.com/${x.Key}"             
                `
            }
        }
    })
    setFn(newItems)
}