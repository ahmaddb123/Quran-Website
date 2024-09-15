import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <h1>القرأن الكريم</h1>
        <p>
          لا تنسوا التواصل معنا في حال العثور على أي خطأ في النصوص ونرحب بكل
          الأفكار والأقتراحات الجديدة
        </p>
        <p>ولا تنسونا من صالح دعائكم</p>
        <div className="media">
          <Link to={`https://www.facebook.com/ahmaddyab123`} target="_blank">
            <FontAwesomeIcon icon={faFacebook} className="Facebook" />
          </Link>
          <Link to={`https://www.instagram.com/ahmad_dyab5/`} target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="Instagram" />
          </Link>
          <Link to={`https://t.me/Ahmaddb99`} target="_blank">
            <FontAwesomeIcon icon={faTelegram} className="Telegram" />
          </Link>
          <Link
            target="_blank"
            to={`https://api.whatsapp.com/send/?phone=%2B963969357558&text=I%27m+interested+in+your+car+for+sale&type=phone_number&app_absent=0`}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="Whatsapp" />
          </Link>
        </div>
        <p className="ahmad"> تم الإنشاء بواسطة : أحمد دياب</p>
        <p className="ahmad"> سنة 2024</p>
      </div>
    </div>
  );
}
