const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(107).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 387)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { id, name, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    console.log(elementTypes);
    

    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/wellrccity/pokedex-html-js/refs/heads/master/assets/img/pokemons/poke_${id}.gif" />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.map(elementType => elementType.charAt(0).toUpperCase() + String(elementType).slice(1)).join(' | ')}</p>
        </li>
    `
    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)