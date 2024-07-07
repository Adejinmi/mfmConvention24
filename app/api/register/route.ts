import { PrismaClient } from '@prisma/client'
import { aleaRNGFactory } from "number-generator";
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
const { uInt32 } = aleaRNGFactory(4);

 
export async function POST(req: NextRequest) {
  let random = uInt32()
  let tagnumber =`${random}`
    let { fullname, phone, email, gender,
      state, megaregion,
      region,
      part,
      instrument,
      unit} = await req.json()
      let name = fullname
      let data = {email,       
        name,        
        phone,       
        gender,      
        state,       
        megaregion,  
        region,      
        part,        
        instrument,  
        unit,        
        tagnumber}
      const existing = await prisma.participant.findUnique({
        where:{
          email:email,
          phone:phone,
        }
      })
      if (existing) {
        return NextResponse.json({ message: 'Duplicate', data:existing }) 
      }else{
        const person = await prisma.participant.create({
          data
        })
        if (person) {
          return NextResponse.json({ message: 'Successful', data:person }) 
        }else{
          return NextResponse.json({ message: 'Error'})
        }
      }

        

}
 
