interface Authenticatable {
    email: string;
    password: string;

    login(): void;
    logout(): void;
}



const user: Authenticatable = {
    email: "user@exmple.com",
    password: "1111",
    username: "usususu",
    login() {
        //implement your login functionality here
    },
    logout() {
        //implement you logout functionality 
    }
}


//decleration merging 

interface Authenticatable {
    username: string
}


// fundtion types 
//with type alias
// type sumfn = (a:number,b:number)=>number;

//with interfarces

interface sumfn {
    (a: number, b: number): number
}



//extends you interface
interface AuthenticatableAdmin extends Authenticatable {
    role: "USER" | "ADMAIN"
}


let adminUser:AuthenticatableAdmin;



adminUser = {
    role:"ADMAIN",
    email: "user@exmple.com",
    password: "1111",
    username: "usususu",
    login() {
        //implement your login functionality here
    },
    logout() {
        //implement you logout functionality 
    }
    
}


