const Shell = require("node-powershell");
const Downloader = require("nodejs-file-downloader");
const fs = require("fs");

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
  const path = `./${file_name}`;
  try {
    if (fs.existsSync(path + "/screen.mp4")) {
      console.log(path + "/screen.mp4" + " Alerady exists!");
    } else {
      let url = `https://meeting.kashanu.ac.ir/presentation/${session_id}/deskshare/deskshare.mp4`;
      dl(url, file_name, "screen.mp4");
    }
  } catch (error) {
    console.log(error);
  }
  try {
    if (fs.existsSync(path + "/audio.mp4")) {
      console.log(path + "/screen.mp4" + " Alerady exists!");
    } else {
      url = `https://meeting.kashanu.ac.ir/presentation/${session_id}/video/webcams.mp4`;
      dl(url, file_name, "audio.mp4");
    }
  } catch (error) {
    console.log(error);
  }
};

const mergeMovies = async (file_name) => {
  try {
    await ps.addCommand(
      `ffmpeg -i ${file_name}/screen.mp4 -i ${file_name}/audio.mp4 -c copy -map 0:0 -map 1:1  out/${file_name}.mp4 `
    );
    await ps.invoke();
  } catch (error) {
    console.log(error);
  }
  await ps.dispose();
};

downloadMovie(OS_Example[0].id, OS_Example[0].name);

const OS_Example = [
  {
    name: "13991126",
    id: "e5dcf22bcc741137673aa1edcf4d659d655aa557-1613282647499",
  },
  {
    name: "13991128",
    id: "837ae220c1a2caa38d1480d90c099dd9c70db4bc-1613455212015",
  },
  {
    name: "13991203",
    id: "0f6b7ab4a03be4ebfe6801a6347f0e22e3067270-1613887371930",
  },
  {
    name: "13991205",
    id: "74f611125da15b6da6c449caa909ee71533d458c-1614060029439",
  },
  {
    name: "13991210",
    id: "c75600134e09c12b105553ef8897d413a6a97273-1614491829952",
  },
  {
    name: "13991212",
    id: "ab32db247a14c7549c041503944df10e81b2c0ff-1614664483570",
  },
  {
    name: "13991217",
    id: "9d75f4ad2c443864cd2ae547f5e6ee18219b16ee-1615096561530",
  },
  {
    name: "13991224",
    id: "90ff7191371b1e8c75ff41ba5d8532d945361d0e-1615701323587",
  },
  {
    name: "13991226",
    id: "09229ea4ee3b694a955fe40df3c0e4f9f96ad693-1615874119141",
  },
  {
    name: "14000115",
    id: "1adfad7866903b993fd9bf5d929c39e605aaf4e3-1617512185073",
  },
  {
    name: "14000117",
    id: "e33b731263deb60c0a858a48c45aa09c2b2cadcf-1617684955165",
  },
];
