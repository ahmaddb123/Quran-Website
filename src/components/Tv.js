import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Tv() {
  const [urlTv, setUrlTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://win.holol.com/live/quran/playlist.m3u8"
  );

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const res = await fetch("https://mp3quran.net/api/v3/live-tv");
        const data = await res.json();
        setUrlTv(data.livetv);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching TV data:", error);
        setLoading(true);
      }
    };
    fetchTv();
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
    <div className="tv-container">
      <div className="container">
        <div className="allDataTv">
          <div className="dataTv">
            <h5 className="description">البث المباشر على مدار اليوم لقناة القرآن الكريم والسنة النبوية الشريفة</h5>
            <h5 className="description">أضغط على الزر لتشغيل القناة المطلوبة</h5>
            {urlTv.map((tv) => (
              <h1
                className="btn-tv "
                key={tv.url}
                onClick={() => {
                  setUrl(tv.url);
                }}
              >
                تشغيل {tv.name}
              </h1>
            ))}
            {url && (
              <ReactPlayer
              className = "video"
                url={url}
                width="100%"
                controls
                playing
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
