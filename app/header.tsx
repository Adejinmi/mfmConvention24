"use client"
import Image from "next/image"

type HeaderProps = {
    subtitle?:string
    display:string
}

export default function Header(props:HeaderProps){
    return(
        <div className={`text-center w-full ${props.display}`}>
          <Image src={'/mfm.png'} alt="MFM-Logo" width={100} height={100} className="absolute" />
          <h1 className="text-center text-3xl">MOUNTAIN OF FIRE AND MIRACLES MINISTRIES</h1>
          <h1 className="text-2xl">2024 Convention</h1>
          {props.subtitle ? <h1 className="text-2xl">{props.subtitle}</h1> : ''}
        </div>
    )
}