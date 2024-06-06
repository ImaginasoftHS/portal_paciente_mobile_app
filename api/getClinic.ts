import { GetIdToken } from "./awsAuth";
import {api,hashClinic} from './api'


export interface ClinicStateTypes {
  clinicNif: string
  clinicId: string
  costCenterId: string
  clinicName: string
  costCenterName: string
  clinicKey: string
  clinicExists: boolean
  clinicLogoImage: string
}

export const getClinic = async () => {
  
  
  const response = await api.get(`/getclinic?key=${hashClinic}`);
  var result :ClinicStateTypes = response.data
  console.log("******GET_CLINIC*******");
  
  console.log(result)

  console.log("*******----******");
    return result;
  };
  