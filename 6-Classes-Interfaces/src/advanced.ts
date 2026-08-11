class User {
    private _firstName = "";
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


}

const usama = new User()
usama.firstName = "usama"
usama.lastName = "el sharkawi"

console.log(usama.fullName);