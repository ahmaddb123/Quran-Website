import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Azkar() {
  const [azkar, setAzkar] = useState({});
  const [selectedAzkar, setSelectedAzkar] = useState(null); // لتخزين البيانات الخاصة بالذكر
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json?trk=public_post_comment-text"
        );
        const data = await res.json();
        setAzkar(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchAzkar();
  }, []);

  if (loading)
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );

  const handleAzkarClick = (key, event) => {
    setSelectedAzkar(azkar[key]);
    document
      .querySelectorAll(".ul-type li")
      .forEach((li) => li.classList.remove("active"));
    event.currentTarget.classList.add("active");
  };

  const azkarCategories = Object.keys(azkar);
  console.log(selectedAzkar);

  return (
    <div className="azkar-container">
      <div className="container">
        <h3 className="title-ayah">
          ﴿وَالذَّاكِرِينَ اللَّهَ كَثِيرًا وَالذَّاكِرَاتِ أَعَدَّ اللَّهُ
          لَهُمْ مَغْفِرَةً وَأَجْرًا عَظِيمًا ﴾<span>[الأحزاب: 35]</span>
        </h3>
        <nav>
          <p style={{ color: "#f7631b", fontWeight: "bold" }}>
            الأذكار تشكل جزءًا أساسيًا من العبادة للمسلم، ووسيلة للمسلم للتقرب
            إلى الله سبحانه وتعالى والحفاظ على ذكره في كل الأوقات. من أهم
            الأذكار التي يجب الحرص عليها هي أذكار الصباح، وأذكار المساء، وأذكار
            قبل النوم.
          </p>
          <p>أختر الأذكار التي تريد قرائتها من الخيارات التالية : </p>
          <ul className="ul-type">
            {azkarCategories.map((key, index) => (
              <li key={index} onClick={(event) => handleAzkarClick(key, event)}>
                {key}
              </li>
            ))}
          </ul>
        </nav>

        <AnimatePresence>
          {selectedAzkar && (
            <motion.div
              className="azkar-details box"
              key={selectedAzkar[0]?.category} // استخدام مفتاح لتحديد العناصر
              initial={{ opacity: 0, scale: 0.7 }} // تأثير الدخول
              animate={{ opacity: 1, scale: 1 }} // تأثير أثناء العرض
              exit={{ opacity: 0, scale: 0.7 }} // تأثير الخروج
              transition={{
                duration: 1, // مدة التأثير
                ease: [0.42, 0, 0.58, 1], // تأثير سلاسة الحركة
              }}
              layout // إضافة layout لتحسين الانتقال بين العناصر
            >
              {selectedAzkar.length > 0 && (
                <h2 className="title-ayah">
                  {selectedAzkar[0]?.category || "أذكار الصباح"}
                </h2>
              )}
              <div>
                {selectedAzkar.map((item, index) => (
                  <div className="box" key={index}>
                    <p>
                      {item.category === "أدعية الأنبياء" ||
                      item.category === "أدعية قرآنية"
                        ? item.content
                            .split(
                              "\\n', '\\n', '\\n', '\\n', '\\n', '\\n', '\\n', '"
                            )
                            .join()
                            .split("\\n', '")
                            .join()
                        : item.content === "stop"
                        ? ""
                        : item.content}
                    </p>
                    {item.count && item.count === "stop" ? (
                      ""
                    ) : item.count === undefined ? "" : (
                      <p>عدد التكرار : {item.count}</p>
                    )}
                    <p>
                      {" "}
                      {item.description && item.description === "stpo"
                        ? ""
                        : item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
