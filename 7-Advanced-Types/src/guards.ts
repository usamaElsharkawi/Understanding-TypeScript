type FileSource = {type:"file", path: string };
const fileSource: FileSource = {
  type:"file",
  path: 'some/path/to/file.csv',
};

type DBSource = {type:"db", connectionUrl: string };
const dbSource: DBSource = {
  type:"db",
  connectionUrl: 'some-connection-url',
};

type Source = FileSource | DBSource;


function isFile(source: Source): source is FileSource {
  return source.type === "file";
}

function loadData(source: Source) {
  if(isFile(source)){
    //source.path >>>open the file
    return;
  }
  //source.connectionUrl  to reach out a DB
}





class User {
  constructor(public name: string) {}

  join() {
    // ...
  }
}

class Admin {
  constructor(permissions: string[]) {}

  scan() {
    // ...
  }
}

type Entity = User | Admin;

function isAdmin(entity: Entity): entity is Admin {
  return entity instanceof Admin;
}

function init(entity: Entity) {
  if (isAdmin(entity)) {
    entity.scan(); // ✅ TypeScript narrows to Admin
  } else {
    entity.join(); // ✅ TypeScript narrows to User
  }
}

const user = new User("Max");
const admin = new Admin(["ban", "restore"]);
init(admin);
init(user);