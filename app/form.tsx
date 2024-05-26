"use client"

import { SetStateAction, useState } from "react";
import Header from "./header";
import Tag from "./tag";

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
      }
    type action={
        action: 'fullname' | 'phone' |'email' | 'gender' | 'state' | 'megaregion' | 'region' | 'part' | 'instrument' | 'unit'; 
    }

      const [FormValues, setFormValues] = useState(initialValues)
      const [shouldTag, setShouldTag]=useState(false)

      const [dataUri, setDataUri] = useState<{img: string|ArrayBuffer}>({img:''})
      
      let changeValue:(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>, action:action["action"])=>void


      changeValue=(e,action)=>{
        let newFormValue = {...FormValues}
        newFormValue[`${action}`] = e.currentTarget.value!
        setFormValues(newFormValue)
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
       
          if (FormValues.email==='' ||FormValues.fullname==='' ||FormValues.gender==='' ||FormValues.instrument==='' ||FormValues.megaregion==='' ||FormValues.part==='' ||FormValues.phone==='' ||FormValues.region==='' ||FormValues.state==='' || FormValues.unit===''){
            return alert("All input fields are required")
          }
          else{
            if (dataUri.img==='') {
              return alert("Upload a valid passport photograph")
            } else {
              setShouldTag(true)
            }
          } 
        
      }

      
    
    return(
      <>
          <Header subtitle="Registration for Music Ministry" display={shouldTag ? 'hidden' : ''} />  
          <form className={`w-full px-2 md:px-10 ${shouldTag ? 'hidden' : ''}`}>
            <label htmlFor="fullname">Full name</label>
            <input id="fullname" name="fullname" type="text" value={FormValues.fullname} onChange={event=>changeValue(event, 'fullname')}/>

            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={FormValues.email} onChange={event=>changeValue(event, 'email')}/>

            <label htmlFor="gender"> Gender </label>
            <div>
              <input id="male" name="gender" type="radio" value="Male" onChange={event=>changeValue(event, 'gender')}/>
              <label htmlFor="male" className="inline mr-10 ml-2">Male</label>
              <input id="female" name="gender" type="radio" value="Female" onChange={event=>changeValue(event, 'gender')}/>
              <label htmlFor="female" className="inline ml-2">Female</label>
            </div>
            
            <label htmlFor="passport">Passport</label>
            <input id="passport" name="passport" type="file" multiple={false} onChange={event=>handeleUpload(event.target.files![0])}/>
            
            <label htmlFor="instrument">Instrument</label>
            <input id="instrument" name="instrument" type="text" value={FormValues.instrument} onChange={event=>changeValue(event, 'instrument')}/>

            <label htmlFor="mregion">Mega Region</label>
            <input id="mregion" name="mregion" type="text" value={FormValues.megaregion} onChange={event=>changeValue(event, 'megaregion')}/>

            <label htmlFor="region">Region</label>
            <input id="region" name="region" type="text" value={FormValues.region} onChange={event=>changeValue(event, 'region')}/>

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="text" value={FormValues.phone} onChange={event=>changeValue(event, 'phone')}/>

            <label htmlFor="part">Part</label>
            <input id="part" name="part" type="text" value={FormValues.part} onChange={event=>changeValue(event, 'part')}/>

            <label htmlFor="state">State</label>
            <input id="state" name="state" type="text" value={FormValues.state} onChange={event=>changeValue(event, 'state')}/>

            <label htmlFor="unit">Unit</label>
            <select id="unit" name="unit" value={FormValues.unit} onChange={event=>changeValue(event, 'unit')}>
            <option value="">Select an Option</option>
              <option value="Choir">Choir</option>
              <option value="Praise and Worship">Praise and Worship</option>
              <option value="Accapella">Accapella</option>
              <option value="Guitar Choir">Guitar Choir</option>
              <option value="Youth Choir">Youth Choir</option>
              <option value="Teenage Choir">Teenage Choir</option>
              <option value="Others">Others</option>
            </select>

            <div className="text-center">
              <input type="submit" value="Register" onClick={event=>{event.preventDefault(); submitForm()}} />
            </div>
          </form>

          <Tag form={FormValues} dataUri={dataUri} display={shouldTag ? '' : 'hidden'} />
      
      </>
    )

}