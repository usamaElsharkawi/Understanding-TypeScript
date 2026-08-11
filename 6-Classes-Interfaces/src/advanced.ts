class User {
    protected _firstName = "";
    private _lastName = "";

    set firstName(vlaue: string) {
        if (vlaue.trim() === '') {
            throw new Error("You must enter your first name")
        }
        this._firstName = vlaue;
    }

    set lastName(vlaue: string) {
        if (vlaue.trim() === '') {
            throw new Error("You must enter your first name")
        }
        this._lastName = vlaue;
    }
    get fullName() {
        return this._firstName + " " + this._lastName
    }

 static eid = 'USER'
 static greet(){
    console.log("hello!")
 }
}


const usama = new User()
usama.firstName = "usama"
usama.lastName = "el sharkawi"

console.log(User.eid)
console.log(usama.fullName);


class Emplyee extends User{
    constructor(public jobTitle:string){
        super();
    }

    work(){
        console.log(`${this._firstName} doing his work now`)
    }

}


const mohsen = new Emplyee("بتاع بكارى")
mohsen.firstName = "mohsen"

mohsen.work()


