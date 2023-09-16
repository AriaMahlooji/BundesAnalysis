import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaPersonWalking } from "react-icons/fa6";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { getPlayerImageByFullName } from "@/data_fetchers/home_page_fetchers/player_image_fetcher";
import { PiUploadSimpleBold } from "react-icons/pi";
import { TiCancel } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { steps } from "framer-motion";
import { saveOrUploadPlayerImage } from "@/api/UpdateOrSavePlayerImage";

const PlayersEdit = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerImage, setPlayerImage] = useState();
  const [foundPlayerImage, setFoundPlayerImage] = useState();

  const cancelUploading = () => {
    setPlayerName("");
    setPlayerImage();
    setFoundPlayerImage();
  };

  const savePlayerImage=()=>{
    const textEncoder = new TextEncoder();
    saveOrUploadPlayerImage(playerName, playerImage.split("data:image/jpeg;base64,")[1])
    .then(response => {
      if (response.ok) {
        const statusCode = response.status;
        const statusText = response.statusText;
        toast.success("Player Image uploaded successfully. " + statusText);
        cancelUploading();
      } else {
        toast.error("Request failed with status:", response.status);
      } 
    })
    .catch(error => {
      toast.error("Fetch error:", error);
    });
  }

  let image;
  const onDrop = (acceptedFiles) => {
    image = acceptedFiles[0];
    setPlayerName(acceptedFiles[0].name.split(/\.(png|jpg)/)[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      console.log(imageDataUrl);
      setPlayerImage(imageDataUrl);
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    let timeoutId;

    const fetchPlayerImage = async () => {
      if (playerName) {
        const response = await getPlayerImageByFullName(playerName);
        const data = await response.json();

        if (data.playerImageUrl !== "") {
          setFoundPlayerImage(data.playerImageUrl);
          toast.warn(
            playerName +
              "'s image already exists, by uploading image will be overwritten"
          );
        } else {
          setFoundPlayerImage("");
        }
      }
    };

    const delay = 500;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fetchPlayerImage, delay);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [playerName]);

  useEffect(() => {
    if (foundPlayerImage && playerImage) {
      
    }
  }, [foundPlayerImage, playerImage]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-gray-200 p-3 flex min-h-screen space-x-3">
      <div className="flex w-full bg-white h-2/3 flex-col space-y-3 rounded-lg p-2">
        <ToastContainer />
        <div
          className={`bg-white  p-3  flex flex-col space-y-2 items-center justify-center ${!playerImage?"border border-dashed border-black":""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className={`bg-white rounded-lg h-80 w-1/3 flex items-center justify-center hover:cursor-pointer ${playerImage?"opacity-50":""}`}>
            {!playerImage && (
              <AiOutlineCloudUpload className="text-9xl"></AiOutlineCloudUpload>
            )}
            {playerImage && (
              <Image
                className=" rounded-[50%] h-full w-full"
                src={playerImage}
                width="30"
                height="30"
                alt="user"
              ></Image>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex bg-white p-1 rounded-lg h-10 w-1/2  hover:cursor-pointer">
            <div className="flex items-center w-full border border-gray-300 rounded-lg">
              <FaPersonWalking className="flex-3 text-2xl"></FaPersonWalking>
              <input
                value={playerName}
                className="flex-1 p-1 bg-gray-200 rounded-r-lg h-full "
                placeholder="player name"
                onChange={(event) => setPlayerName(event.target.value)}
              ></input>
            </div>
          </div>
          {foundPlayerImage && (
            <div className="flex flex-col w-1/2 h-1/2 rounded-lg p-2 items-center justify-center space-y-2">
              <Image
                className=" rounded-[50%] h-full w-full"
                src={`data:image/png;base64,${foundPlayerImage}`}
                width="30"
                height="30"
                alt="user"
              ></Image>
              <span className="bg-gray-300 rounded-lg p-2">Existing image</span>
            </div>
          )}
        </div>
        {playerImage && (
          <div className="flex p-3 items-center justify-center space-x-3 ">
            <div onClick={()=> savePlayerImage()} className="flex items-center justify-center border border-green-500 pr-2 pl-2 rounded-lg hover:cursor-pointer">
              <PiUploadSimpleBold className="flex-5 text-green-800" />
              <span className="flex-1">Upload</span>
            </div>
            <div
              onClick={() => cancelUploading()}
              className="flex items-center justify-center border border-red-500 pr-2 pl-2 rounded-lg hover:cursor-pointer"
            >
              <TiCancel className="flex-5 text-red-800" />
              <span className="flex-1">Cancel</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersEdit;
