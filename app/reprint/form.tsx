"use client"

import { useState } from "react";
import Header from "../header";
import Tag from "../tag";

export interface formValues{
    fullname: string;
    phone:string;
    email:string;
    gender:string;
    state:string;
    megaregion:string;
    region:string;
    part:string;
    instrument:string;
    unit:string;
    tagnumber:string;
  }
export default function Form() {
     const initialValues:formValues = {
        fullname:'',
        phone:'',
        email:'',
        gender:'',
        state:'',
        megaregion:'',
        region:'',
        part:'',
        instrument:'',
        unit:'',
        tagnumber:''
      }
    type action={
        action:  'phone' |'email';
    }

      const [FormValues, setFormValues] = useState(initialValues)
      const [reprint, setReprint] = useState({email:"", phone:""})
      const [shouldTag, setShouldTag]=useState(false)
      const [submitValue, setSubmitValue] = useState("Print Tag")
      const [shouldDisable, setShouldDisable] = useState(false)
      const [dataUri, setDataUri] = useState<{img: string|ArrayBuffer}>({img:''})
      
      let changeValue:(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>, action:action["action"])=>void


      changeValue=(e,action)=>{
        let newReprint = {...reprint}
        newReprint[`${action}`] = e.currentTarget.value!
        setReprint(newReprint)
      }

      const fileToDataUri = (file:File) => new Promise<string | ArrayBuffer>((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (event)=> {
          resolve(event.target!.result!)
        };
        reader.readAsDataURL(file)
      })

      let handeleUpload:(file:File)=>void
      

      handeleUpload=(file)=>{
        if (!file) {
          setDataUri({img:''})
        } else {

          fileToDataUri(file)
          .then(data => {setDataUri({img:data})})
        }
      }

      const submitForm = ()=>{
       
           if (reprint.email==='' || reprint.phone==='' ){
             setShouldDisable(false);
             setSubmitValue("Print Tag")
             return alert("All input fields are required")
          }
          else{
            if (dataUri.img==='') {
              setShouldDisable(false);
              setSubmitValue("Print Tag")
              return alert("Upload a valid passport photograph")
            } else {
              fetch(`/api/reprint`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reprint),
              })
              .then((res) => res.json())
              .then((data) => {
                let values = data.data
                let { email,       
                name,        
                phone,       
                gender,      
                state,       
                megaregion,  
                region,      
                part,        
                instrument,  
                unit,        
                tagnumber } = values
                let fullname=name
                let tagValues = {email, fullname, phone, gender, state, megaregion,region, part, instrument,unit, tagnumber}
                if(data.message==="Successful"){
                  setFormValues(tagValues)
                  setShouldTag(true)
                }else if(data.message==="Null"){
                  alert("Details not found. Please input your details as you did when registering");
                  setShouldDisable(false);
                  setSubmitValue("Print Tag")
                }else{
                  alert(`Something went wrong try again`)
                  setShouldDisable(false);
                  setSubmitValue("Print Tag")
                }
              })
              .catch((error) => {console.log(error)
              });
            }
          }
        
      }

      
    
    return(
      <>
          <Header subtitle="Re-Print Tag" display={shouldTag ? 'hidden' : ''} />  
          <form className={`w-full px-2 md:px-10 ${shouldTag ? 'hidden' : ''}`}>
            
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={reprint.email} onChange={event=>changeValue(event, 'email')}/>

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="text" value={reprint.phone} onChange={event=>changeValue(event, 'phone')}/>

            <label htmlFor="passport">Passport</label>
            <input id="passport" name="passport" type="file" multiple={false} onChange={event=>handeleUpload(event.target.files![0])}/>
          

            <div className="text-center">
              <input className={shouldDisable ? "cursor-pointer bg-gray-600 p-3 text-white my-4 text-center": "cursor-pointer bg-green-600 p-3 text-white my-4 text-center"} type="submit" disabled={shouldDisable} value={submitValue} onClick={event=>{event.preventDefault(); setSubmitValue('Processing...'); setShouldDisable(true); submitForm()}} />
            </div>
          </form>

          <Tag form={FormValues} dataUri={dataUri} display={shouldTag ? '' : 'hidden'} setShouldTag={setShouldTag} setFormValues={setFormValues} setShouldDisable={setShouldDisable} setSubmitValue={setSubmitValue}/>
      
      </>
    )

}
