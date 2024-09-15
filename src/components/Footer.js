import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <h3>
          <FontAwesomeIcon icon={faLink} /> روابط سريعة:{" "}
        </h3>
        <div className="box">
          <Link to={"/surah/2"}>سورة البقرة</Link>
          <Link to={"/surah/67"}>سورة الملك</Link>
          <Link to={"/surah/18"}>سورة الكهف</Link>
          <Link to={"/surah/36"}>سورة يس</Link>
          <Link to={"/surah/56"}>سورة الواقعة</Link>
          <Link to={"/juz/29"}>جزء تبارك</Link>
          <Link to={"/juz/30"}>جزء عم</Link>
          <Link to={"/page/604"}>المعوذات</Link>
          <Link to={"/دعاء-ختم-القران"}>دعاء ختم القران الكريم</Link>
          <Link to={"/quran"}>فهرس القران الكريم</Link>
          <Link to={"/juz"}>أجزاء القران الكريم</Link>
          <Link to={"/page"}>صفحات القران الكريم</Link>
          <Link to={"/radio"}>إذاعة القران الكريم</Link>
          <Link to={"/tv"}>بث مباشر لقناة القران الكريم</Link>
          <Link to={"/audios"}>سماع سور القران الكريم بقرائ مختلفين</Link>
          <Link to={"/azkar"}>أذكار المسلم</Link>
        </div>
      </div>
    </div>
  );
}
