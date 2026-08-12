type DataStore<T> = {
    [key:string]:T
}

const store: DataStore<boolean | string | number>  ={
    isStore:true
}


//generic functions

function merge<T>(a:T,b:T){
    return [a,b]
}