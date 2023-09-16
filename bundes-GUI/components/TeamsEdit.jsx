import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiTwotoneFlag } from "react-icons/ai";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { getTeamImageByName } from "@/data_fetchers/home_page_fetchers/team_image_fetcher";
import { PiUploadSimpleBold } from "react-icons/pi";
import { TiCancel } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { steps } from "framer-motion";
import { saveOrUploadTeamLogo } from "@/api/UpdateOrSaveTeamLogo";

const TeamsEdit = () => {
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState();
  const [foundTeamImage, setFoundTeamImage] = useState();

  const cancelUploading = () => {
    setTeamName("");
    setTeamImage();
    setFoundTeamImage();
  };

  const saveTeamLogo=()=>{
    const textEncoder = new TextEncoder();
    saveOrUploadTeamLogo(teamName, teamImage.split("data:image/png;base64,")[1])
    .then(response => {
      if (response.ok) {
        const statusCode = response.status;
        const statusText = response.statusText;
        toast.success("Team logo uploaded successfully. " + statusText);
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
    setTeamName(acceptedFiles[0].name.split(/\.(png|jpg)/)[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setTeamImage(imageDataUrl);
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    let timeoutId;
    const fetchTeamImage = async () => {
      if (teamName) {
        const response = await getTeamImageByName(teamName);
        const data = await response.json();

        if (data.teamImageUrl !== null) {
          setFoundTeamImage(data.teamImageUrl);
          toast.warn(
            teamName +
              "'s logo already exists, by uploading image, that will be overwritten"
          );
        } else {
          setFoundTeamImage();
        }
      }
    };

    const delay = 500;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fetchTeamImage, delay);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [teamName]);


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-gray-200 p-3 flex min-h-screen space-x-3">
      <div className="flex w-full bg-white h-2/3 flex-col space-y-3 rounded-lg p-2">
        <ToastContainer />
        <div
          className={`bg-white  p-3  flex flex-col space-y-2 items-center justify-center ${!teamImage?"border border-dashed border-black":""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className={` rounded-lg h-80 w-1/3 flex items-center justify-center hover:cursor-pointer ${teamImage?"opacity-50":""}`}>
            {!teamImage && (
              <AiOutlineCloudUpload className="text-9xl"></AiOutlineCloudUpload>
            )}
            {teamImage && (
              <Image
                className=" rounded-[50%] h-full w-full"
                src={teamImage}
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
              <AiTwotoneFlag className="flex-3 text-2xl"></AiTwotoneFlag>
              <input
                value={teamName}
                className="flex-1 p-1 bg-gray-200 rounded-r-lg h-full "
                placeholder="team name"
                onChange={(event) => setTeamName(event.target.value)}
              ></input>
            </div>
          </div>
          {foundTeamImage && (
            <div className="flex flex-col w-1/2 h-1/2 rounded-lg p-2 items-center justify-center space-y-2">
              <Image
                className=" rounded-[50%] h-full w-full"
                src={`data:image/png;base64,${foundTeamImage}`}
                width="30"
                height="30"
                alt="user"
              ></Image>
              <span className="bg-gray-300 rounded-lg p-2">Existing logo</span>
            </div>
          )}
        </div>
        {teamImage && (
          <div className="flex p-3 items-center justify-center space-x-3 ">
            <div onClick={()=>saveTeamLogo()} className="flex items-center justify-center border border-green-500 pr-2 pl-2 rounded-lg hover:cursor-pointer">
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

export default TeamsEdit;
