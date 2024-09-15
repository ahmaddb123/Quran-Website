import { faPlay, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import ButtonRadio from "./ButtonRadio";

export default function Radio() {
  const [urlsRadio, setUrlsRadio] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRadio = async () => {
      try {
        const res = await fetch("https://mp3quran.net/api/v3/radios");
        const data = await res.json();
        setUrlsRadio(data.radios);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchRadio();
    window.scrollTo(0, 0);
  }, []);
  if (loading) {
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="container-radio">
      <div className="container">
        <div className="dataRadio">
          <h1 className="title-ayah">
            <FontAwesomeIcon icon={faTowerBroadcast} /> إذاعة القرأن الكريم "بث
            مباشر"
          </h1>
          <h5 className="descriptionChange">البث المباشر على مدار اليوم لإذاعة القرآن الكريم Equran، قم بالضغط على علامة  <FontAwesomeIcon icon={faPlay} /> لتشغيل البث</h5>
          <ul>
            <h5>إذاعات القرأن الكريم :</h5>
            <li>{urlsRadio[10].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[10].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[11].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[11].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[12].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[12].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[46].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[46].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[55].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[55].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
          </ul>
          <ul>
            <h5>إذاعات الأذكار :</h5>
            <li>{urlsRadio[37].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[37].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[40].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[40].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[45].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[45].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
          </ul>
          <ul>
            <h5>إذاعات السنة النبوية الشريفة :</h5>
            <li>{urlsRadio[13].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[13].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[44].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[44].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[67].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[67].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[69].name}</li>
            <ReactAudioPlayer
              src={urlsRadio[69].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
          </ul>
          <ul>
            <h5>إذاعات خاصة بقرائ معينين :</h5>
            <li>{urlsRadio[88].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[88].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[64].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[64].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[117].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[117].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[123].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[123].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <li>{urlsRadio[140].name.split("-")}</li>
            <ReactAudioPlayer
              src={urlsRadio[140].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
          </ul>
        </div>
      </div>
        <ButtonRadio/>
    </div>
  );
}
