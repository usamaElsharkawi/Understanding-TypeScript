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
//# sourceMappingURL=guards.js.map