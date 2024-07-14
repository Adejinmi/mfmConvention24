import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

 
export async function POST(req: NextRequest) {

    let { phone, email } = await req.json()
    
      const existing = await prisma.participant.findUnique({
        where:{
          email:email,
          phone:phone,
        }
      })
      if (existing) {
        return NextResponse.json({ message: 'Successful', data:existing }) 
      }else{
        return NextResponse.json({ message: 'Null', data:{} }) 
      }

        

}
 
