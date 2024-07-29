import Marquee from "react-fast-marquee";

export default function Announcement(){
    return(
        <Marquee pauseOnHover speed={100} gradient={false}>
           <div className="bg-gray-700 flex flex-row justify-center">
            <p className="text-white px-10">Registration Ends on Monday, 12th of August, 2024, 11:59PM!!!</p>
            <p className="text-white px-10">Registration Ends on Monday, 12th of August, 2024, 11:59PM!!!</p>
            <p className="text-white px-10">Registration Ends on Monday, 12th of August, 2024, 11:59PM!!!</p>
            <p className="text-white px-10">Registration Ends on Monday, 12th of August, 2024, 11:59PM!!!</p>
        </div> 
        </Marquee>
        
    )
}