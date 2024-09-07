import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageCard() {
  const [dataPagesState, setDataPagesState] = useState({});
  const pageNumbers = Array.from({ length: 604 }, (_, i) => i + 1);

  async function fetchPage(pageNumber) {
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`
      );
      if (!res.ok) throw new Error(`Error fetching page ${pageNumber}`);
      const data = await res.json();
      return data.data; // تأكد من جلب البيانات الصحيحة
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
    setDataPagesState(pagesData); // حفظ جميع البيانات في الحالة
  }

  useEffect(() => {
    fetchAndPrintPages();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-card">
      <div className="container">
        <h1>صفحات "القرآن الكريم"</h1>
        <div className="allCard">
          {pageNumbers.map((num, index) => {
            const pageData = dataPagesState[num];

            // التأكد من وجود البيانات قبل الوصول إليها
            if (!pageData) {
              return (
                <div key={index} className="myCard">
                  <h4>الصفحة رقم : {num}</h4>
                  <h1 className="loader loaderSm"></h1>
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
                    <p>السور: {surahNames.join(", ")}</p>
                    <p>عدد الآيات: {pageData.ayahs.length}</p>
                  </>
                ) : (
                  <p>لا توجد سور متاحة للعرض</p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
