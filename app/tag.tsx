"use client"

import Image from "next/image"
import { formValues } from "./form"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

type TagProps = {
    form:formValues,
    dataUri:{
        img: string | ArrayBuffer
    }
    display:string
}


export default function Tag (props:TagProps ){
    const myref = useRef(null)
    
   
        const handlePrint = useReactToPrint({
            content: ()=> myref.current,
        })
    
    return(
        <>
            <div ref={myref} className={`bg-mfm bg-no-repeat bg-contain bg-center ${props.display} w-4/5`}>
            <div className={`w-full grid grid-cols-3 h-96 p-5 bg-white bg-opacity-95`}>
                <div className="col-span-2 content-center">
                    <h1 className="text-9xl text-gray-600 font-bold">MUSIC</h1>
                </div>
                <div className="justify-center">
                    <Image src={`${props.dataUri.img}`} alt="Passport" width={150} height={150}/>
                </div>
                
                <div>
                    <p className="title">Full name</p>
                    <p className="subtitle">{props.form.fullname}</p>
                </div>

                <div>
                    <p className="title">Mega Region</p>
                    <p className="subtitle">{props.form.megaregion}</p>
                </div>

                <div>
                    <p className="title">Region</p>
                    <p className="subtitle">{props.form.region}</p>
                </div>

                <div className="col-span-2">
                    <p className="title">Phone Number</p>
                    <p className="subtitle">{props.form.phone}</p>
                </div>

                <div>
                    <p className="title">Gender</p>
                    <p className="subtitle">{props.form.gender}</p>
                </div>

                <div className="col-span-2">
                    <p className="title">Unit</p>
                    <p className="subtitle">{props.form.unit}</p>
                </div>
                
                <div>
                    <p className="title">State</p>
                    <p className="subtitle">{props.form.state}</p>
                </div>

            </div>
            </div>
            <button className={`${props.display} p-2 bg-green-500 text-white`} onClick={event=>handlePrint()}>Print Tag</button>
        </>
        
    )
}