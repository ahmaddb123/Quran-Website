import Im from "../images/pngaaa.com-5267785.png";
import "../css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkMood from "./DarkMood";

export default function Header() {
  const navRef = useRef();
  const [isNavVisible, setIsNavVisible] = useState(false);

  const showHeader = () => {
    setIsNavVisible(!isNavVisible);
    document.body.style.overflow = !isNavVisible ? "hidden" : "auto"; 
  };

  const closeHeader = () => {
    setIsNavVisible(false);
    document.body.style.overflow = "auto"; 
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="header">
      <div className="container">
        <Link to={"/"}>
          <img className="logo" src={Im} alt="logo" />
        </Link>
        <nav ref={navRef} className={isNavVisible ? "responsive_nav" : ""}>
          <ul>
            <Link to={"/"} className="li" onClick={closeHeader}>
              الصفحة الرئيسية
            </Link>
            <Link to={"/quran"} className="li" onClick={closeHeader}>
              القرأن الكريم
            </Link>
            <Link to={"/page"} className="li" onClick={closeHeader}>
              الصفحات
            </Link>
            <Link to={"/juz"} className="li" onClick={closeHeader}>
              الأجزاء
            </Link>
            <Link to={"/audios"} className="li" onClick={closeHeader}>
              تلاوة القرأن الكريم
            </Link>
            <Link
              to={"/tv"}
              className="li"
              target="_blank"
              onClick={closeHeader}
            >
              Tv
            </Link>
            <Link
              to={"/radio"}
              className="li"
              target="_blank"
              onClick={closeHeader}
            >
              راديو مباشر
            </Link>
            <Link className="li" onClick={closeHeader} to={"/azkar"}>
              أذكار المسلم
            </Link>
          </ul>
        </nav>
        <div className="button-header">
          <button className="icon-toggle" onClick={showHeader}>
           {isNavVisible === true ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
          <DarkMood />
        </div>
      </div>
    </div>
  );
}
