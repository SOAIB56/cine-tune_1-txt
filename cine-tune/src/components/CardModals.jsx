/* eslint-disable react/prop-types */

import tag from "../assets/tag.svg";
import { getImageUrl } from "../utils/cine-utils";

import { useContext } from "react";
import { toast } from "react-toastify";
import { MovieContext } from "../context";

export default function CardModals({ movie, onCloseClick }) {
  const { cardData, setCardData } = useContext(MovieContext);
  console.log("context data print from card models", cardData);
  const handleAddToCard = (event, movie) => {
    event.preventDefault();
    const isPreviousAdded = cardData.find(
      (singleMovie) => singleMovie.id === movie.id
    );
    if (!isPreviousAdded) {
      setCardData([...cardData, movie]);
      toast.success(`Added  ${movie.title} to Cart !`, {
        autoClose: 3000,
      });
    } else {
      console.error("This data already added");
      toast.error(`${movie.title} have already added to Cart !`, {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4 max-h-[90vh] overflow-auto">
          <div className="bg-white shadow-md dark:bg-[#12141D] rounded-2xl sm:grid sm:grid-cols-[2fr_1fr] overflow-hidden">
            <img
              className="sm:order-2 w-full object-cover h-full max-sm:max-h-[300px]"
              src={getImageUrl(movie.cover)}
              alt=""
            />
            <div className="p-5 lg:p-11">
              <div className="">
                <h2 className="text-3xl lg:text-[50px] mb-2 font-bold">
                  {movie.title}
                </h2>
                <span className="block text-base text-[#9fa0a4] dark:text-[#575A6E] my-3">
                  {movie.genre}
                </span>
                <div></div>
              </div>
              <p className="text-sm lg:text-base mb-8 lg:mb-16">
                {movie.description}
              </p>
              <div className="grid lg:grid-cols-2 gap-2">
                <a
                  className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                  href="#"
                >
                  <img src={tag} alt="" />
                  <span onClick={(event) => handleAddToCard(event, movie)}>
                    ${movie.price} | Add to Cart
                  </span>
                </a>
                <a
                  className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm"
                  href="#"
                  onClick={onCloseClick}
                >
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
