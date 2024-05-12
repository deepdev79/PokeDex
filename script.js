const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonImg = document.getElementById("poke-img");
const pokemonId = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const speed = document.getElementById("speed");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// fetch data to check if Pokemon exist or not
const fetchData = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    findPokemon(data);
  } catch (err) {}
};

// If Pokemon exist following function is executed for info. for that particular pokemon

const fetchData2 = async (idCurr) => {
  try {
    const res = await fetch(`${url}/${idCurr}`);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {}
};

searchBtn.addEventListener("click", fetchData);
const displayPokemon = (data) => {
  const { name, id, height, weight, stats, types, sprites } = data;
  pokemonImg.innerHTML = `<img id="sprite" src="${sprites.front_default}">`;
  pokemonId.textContent = " #" + id;
  pokemonName.textContent = name.toUpperCase();
  pokemonWeight.textContent = "Weight: " + weight;
  pokemonHeight.textContent = "Height: " + height;
  hp.textContent = stats[0]["base_stat"];
  attack.textContent = stats[1]["base_stat"];
  defense.textContent = stats[2]["base_stat"];
  specialAttack.textContent = stats[3]["base_stat"];
  specialDefense.textContent = stats[4]["base_stat"];
  speed.textContent = stats[5]["base_stat"];
  types.map((val) => {
    pokemonTypes.innerHTML += `<span class="${
      val.type.name
    }">${val.type.name.toUpperCase()}</span>`;
    pokemonTypes.innerHTML += val === types.at(-1) ? "" : "and";
  });
};

const findPokemon = (data) => {
  let src = [];
  const { results } = data;
  let sTerm = input.value.toLowerCase();
  src = isNaN(sTerm)
    ? results.filter((val) => val.name === sTerm)
    : results.filter((val) => val.id === Number(sTerm));

  if (src.length === 0) {
    alert("Pokemon not found");
    return;
  }
  while (pokemonTypes.childNodes.length) {
    pokemonTypes.removeChild(pokemonTypes.childNodes[0]);
  }
  // pokemonTypes.textContent="";
  const id = src[0].id;
  fetchData2(id);
};
