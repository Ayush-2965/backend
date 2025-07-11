import path from "path";
import {
  open,
  write,
  close,
  read,
  createReadStream,
  existsSync,
  statSync,
} from "fs";
import { fileURLToPath } from "url";
import express from "express";
import { render } from "ejs";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const _filename = path.basename(fileURLToPath(import.meta.url));
const dirname = path.dirname(_filename);

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "views"));
app.use(express.static(path.join(dirname, "public")));

//no return no response ==> infinite loading
app.get("/", (req, res) => {
  console.log("server runs successfully");
  res.render("index", { title: "Ayush" });
});

app.get("/api/file", async (req, res) => {
  console.log("hit on /file endpoint", req.query.filename);
  const filename = req.query.filename;
  const premium = req.query.premium;

  console.log(req.headers);

  let sent = 0,
    lastLoggedPercent = 0;
  const chunkSize = 100 * 1024;

  let throttleRate = 512 * 1024; // 512 KB/sec
  if (premium && premium == "t") {
    throttleRate = 4 * 1024 * 1024; //4MB/sec
  } else {
    throttleRate = 512 * 1024; //512KB/sec
  }
  const filePath = path.join(dirname, "files", filename);

  if (!existsSync(filePath)) return res.status(404).send("❌ File not found");

  const stat = statSync(filePath); //file data
  const totalSize = stat.size; //total bytes of file

  const chunkDelay = (chunkSize / throttleRate) * 1000;
  const stream = createReadStream(filePath, {
    highWaterMark: chunkSize,
  });

  res.setHeader("Content-Length", `${totalSize}`);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  stream.pause(); // start paused

  function sendChunk() {
    const chunk = stream.read();

    if (chunk) {
      sent += chunk.length;
      const percent = ((sent / totalSize) * 100).toFixed(2);

      if (percent - lastLoggedPercent >= 1 || sent === totalSize) {
        lastLoggedPercent = percent;
        console.log(`Sent: ${sent}/${totalSize} bytes (${percent}%)`);
      }

      const canContinue = res.write(chunk);
      if (!canContinue) {
        res.once("drain", () => {
          setTimeout(sendChunk, chunkDelay);
        });
      } else {
        setTimeout(sendChunk, chunkDelay);
      }
    } else {
      stream.once("readable", sendChunk);
    }
  }

  res.on("close", () => {
    console.log("\n.... Download cancelled or connection closed");
    stream.destroy();
  });
  stream.on("end", () => res.end());
  stream.on("error", (err) => {
    console.error("Stream error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });

  sendChunk();
});

app.on("error", (err) => {
  console.log("server start error", err);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log(`server listens to http://localhost:${PORT}`);
});

// open('test.txt', 'r', (err, fd) => {//fd file descriptor opens with file for doing read write operations
//   if (err) throw err;
//   // const buffer = Buffer.from('Hello Ayush!');
//   read(fd, Buffer.alloc(20), 0, 1, 0, (err, written,buffer) => {
//     if (err) throw err;
//     // console.log(`${written} bytes written`);
//     const data=buffer.toString()
//     console.log(data.length,data); //20 why? we get buffer/typedArray form data of 20 size (as allocated during read)

//     close(fd, () => {});
//   });
// });

const fakedir = path.dirname(import.meta.filename);
// const ext=path.extname(fakedir)
// const onlyname=path.basename(fakedir,ext)
console.log(fakedir, import.meta.url, import.meta.filename);

// console.log(ext,onlyname);
