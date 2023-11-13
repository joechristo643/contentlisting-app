import "./Card.css";
import { IMG_BASE_URL } from "../constants/constants.js";

function Card({ name, poster }) {
  return (
    <div className="Card">
      <div
        className="Card-poster"
        style={{
          backgroundImage: `url(${IMG_BASE_URL}${poster}),url(${IMG_BASE_URL}placeholder_for_missing_posters.png)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <p className="Card-title">{name}</p>
    </div>
  );
}

export default Card;
