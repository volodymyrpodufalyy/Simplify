import RNFS from "react-native-fs"
import FileViewer from "react-native-file-viewer"
import { uuidv4 } from "./uuid"

const url =
  "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf"

// *IMPORTANT*: The correct file extension is always required.
// You might encounter issues if the file's extension isn't included
// or if it doesn't match the mime type of the file.
// https://stackoverflow.com/a/47767860
function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim()
}

const extension = getUrlExtension(url)

// Feel free to change main path according to your requirements.
const localFile = `${RNFS.DocumentDirectoryPath}/${uuidv4()}.${extension}`


export const openFile = async (url: string) => {
  await RNFS.downloadFile({ fromUrl: url, toFile: localFile })
    .promise.then(() => FileViewer.open(localFile))
    .then(() => {
      console.log("opened file")
    })
    .catch((error) => {
      console.log(error)
    })
}