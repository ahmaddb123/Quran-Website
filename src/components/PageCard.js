  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";

  export default function PageCard() {
    const [loading, setLoading] = useState(true);
    const [dataPagesState, setDataPagesState] = useState({});
    const [searchTerm, setSearchTerm] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const pageNumbers = Array.from({ length: 604 }, (_, i) => i + 1);

    async function fetchPage(pageNumber) {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`
        );
        if (!res.ok) throw new Error(`Error fetching page ${pageNumber}`);
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error(`Failed to fetch page ${pageNumber}:`, error);
        return null;
      }
    }

    async function fetchAndPrintPages() {
      const pagesData = {};
      for (const pageNumber of pageNumbers) {
        const pageData = await fetchPage(pageNumber);
        if (pageData) {
          pagesData[pageNumber] = pageData;
        } else {
          console.error(`No data for page ${pageNumber}`);
        }
      }
      setDataPagesState(pagesData);
      setLoading(false);
    }

    useEffect(() => {
      fetchAndPrintPages();
      window.scrollTo(0, 0);
    }, []);

    if (loading)
      return (
        <div className="container-Loader">
          <p className="loader"></p>
        </div>
      );

    // تصفية الصفحات بناءً على البحث
    const filteredPageNumbers = searchTerm
      ? pageNumbers.filter((num) => num === parseInt(searchTerm))
      : pageNumbers;

    // التحقق من صحة رقم الصفحة
    function handleSearchInputChange(e) {
      const value = e.target.value;
      setSearchTerm(value);

      if (value && !pageNumbers.includes(parseInt(value))) {
        setErrorMessage("الصفحة غير موجودة، الرجاء إدخال رقم صحيح.");
      } else {
        setErrorMessage(""); // إعادة تعيين رسالة الخطأ إذا كان الرقم صحيحًا
      }
    }

    return (
      <div className="page-card">
        <div className="container">
          <h1>صفحات "القرآن الكريم"</h1>
          <h5 className="description">موقع القرآن الكريم والمصحف الشريف</h5>
          <h5 className="description">يمكنك من هنا تحديد الصفحة التي تريد قرائتها</h5>
          <input
            className="input-search"
            type="number"
            placeholder="أدخل رقم الصفحة"
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
          />
          {/* عرض رسالة الخطأ إذا كان رقم الصفحة غير صحيح */}
          {errorMessage && (
            <p style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</p>
          )}

          <div className="allCard">
            {filteredPageNumbers.map((num, index) => {
              const pageData = dataPagesState[num];

              if (!pageData) {
                return (
                  <div key={index} className="myCard">
                    <h4>الصفحة رقم : {num}</h4>
                  </div>
                );
              }

              // استخراج السور من الكائن
              const surahNames = Object.values(pageData.surahs).map(
                (surah) => surah.name
              );

              return (
                <Link
                  className="myCard"
                  key={index}
                  to={`/page/${pageData.number}`}
                >
                  <h4>الصفحة رقم : {num}</h4>
                  {surahNames.length > 0 ? (
                    <>
                      <p className="pE">السور: {surahNames.join(", ")}</p>
                      <p className="pE">عدد الآيات: {pageData.ayahs.length}</p>
                    </>
                  ) : (
                    <p>لا توجد سور متاحة للعرض</p>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="info">
            <h6 style={{ color: "#f7631b", fontWeight: "bold" }}>
              كتاب أنزلناه إليك مبارك ليدبروا آياته وليتذكر أولوا الألباب (ص:29)
            </h6>
            <p className="description">
              عن أبي أمامة الباهلي رضي الله عنه قال : سمعت رسول الله صلى الله عليه
              وسلم يقول : اقرءوا القرآن فإنه يأتي يوم القيامة شفيعا لأصحابه ,
              اقرءوا الزهراوين البقرة وسورة آل عمران فإنهما تأتيان يوم القيامة
              كأنهما غمامتان أو كأنهما غيايتان أو كأنهما فرقان من طير صواف تحاجان
              عن أصحابهما اقرءوا سورة البقرة فإن أخذها بركة وتركها حسرة ولا
              تستطيعها البطلة .... رواه مسلم
            </p>
          </div>
        </div>
      </div>
    );
  }
