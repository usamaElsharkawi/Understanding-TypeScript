type DataStore = {
    [prop:string]:boolean |number ;
}


let store:DataStore = {};

store.id = 5;
store.isOpen = false;


const role = ["admin","guest","editor"] as const ;
