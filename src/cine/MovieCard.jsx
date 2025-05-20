import { useContext, useState } from "react";
import tag from "../assets/tag.svg";
import { getImgUrl } from "../utility/cine-utility";
import Rating from "./Rating";
import MovieDetailsModal from "./MovieDetailsModal";
import { MovieContext } from "../context";
import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  // handle add to cart
  function handleAddToCart(e, movie) {
    e.stopPropagation();

    // find already exist check
    const foundProduct = state.cartData.find((item) => {
      return item.id === movie.id;
    });

    // if allready esists
    if (!foundProduct) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });

      toast.success(`Movie ${movie.title} Added Successfull`);
    } else {
      toast.error(`Movie ${movie.title} Already Added `);
    }
  }

  // handle Modal close
  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }

  // handle movie selection
  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}

      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt=""
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-[#00d991] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src={tag} alt="" />
              <span>$ {movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
