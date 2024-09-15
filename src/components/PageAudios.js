import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayAudio from "./PlayAudio";
import { motion, AnimatePresence } from "framer-motion";

export default function PageAudio() {
  const [loading, setLoading] = useState(true);
  const [reciter, setReciter] = useState([]);
  const [riwaya, setRiwaya] = useState("");
  const [server, setServer] = useState("");
  const [list, setList] = useState("");
  const [surah, setSurah] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState("");
  const [error, setError] = useState("");
  const [showPlayAudio, setShowPlayAudio] = useState(false);
  const id = useParams();

  useEffect(() => {
    const fetchDataNew = async () => {
      try {
        const res = await fetch(
          `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${id.id}`
        );
        if (!res.ok) throw new Error("خطأ في جلب بيانات القارئ");
        const data = await res.json();
        setReciter(data.reciters);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataNew();
  }, [id.id]);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
        if (!res.ok) throw new Error("خطأ في جلب بيانات السور");
        const data = await res.json();
        setSurah(data.suwar);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSurah();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (riwaya && reciter.length > 0) {
      const selectedMosaf = reciter[0].moshaf.find(
        (m) => m.id === Number(riwaya)
      );
      if (selectedMosaf) {
        setServer(selectedMosaf.server);
        setList(selectedMosaf.surah_list);
      }
    }
  }, [riwaya, reciter]);

  useEffect(() => {
    if (selectedSurah.length > 0 && server.length > 0) {
      setShowPlayAudio(true);
    } else {
      setShowPlayAudio(false);
    }
  }, [selectedSurah, server]);

  const handleReciterChange = (event) => {
    setRiwaya(event.target.value);
    setServer("");
    setList("");
  };

  const handleSurahChange = (event) => {
    setSelectedSurah(event.target.value);
  };

  const listArray = list.split(",").filter(Boolean);

  if (loading) {
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="page-data-ayah">
      <div className="container">
        <div className="data-ayah">
          {error && <p className="error-message">{error}</p>}
          {reciter.length > 0 ? (
            <>
              <h1 className="title-ayah">القارئ : {reciter[0].name}</h1>
              <p style={{fontWeight: "bold", color:"red"}}>
                ملاحظة: عليك اختيار الرواية أولاً فيما بعد تحدد السورة المراد
                سماع تلاوتها
              </p>
              <select
                className="form-select form-select-lg mb-3 my-select"
                onChange={handleReciterChange}
                value={riwaya}
              >
                <option value="" disabled>
                  أختر الرواية / نوع المصحف
                </option>
                {reciter[0].moshaf.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <hr />
              <select
                className="form-select form-select-lg mb-3 my-select"
                onChange={handleSurahChange}
                value={selectedSurah}
              >
                <option value="" disabled>
                  أختر السورة :
                </option>
                {listArray.map((num) => {
                  const surahFound = surah.find((s) => s.id === +num);
                  return (
                    <option key={num} value={num}>
                      رقم السورة: {num} - اسم السورة :{" "}
                      {surahFound ? surahFound.name : "غير موجود"}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <p>لا توجد بيانات للقارئ</p>
          )}
          <AnimatePresence>
            {showPlayAudio && (
              <motion.div
                className="box anime"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <PlayAudio server={server} number={selectedSurah} />
                <h6 style={{fontWeight: "bold", color:"red", margin:"10px"}}>اضغط على الثلاث نقاط لتحميل السورة</h6>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
