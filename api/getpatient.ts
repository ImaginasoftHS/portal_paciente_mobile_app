import { GetIdToken } from "./awsAuth";
import {api} from './api'
export const getPatient = async (user: any) => {
    console.log("*******GET_PATIENT******");
    
    console.log(user)

    console.log("*************");


    const response = await api.get('/getpatient', {
      
      params: {
        clinicNif: user["custom:clientNif"],
        patientNif: user["custom:ClientNif"],
        patientEmail: user.email
      },
      
    });
    
    return response.data;
  };
  