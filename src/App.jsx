import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data = await response.json();

        setPokemon(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  async function fetchPokemonDetails(name) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await response.json();

      setSelectedPokemon(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="app">
      <h1 className="title">NYC Pokédex 🗽</h1>

      {loading && <h2>Loading Pokémon...</h2>}

      {error && <h2>{error}</h2>}

      <section className="pokemon-grid">
        {pokemon.map((poke) => (
          <PokemonCard
            key={poke.name}
            name={poke.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.indexOf(poke) + 1
            }.png`}
            onClick={() => fetchPokemonDetails(poke.name)}
          />
        ))}
      </section>

      {selectedPokemon && (
        <section className="details">
          <h2>{selectedPokemon.name.toUpperCase()}</h2>

          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />

          <p>
            <strong>Height:</strong> {selectedPokemon.height}
          </p>

          <p>
            <strong>Weight:</strong> {selectedPokemon.weight}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </p>

          <button onClick={() => setSelectedPokemon(null)}>
            Close
          </button>
        </section>
      )}
    </main>
  );
}

export default App;