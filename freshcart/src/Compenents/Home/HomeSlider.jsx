import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img2 from "../../assets/images/slider-2.jpeg";
import img3 from "../../assets/images/banner-4.jpeg";
import img1 from "../../assets/images/frehcartimg.jpg";
import homeSliderStyle from './homeSlider.module.css'
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
 };

  return (
    <Slider {...settings}>
      <div className={homeSliderStyle. theSlider}>
        <img style={{width:"100%",height:"400px"}} src={img1} />
      </div>
           <div className={homeSliderStyle. theSlider}>
        <img style={{width:"100%",height:"400px"}} src={img2} />
      </div>
         <div className={homeSliderStyle. theSlider}>
        <img style={{width:"100%",height:"400px"}} src={img3} />
      </div>
    </Slider>
  );
}
