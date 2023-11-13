import "./GridView.css";
import Card from "../Card/Card.js";

function GridView({ data }) {
  return (
    <section className="GridView">
      {data?.map((element, index) => (
        <Card
          key={`card-${index}`}
          name={element.name}
          poster={element["poster-image"]}
        />
      ))}
    </section>
  );
}

export default GridView;
