type FileSource = {type:"file", path: string };
const fileSource: FileSource = {
  type:"file",
  path: 'some/path/to/file.csv',
};

type DBSource = {type:"file", connectionUrl: string };
const dbSource: DBSource = {
  type:"file",
  connectionUrl: 'some-connection-url',
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
  if(source.type === 'file'){
    //source.path >>>open the file
    return;
  }
  //source.connectionUrl  to reach out a DB
}