type DataStore<T> = {
    [key:string]:T
}

const store: DataStore<boolean | string | number>  ={
    isStore:true
}