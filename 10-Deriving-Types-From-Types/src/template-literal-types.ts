type ReadPermission = "read" | "no-read";
type WritePermission = "write" | "no-write";

type Permissions = `${ReadPermission}-${WritePermission}`;


type DataFile ={
    data:string,
    permissions:Permissions
}


type DataFileEventNames = `${keyof DataFile}-changed`


type DataFileEvents = {
    [K in DataFileEventNames]: () => void
}
