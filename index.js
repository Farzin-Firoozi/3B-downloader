// const Shell = require("node-powershell");
const { exec } = require("child_process");

const Downloader = require("nodejs-file-downloader");
// const ps = new Shell({
//   executionPolicy: "Bypass",
//   noProfile: true,
// });

const dl = async (url, directory, name) => {
  console.log("downloading", directory, name);
  const downloader = new Downloader({
    url: url,
    directory: directory,
    fileName: name,
    cloneFiles: false,
    onProgress: function (percentage) {
      process.stdout.write("Downloading " + percentage + "% complete... \r");
    },
  });

  try {
    await downloader.download();
    console.log("--------------------done-------------------");
  } catch (error) {
    console.log(error);
  }
};

const downloadMovie = async (session_id, file_name) => {
  let url = `https://meeting.kashanu.ac.ir/presentation/${session_id}/deskshare/deskshare.mp4`;
  await dl(url, file_name, "screen.mp4");

  url = `https://meeting.kashanu.ac.ir/presentation/${session_id}/video/webcams.mp4`;
  await dl(url, file_name, "audio.mp4");

  exec(
    `ffmpeg -i ${file_name}/screen.mp4 -i ${file_name}/audio.mp4 -c copy -map 0:0 -map 1:1  out/${file_name}.mp4 `,
    (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    }
  );

  // try {
  //   ps.addCommand();
  //   await ps.invoke();
  // } catch (error) {
  //   console.warn("ffmpeg was Diverted");
  // }
  // await ps.dispose();
};

downloadMovie(
  "74f611125da15b6da6c449caa909ee71533d458c-1614060029439",
  "compiler_3"
);
