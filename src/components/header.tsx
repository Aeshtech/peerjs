import { useState } from "react";
import { CameraOffSVG, CameraOnSVG, MicOffSVG, MicOnSVG } from "./icons";
import { writeClipboardText } from "../utils/helpers";

const Header = ({
  myPeerId,
  roomId,
  handleVideoToggle,
  handleAudioToggle,
}: {
  myPeerId: string;
  roomId: string;
  handleVideoToggle: (userId: string) => void;
  handleAudioToggle: (userId: string) => void;
}) => {
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicOn, setMicOn] = useState(true);

  return (
    <header
      className="h-[50px] flex items-center justify-between px-20 w-full border-[1px] border-[#ffffff1f] rounded-t-[10px]"
      style={{
        boxShadow: "inset 2px 2px 10px #  050505ba",
      }}
    >
      <div>
        <h1 className="logo text-blackWhite text-2xl">PeerCoder</h1>
      </div>
      <div className="flex gap-x-[15px]">
        <button
          className={`w-[40px] h-[40px] rounded-full flex-center border-[1px] border-[#ffffff1f] ${
            !isMicOn && "bg-[#8b0000]"
          }`}
          style={{
            boxShadow: "inset 2px 2px 10px #050505ba",
          }}
          onClick={() => {
            handleAudioToggle(myPeerId);
            setMicOn((prev) => !prev);
          }}
        >
          {isMicOn ? <MicOnSVG fill="white" /> : <MicOffSVG fill="white" />}
        </button>
        <button
          className={`w-[40px] h-[40px] ml-[10px] rounded-full flex-center border-[1px] border-[#ffffff1f] ${
            !isCameraOn && "bg-[#8b0000]"
          }`}
          style={{
            boxShadow: "inset 2px 2px 10px #050505ba",
          }}
          onClick={() => {
            handleVideoToggle(myPeerId);
            setCameraOn((prev) => !prev);
          }}
        >
          {isCameraOn ? (
            <CameraOnSVG fill="white" />
          ) : (
            <CameraOffSVG fill="white" />
          )}
        </button>
      </div>
      <button
        className="px-[10px] py-[5px] text-white flex-center rounded-[5px] border-[1px] border-[#ffffff1f] active:bg-[green]"
        style={{ boxShadow: "0 0 5px #171716e3" }}
        onClick={() => writeClipboardText(window.location.href)}
      >
        Copy Room URL
      </button>
    </header>
  );
};

export default Header;
