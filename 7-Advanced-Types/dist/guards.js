"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileSource = {
    path: 'some/path/to/file.csv',
};
const dbSource = {
    connectionUrl: 'some-connection-url',
};
function loadData(source) {
    if ("path" in source) {
        //source.path >>>open the file
        return;
    }
    //source.connectionUrl  to reach out a DB
}
//# sourceMappingURL=guards.js.map