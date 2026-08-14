// const user:AppUser = {
//     name:"usama",
//     age:33,
//     permissions:[
//         {
//             id:"1",
//             title:"admin",
//             description:"can do anything"
//         },
//         {
//             id:"2",
//             title:"user",
//             description:"can do something"
//         }
//     ]
// }



type AppUser = {
    name:string,
    age:number,
    permissions:{
        id:string,
        title:string,
        description:string
    }[]
}



type Perms = AppUser["permissions"]
type Perm = Perms[number]