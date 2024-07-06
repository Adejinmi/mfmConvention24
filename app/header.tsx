"use client"
import Image from "next/image"

type HeaderProps = {
    subtitle?:string
    display:string
}

export default function Header(props:HeaderProps){
    return(
        <div className={`text-center w-full grid grid-cols-6 ${props.display}`}>
          <Image src={'/mfm.png'} alt="MFM-Logo" width={130} height={130} />
          <div className="col-span-5">
            <h1 className="text-center text-3xl">MFM MUSIC MINISTRY</h1>
            <h1 className="text-2xl">2024 Convention</h1>
            {props.subtitle ? <h1 className="text-2xl">{props.subtitle}</h1> : ''}
          </div>
        </div>
    )
}