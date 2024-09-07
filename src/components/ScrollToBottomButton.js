// ScrollToBottomButton.js
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';


const ScrollToBottomButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollHeight > 1500 && scrollY < scrollHeight - window.innerHeight -300 && scrollY > 1000) { // يظهر الزر إذا كان التمرير أقل من (طول الصفحة - ارتفاع النافذة - 300)
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    showButton && (
      <button className="scroll-to-bottom" onClick={scrollToBottom}>
<FontAwesomeIcon icon={faCircleDown} />
      </button>
    )
  );
};

export default ScrollToBottomButton;
