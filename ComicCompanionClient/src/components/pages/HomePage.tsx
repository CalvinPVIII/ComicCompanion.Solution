import { Link } from "react-router-dom";
import "../../styles/HomePage.css";
import PopularComicsList from "../PopularComicsList";
import PopularReadingListsList from "../PopularReadingListsList";
import Slider from "react-slick";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function HomePage() {
  const sliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
  };
  // manually edit photos instead
  return (
    <>
      <h1 id="homepage-header">Comic Companion</h1>
      <div id="slideshow-wrapper">
        <div id="img-slideshow">
          <Slider {...sliderOptions}>
            {/* <div> */}
            <img src="https://thecomicvault.files.wordpress.com/2017/01/hush1.jpg?w=1200" />
            {/* </div> */}
            <img src="https://oyster.ignimgs.com/wordpress/stg.ign.com/2015/05/rsz_1stk671600.jpg" />
            <img src="https://i.redd.it/739ohqh54uj41.jpg" />

            <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/03/Venom-Todd-McFarlane.jpg" />

            <img src="https://cdn.mos.cms.futurecdn.net/8egr5UGFYeCPTSma25o5KX.jpg" />
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/29119f86-bda6-4f27-bbeb-13fdecefb935/df3jrtl-95b63f65-d1f2-4b2b-9702-4e3f93b03551.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI5MTE5Zjg2LWJkYTYtNGYyNy1iYmViLTEzZmRlY2VmYjkzNVwvZGYzanJ0bC05NWI2M2Y2NS1kMWYyLTRiMmItOTcwMi00ZTNmOTNiMDM1NTEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QHveQPxLHKRmz7WSMaJU3Tr1aQlpn99b8f3FsSBz2gg" />
          </Slider>
        </div>
      </div>
      <Link to="/comics" className="header-link">
        <h2>POPULAR COMICS</h2>
        <ArrowForwardIcon />
      </Link>
      <PopularComicsList />
      <Link to="/lists" className="header-link">
        <h2>POPULAR READING LISTS</h2>
        <ArrowForwardIcon />
      </Link>
      <PopularReadingListsList />
    </>
  );
}
