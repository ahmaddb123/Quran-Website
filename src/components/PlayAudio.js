import ReactAudioPlayer from "react-audio-player";

export default function PlayAudio(props) {

  return (
    <>
      <ReactAudioPlayer

        src={`${props.server}${
          props.number.length === 1
            ? "00"
            : props.number.length === 2
            ? "0"
            : ""
        }${props.number}.mp3`}
        controls
        className="rhap_container audio-anim"
      />
    </>
  );
}
