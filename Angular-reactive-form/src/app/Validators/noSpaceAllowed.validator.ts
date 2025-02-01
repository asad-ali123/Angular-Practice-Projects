import { AbstractControl, FormControl } from "@angular/forms";


//*create using a arrow function
// export const noSpaceAllowed = (control: FormControl)=>{
//     if(control.value != null && control.value.indexOf(" ") !=-1){
//         return {noSpaceAllowed: true};
//     }
//     return null;

// }

// * create using method
export class CustomValidator{
  static  noSpaceAllowed (control: FormControl){
        if (control.value != null && control.value.indexOf(" ") != -1) {
            return { noSpaceAllowed: true };
        }
        return null;

    }

    static checkUsername (control : AbstractControl):Promise<any>{
        return userNameAllowed(control.value)

    }


}


function userNameAllowed(username : string){
    const existingUsers =['ali' , 'bilal' , 'tariq'];
    return new Promise((res , rej)=>{
        setTimeout(() => {
            if(existingUsers.includes(username)){
                res({userNameAllowed:true});
            }else{
                return res(null);
            }
        }, 3000);
    })
    

}