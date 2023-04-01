import { useEffect, useState } from "react";
import "./slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./sliderData";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const prevSlide = () => {
    currentSlide !== 0
      ? setCurrentSlide(currentSlide - 1)
      : setCurrentSlide(sliderLength - 1);
  };
  const nextSlide = () => {
    currentSlide !== sliderLength - 1
      ? setCurrentSlide(currentSlide + 1)
      : setCurrentSlide(0);
  };

  useEffect(() => {
    setCurrentSlide(0)
  },[])

  let slideInterval:any;
  function auto (){
    slideInterval = setInterval(nextSlide, 5000)
  }

  useEffect(() => {
    auto()
    return () => clearInterval(slideInterval)
  },[currentSlide])

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
