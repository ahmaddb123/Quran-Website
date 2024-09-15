import { faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

export default function ButtonRadio() {
  const [urlsRadio, setUrlsRadio] = useState([]);
  const [showRadio, setShowRadio] = useState(false);

  useEffect(() => {
    const fetchRadio = async () => {
      try {
        const res = await fetch("https://mp3quran.net/api/v3/radios");
        const data = await res.json();
        setUrlsRadio(data.radios);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRadio();
  }, []);

  const toggleRadio = () => {
    setShowRadio((prevState) => !prevState);
  };

  return (
    <>
      <button   className="buttonRadio" onClick={toggleRadio} title="راديو مباشر">
        <FontAwesomeIcon className="icon" icon={faTowerBroadcast} />
      </button>
      <div className="boxRadio">
        <AnimatePresence>
          {showRadio && urlsRadio.length > 0 && urlsRadio[55] && (
            <motion.div
              className="box "
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <ReactAudioPlayer
                src={urlsRadio[55].url}
                controls
                className=" buttonRadioAudio"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
