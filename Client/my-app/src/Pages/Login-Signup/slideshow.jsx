import React from 'react';
import { Slide } from 'react-slideshow-image';
import './css/slideshow.css';
import 'react-slideshow-image/dist/styles.css';

function Slideshow() {
  const images = [
    "https://www.brmsonline.com/wp-content/uploads/2018/02/Donate-Blood.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJXWCEwU5Gs-fFFjb084Swvnj4_ZLGodmMA&s",
    "https://www.sriramakrishnahospital.com/wp-content/uploads/2021/06/Blood-Donation-1.jpg"
  ];

  return (
    <div className="slide-container">
      <Slide>
        {images.map((image, index) => (
          <div className="each-slide-effect" key={index}>
            <div style={{ backgroundImage: `url(${image})` }} className="slide-image">
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Slideshow;
