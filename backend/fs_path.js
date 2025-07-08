import path from "path"
import { open, write, close ,read} from 'fs';


open('test.txt', 'r', (err, fd) => {//fd file descriptor opens with file for doing read write operations
  if (err) throw err;
  // const buffer = Buffer.from('Hello Ayush!');
  read(fd, Buffer.alloc(20), 0, 1, 0, (err, written,buffer) => {
    if (err) throw err;
    // console.log(`${written} bytes written`);
    const data=buffer.toString()
    console.log(data.length,data); //20 why? we get buffer/typedArray form data of 20 size (as allocated during read)
    
    close(fd, () => {});
  });
});


// const fakedir=path.basename(import.meta.filename)
// const ext=path.extname(fakedir)
// const onlyname=path.basename(fakedir,ext)
// console.log(fakedir,import.meta.url);

// console.log(ext,onlyname);

