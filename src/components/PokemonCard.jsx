function PokemonCard({ name, image, onClick }) {
  return (
    <button className="pokemon-card" onClick={onClick}>
      <img src={image} alt={name} />

      <h3>{name}</h3>
    </button>
  );
}

export default PokemonCard;