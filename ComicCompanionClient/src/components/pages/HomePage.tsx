import "../../styles/HomePage.css";
import PopularComicsList from "../PopularComicsList";
import PopularReadingListsList from "../PopularReadingListsList";
import Slider from "react-slick";
export default function HomePage() {
  const sliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 70000,
  };
  return (
    <>
      <h1 id="homepage-header">Comic Companion</h1>
      <div id="slideshow-wrapper">
        <div id="img-slideshow">
          <Slider {...sliderOptions}>
            {/* <div> */}
            <img src="https://thecomicvault.files.wordpress.com/2017/01/hush1.jpg?w=1200" />
            {/* </div> */}
            <img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/01/25/16431406979802.jpg" />
          </Slider>
        </div>
      </div>

      <h2>POPULAR COMICS</h2>
      <PopularComicsList />
      <h2>POPULAR READING LISTS</h2>
      <PopularReadingListsList />
    </>
  );
}
