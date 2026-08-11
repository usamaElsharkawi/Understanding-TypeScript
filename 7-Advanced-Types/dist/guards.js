"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileSource = {
    type: "file",
    path: 'some/path/to/file.csv',
};
const dbSource = {
    type: "file",
    connectionUrl: 'some-connection-url',
};
function loadData(source) {
    if (source.type === 'file') {
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
const user = new User('Max');
const admin = new Admin(['ban', 'restore']);
function init(entity) {
    if (entity instanceof User) {
        entity.join();
        return;
    }
    entity.scan();
}
//# sourceMappingURL=guards.js.map