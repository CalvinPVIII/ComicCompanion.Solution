export default function loadImg(img: string) {
  return `${import.meta.env.VITE_API_URL}/ImgProxy?imgUrl=${img}`;
}
