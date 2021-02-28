const Shell = require("node-powershell");
const Downloader = require("nodejs-file-downloader");
const ps = new Shell({
  executionPolicy: "Bypass",
  noProfile: true,
});

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

  try {
    ps.addCommand(
      `ffmpeg -i ${file_name}/screen.mp4 -i ${file_name}/audio.mp4 -c copy -map 0:0 -map 1:1  out/${file_name}.mp4 `
    );
    await ps.invoke();
  } catch (error) {
    console.warn("ffmpeg was Diverted");
  }
  await ps.dispose();
};

const data = [
  {
    name: "99.09.18",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1607428240345",
  },
  {
    name: "99.09.25",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1608033234237",
  },
  {
    name: "99.09.30",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1608465291119",
  },
  {
    name: "99.10.02",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1608638144117",
  },
  {
    name: "99.10.07",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1609070038114",
  },
  {
    name: "99.10.09",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1609242390426",
  },
  {
    name: "99.10.14",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1609674563803",
  },
  {
    name: "99.10.16",
    id: "976848b6f5623bc884acaae59ecc4fc81d6d9bc9-1609847732613",
  },
];

let i = 7;

downloadMovie(data[i].id, data[i].name);
