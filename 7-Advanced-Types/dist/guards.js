"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileSource = {
    type: "file",
    path: 'some/path/to/file.csv',
};
const dbSource = {
    type: "db",
    connectionUrl: 'some-connection-url',
};
function isFile(source) {
    return source.type === "file";
}
function loadData(source) {
    if (isFile(source)) {
        //source.path >>>open the file
        return;
    }
    //source.connectionUrl  to reach out a DB
}
class User {
    name;
    constructor(name) {
        this.name = name;
    }
    join() {
        // ...
    }
}
class Admin {
    constructor(permissions) { }
    scan() {
        // ...
    }
}
function isAdmin(entity) {
    return entity instanceof Admin;
}
function init(entity) {
    if (isAdmin(entity)) {
        entity.scan(); // ✅ TypeScript narrows to Admin
    }
    else {
        entity.join(); // ✅ TypeScript narrows to User
    }
}
const user = new User("Max");
const admin = new Admin(["ban", "restore"]);
init(admin);
init(user);
//# sourceMappingURL=guards.js.map