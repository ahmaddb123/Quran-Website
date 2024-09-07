import Img from "../images/Logo.png";
import "../css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef,  } from "react";
import { Link } from "react-router-dom";


export default function Header() {
  const navRef = useRef()
const showHeader = () => {
  navRef.current.classList.toggle("responsive_nav")
}
const button = useRef()
  return (
    <div className="header">
      <div className="container">
        <div>
          <img className="logo" src={Img} alt="logo" />
        </div>
        <button className="icon-toggle" onClick={showHeader}>
          <FontAwesomeIcon ref={button} icon={faBars} />
        </button>
          <nav ref={navRef}>
            <ul>
              <Link to={"/"} className="li">الصفحة الرئيسية</Link>
              <Link to={"/quran"} className="li">القرأن الكريم</Link>
              <Link to={"/page"} className="li">الصفحات</Link>
              <Link to={"/juz"} className="li">الأجزاء</Link>
              <Link to={"/audios"} className="li">تلاوة القرأن الكريم</Link>
              <Link className="li">تواصل معنا</Link>
            </ul>
          </nav>
      </div>
    </div>
)}
