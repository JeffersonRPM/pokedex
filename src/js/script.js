const axios = require('axios');

import "../../src/css/style.css";
import "../../src/css/mediaquery.css";

const select = (selector) => document.querySelector(selector);
const pokemonName = select('.pokemon__name');
const pokemonNumber = select('.pokemon__number');
const pokemonImage = select('.pokemon__image');
const loader = select('.loader');
const pokemonHp = select('.pokemon__hp');
const pokemonAttack = select('.pokemon__attack');
const pokemonDefense = select('.pokemon__defense');
const pokemonSpecialAttack = select('.pokemon__special__attack');
const pokemonSpecialDefense = select('.pokemon__special__defense');
const pokemonSpeed = select('.pokemon__speed');
const pokemonWeight = select('.pokemon__weight');
const pokemonHeight = select('.pokemon__height');
const pokemonType = select('.pokemon__type');
const form = select('.form');
const input = select('.input__search');
const btnPrev = select('.btn-prev');
const btnNext = select('.btn-next');
const gear = select('.gear');
const menu = select('.bg-menu');
const menuInfo = select('.bg-info');
const close = select('.compare-close');
const overlay = select('.overlay');
const inputC1 = select('.input__search__compare1');
const inputC2 = select('.input__search__compare2');
const btnCompare = select('.btn-compare');
const btnPrevC1 = select('.btn-compare-prevC1');
const btnPrevC2 = select('.btn-compare-prevC2');
const btnNextC1 = select('.btn-compare-nextC1');
const btnNextC2 = select('.btn-compare-nextC2');
const compareForm1 = select('.compare-form1');
const compareForm2 = select('.compare-form2');
const pokemonNameC1 = select('.pokemon__name__compare1');
const pokemonNameC2 = select('.pokemon__name__compare2');
const pokemonNumberC1 = select('.pokemon__number__compare1');
const pokemonNumberC2 = select('.pokemon__number__compare2');
const pokemonImageC1 = select('.pokemon__image__compare1');
const pokemonImageC2 = select('.pokemon__image__compare2');
const pokemonHpC1 = select('.pokemon__hp__compare1');
const pokemonHpC2 = select('.pokemon__hp__compare2');
const pokemonAttackC1 = select('.pokemon__attack__compare1');
const pokemonAttackC2 = select('.pokemon__attack__compare2');
const pokemonDefenseC1 = select('.pokemon__defense__compare1');
const pokemonDefenseC2 = select('.pokemon__defense__compare2');
const pokemonSpecialAttackC1 = select('.pokemon__special__attack__compare1');
const pokemonSpecialAttackC2 = select('.pokemon__special__attack__compare2');
const pokemonSpecialDefenseC1 = select('.pokemon__special__defense__compare1');
const pokemonSpecialDefenseC2 = select('.pokemon__special__defense__compare2');
const pokemonSpeedC1 = select('.pokemon__speed__compare1');
const pokemonSpeedC2 = select('.pokemon__speed__compare2');
const pokemonTypeC1 = select('.pokemon__type__compare1');
const pokemonTypeC2 = select('.pokemon__type__compare2');
const loaderC1 = select('.loader__compare1');
const loaderC2 = select('.loader__compare2');
const compareContainer = select('.compare__container');
const compareClose = select('.compare__close');
const compareInfo = select('.compare__info');
const defeatC1 = select('.defeat__compare1');
const defeatC2 = select('.defeat__compare2');
const drawC1 = select('.draw__compare1');
const drawC2 = select('.draw__compare2');
const victoryC1 = select('.victory__compare1');
const victoryC2 = select('.victory__compare2');
const mainBg = select('.main__bg');
const vsCompare = select('.vs__compare');
const vsDarkCompare = select('.vs__dark__compare');
const pokeLoad = select('.pokedex-desktop-close');
const pokeDesktop = select('.pokedex-desktop');
const pokeMobile = select('.pokedex-mobile');
const flex = select('.flex');
const infoFight1 = select('.info-fight1');
const infoFight2 = select('.info-fight2');

const MAX_POKEMON_NUMBER = 649;

let searchPokemon = 1;
let searchPokemonC1 = 1;
let searchPokemonC2 = 1;
let sumC1 = 0;
let sumC2 = 0;
let imagesLoaded = 0;
let fightC1 = [];
let fightC2 = [];
let myChart1;
let myChart2;

// efeito pokédex abrindo
if (window.innerWidth > 1270) {
    pokeLoad.style.display = 'block';
    flex.style.display = 'none';

    setTimeout(async function () {
        await new Promise(resolve => setTimeout(resolve, 1000));
        pokeLoad.style.display = 'none';
        pokeDesktop.style.display = 'block';
        flex.style.display = 'flex';
    }, 0);
} else {
    pokeLoad.style.display = 'none';
    pokeDesktop.style.display = 'none';
    flex.style.display = 'flex';
    pokeMobile.style.display = "block";
}

window.addEventListener('resize', function () {
    if (window.innerWidth > 1270) {
        pokeLoad.style.display = 'none';
        pokeDesktop.style.display = 'block';
        flex.style.display = 'flex';
        pokeMobile.style.display = "none";
    } else {
        pokeLoad.style.display = 'none';
        pokeDesktop.style.display = 'none';
        flex.style.display = 'flex';
        pokeMobile.style.display = "block";
    }
});
//

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (APIResponse.status === 200) {
            return APIResponse.data;
        }
    } catch (error) {
        console.error(error);
    }
}

const pokemonTypes = {
    'bug': { color: '#9ec42f', name: 'inseto' },
    'dark': { color: '#616071', name: 'sombrio' },
    'dragon': { color: '#0a78c1', name: 'dragão' },
    'electric': { color: '#f6d954', name: 'elétrico' },
    'fairy': { color: '#ed92e4', name: 'fada' },
    'fighting': { color: '#d7425f', name: 'lutador' },
    'fire': { color: '#ffa350', name: 'fogo' },
    'flying': { color: '#9fb9e9', name: 'voador' },
    'ghost': { color: '#6a6fc6', name: 'fantasma' },
    'grass': { color: '#5cbf68', name: 'planta' },
    'ground': { color: '#d77f4f', name: 'terrestre' },
    'ice': { color: '#80d4c9', name: 'gelo' },
    'normal': { color: '#9da0a0', name: 'normal' },
    'poison': { color: '#bc62d0', name: 'veneno' },
    'psychic': { color: '#f9777b', name: 'psíquico' },
    'rock': { color: '#cec08f', name: 'pedra' },
    'steel': { color: '#548f9f', name: 'aço' },
    'water': { color: '#569cd9', name: 'água' },
};

const tipos = {
    'inseto': {
        'fraqueza': ['fogo', 'pedra', 'voador']
    },
    'sombrio': {
        'fraqueza': ['inseto', 'fada', 'lutador']
    },
    'dragão': {
        'fraqueza': ['dragão', 'fada', 'gelo']
    },
    'elétrico': {
        'fraqueza': ['terrestre']
    },
    'fada': {
        'fraqueza': ['aço', 'veneno']
    },
    'lutador': {
        'fraqueza': ['voador', 'psíquico', 'fada']
    },
    'fogo': {
        'fraqueza': ['água', 'pedra', 'terrestre']
    },
    'voador': {
        'fraqueza': ['elétrico', 'gelo', 'pedra']
    },
    'fantasma': {
        'fraqueza': ['fantasma', 'sombrio']
    },
    'planta': {
        'fraqueza': ['fogo', 'gelo', 'veneno', 'voador', 'inseto']
    },
    'terrestre': {
        'fraqueza': ['água', 'planta', 'gelo']
    },
    'gelo': {
        'fraqueza': ['fogo', 'lutador', 'pedra', 'aço']
    },
    'normal': {
        'fraqueza': ['lutador']
    },
    'veneno': {
        'fraqueza': ['terrestre', 'psíquico']
    },
    'psíquico': {
        'fraqueza': ['inseto', 'fantasma', 'sombrio']
    },
    'pedra': {
        'fraqueza': ['água', 'planta', 'lutador', 'terrestre', 'aço']
    },
    'aço': {
        'fraqueza': ['fogo', 'lutador', 'terrestre']
    },
    'água': {
        'fraqueza': ['elétrico', 'planta']
    }
}

const renderMainPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'carregando...';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.visibility = 'visible';
    pokemonType.style.visibility = 'visible';

    if (input.value < 0 || input.value > MAX_POKEMON_NUMBER) {
        handleNoPokemonData();
        return;
    }

    const data = await fetchPokemon(pokemon);

    if (data) {
        updateMainUIWithPokemonData(data);
    } else {
        handleNoPokemonData();
    }

    function updateMainUIWithPokemonData(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + ' -';

        var images = {};
        images.front_default = new Image();
        images.front_default.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        images.back_default = new Image();
        images.back_default.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
        images.front_shiny = new Image();
        images.front_shiny.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        images.back_shiny = new Image();
        images.back_shiny.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_shiny'];

        document.getElementById('chk-2').removeEventListener('change', updatePokemonImage);
        document.getElementById('chk-3').removeEventListener('change', updatePokemonImage);

        document.getElementById('chk-2').addEventListener('change', function () {
            updatePokemonImage(data, images);
        });
        document.getElementById('chk-3').addEventListener('change', function () {
            updatePokemonImage(data, images);
        });

        updatePokemonImage(data, images);

        status();

        element();

        input.value = '';
        searchPokemon = data.id;
    }

    function updatePokemonImage(data, images) {
        var isShiny = document.getElementById('chk-2').checked;
        var isBack = document.getElementById('chk-3').checked;

        pokemonImage.style.visibility = 'hidden';
        loader.style.visibility = 'visible';

        if (isShiny && isBack) {
            pokemonImage.src = images.back_shiny.src;
        } else if (isShiny) {
            pokemonImage.src = images.front_shiny.src;
        } else if (isBack) {
            pokemonImage.src = images.back_default.src;
        } else {
            pokemonImage.src = images.front_default.src;
        }

        pokemonImage.onload = function () {
            pokemonImage.style.visibility = 'visible';
            loader.style.visibility = 'hidden';
        }
    }

    function displayStat(statName, element) {
        const stat = data['stats'].find(stat => stat.stat.name === statName);
        if (stat) {
            element.innerHTML = stat['base_stat'];
        }
    }

    function status() {
        displayStat('hp', pokemonHp);
        displayStat('attack', pokemonAttack);
        displayStat('defense', pokemonDefense);
        displayStat('special-attack', pokemonSpecialAttack);
        displayStat('special-defense', pokemonSpecialDefense);
        displayStat('speed', pokemonSpeed);

        pokemonWeight.innerHTML = (data.weight / 10).toFixed(1).replace('.', ',') + ' kg';
        pokemonHeight.innerHTML = (data.height / 10).toFixed(1).replace('.', ',') + ' m';
    }

    function element() {
        const types = data['types'];
        const ulElement = select('.pokemon__type ul');
        ulElement.innerHTML = '';
        types.forEach(typeObj => {
            const typeName = typeObj['type']['name'];
            const liElement = document.createElement('li');
            const typeInfo = pokemonTypes[typeName];
            if (typeInfo) {
                liElement.style.backgroundImage = `linear-gradient(180deg, ${typeInfo.color}, ${typeInfo.color}a6)`;
                liElement.textContent = typeInfo.name;
            } else {
                liElement.textContent = typeName;
            }
            ulElement.appendChild(liElement);
        });
    }
}

const renderComparePokemon1 = async (pokemon) => {
    pokemonNameC1.innerHTML = 'carregando...';
    pokemonNumberC1.innerHTML = '';
    pokemonImageC1.style.visibility = 'visble';
    pokemonTypeC1.style.display = 'block';

    if (inputC1.value < 0 || inputC1.value > MAX_POKEMON_NUMBER) {
        handleNoPokemonData1();
        return;
    }

    const data = await fetchPokemon(pokemon);
    if (data) {
        updateCompareUI1WithPokemonData(data);
    } else {
        handleNoPokemonData1();
    }

    function updateCompareUI1WithPokemonData(data) {
        pokemonNameC1.innerHTML = data.name;
        pokemonNumberC1.innerHTML = data.id + ' -';

        var images = {};
        images.front_default = new Image();
        images.front_default.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        updatePokemonImage(data, images);

        getRadarData1();

        status();

        element();

        inputC1.value = '';
        searchPokemonC1 = data.id;

        // Informações de combate
        const radarData1 = getRadarData1();

        const ctxFight1 = select('.info-1');
        const pokemonName1 = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        infoFight1.innerHTML = pokemonName1;

        if (myChart1) {
            myChart1.data.datasets[0].data = radarData1;
            myChart1.update();
        } else {
            myChart1 = new Chart(ctxFight1, {
                type: 'radar',
                data: {
                    labels: ['Vida', 'Ataque', 'Ataque especial', 'Velocidade', 'Defesa especial', 'Defesa'],
                    datasets: [{
                        data: radarData1,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 255,
                            pointLabels: {
                                font: {
                                    size: 16
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    function getRadarData1() {
        return [
            pokemonHpC1.innerHTML,
            pokemonAttackC1.innerHTML,
            pokemonSpecialAttackC1.innerHTML,
            pokemonSpeedC1.innerHTML,
            pokemonSpecialDefenseC1.innerHTML,
            pokemonDefenseC1.innerHTML
        ];
    }

    function updatePokemonImage(data, images) {

        pokemonImageC1.src = images.front_default.src;
        pokemonImageC1.style.visibility = 'hidden';
        loaderC1.style.visibility = 'visible';

        pokemonImageC1.onload = function () {
            pokemonImageC1.style.visibility = 'visible';
            loaderC1.style.visibility = 'hidden';
        }
    }

    function displayStat(statName, element) {
        const stat = data['stats'].find(stat => stat.stat.name === statName);
        if (stat) {
            element.innerHTML = stat['base_stat'];
        }
    }

    function status() {
        displayStat('hp', pokemonHpC1);
        displayStat('attack', pokemonAttackC1);
        displayStat('defense', pokemonDefenseC1);
        displayStat('special-attack', pokemonSpecialAttackC1);
        displayStat('special-defense', pokemonSpecialDefenseC1);
        displayStat('speed', pokemonSpeedC1);

        try {
            let sum = (
                Number(pokemonHpC1.innerHTML) +
                Number(pokemonAttackC1.innerHTML) +
                Number(pokemonDefenseC1.innerHTML) +
                Number(pokemonSpecialAttackC1.innerHTML) +
                Number(pokemonSpecialDefenseC1.innerHTML) +
                Number(pokemonSpeedC1.innerHTML
                ));
            sumC1 = sum;
        } catch (error) {
            console.error("Ocorreu um erro ao calcular a soma: ", error);
        }
    }

    function element() {
        const types = data['types'];
        const ulElement = select('.pokemon__type__compare1 ul');
        ulElement.innerHTML = '';
        fightC1 = [];
        types.forEach(typeObj => {
            const typeName = typeObj['type']['name'];
            const liElement = document.createElement('li');
            const typeInfo = pokemonTypes[typeName];
            if (typeInfo) {
                liElement.style.backgroundImage = `linear-gradient(180deg, ${typeInfo.color}, ${typeInfo.color}a6)`;
                liElement.textContent = typeInfo.name;
            } else {
                liElement.textContent = typeName;
            }
            ulElement.appendChild(liElement);

            fightC1.push(typeInfo.name);
        });
    }

    function handleNoPokemonData1() {
        inputC1.value = '';
        pokemonNumberC1.innerHTML = '';
        pokemonNameC1.innerHTML = 'não encontrado :(';
        pokemonImageC1.style.visibility = 'hidden';
        pokemonHpC1.innerHTML = '0';
        pokemonAttackC1.innerHTML = '0';
        pokemonDefenseC1.innerHTML = '0';
        pokemonSpecialAttackC1.innerHTML = '0';
        pokemonSpecialDefenseC1.innerHTML = '0';
        pokemonSpeedC1.innerHTML = '0'
        pokemonTypeC1.style.display = 'none';
        drawC1.style.opacity = "0";
        drawC1.style.visibility = "hidden";
        drawC2.style.opacity = "0";
        drawC2.style.visibility = "hidden";
        defeatC1.style.opacity = "0";
        defeatC1.style.visibility = "hidden";
        defeatC2.style.opacity = "0";
        defeatC2.style.visibility = "hidden";
        victoryC1.style.opacity = "0";
        victoryC1.style.visibility = "hidden";
        victoryC2.style.opacity = "0";
        victoryC2.style.visibility = "hidden";
        searchPokemonC1 = data.id;
    }

    imagesLoaded++;
}

const renderComparePokemon2 = async (pokemon) => {
    pokemonNameC2.innerHTML = 'carregando...';
    pokemonNumberC2.innerHTML = '';
    pokemonImageC2.style.visibility = 'visble';
    pokemonTypeC2.style.display = 'block';

    if (inputC2.value < 0 || inputC2.value > MAX_POKEMON_NUMBER) {
        handleNoPokemonData2();
        return;
    }

    const data = await fetchPokemon(pokemon);
    if (data) {
        updateCompareUI2WithPokemonData(data);
    } else {
        handleNoPokemonData2();
    }

    function updateCompareUI2WithPokemonData(data) {
        pokemonNameC2.innerHTML = data.name;
        pokemonNumberC2.innerHTML = data.id + ' -';

        var images = {};
        images.front_default = new Image();
        images.front_default.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        updatePokemonImage(data, images);

        getRadarData2();

        status();

        element();

        inputC2.value = '';
        searchPokemonC2 = data.id;

        // Informações de combate
        const radarData2 = getRadarData2();

        const ctxFight2 = select('.info-2');
        const pokemonName2 = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        infoFight2.innerHTML = pokemonName2;

        if (myChart2) {
            myChart2.data.datasets[0].data = radarData2;
            myChart2.update();
        } else {
            myChart2 = new Chart(ctxFight2, {
                type: 'radar',
                data: {
                    labels: ['Vida', 'Ataque', 'Ataque especial', 'Velocidade', 'Defesa especial', 'Defesa'],
                    datasets: [{
                        data: radarData2,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 255,
                            pointLabels: {
                                font: {
                                    size: 16
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    function getRadarData2() {
        return [
            pokemonHpC2.innerHTML,
            pokemonAttackC2.innerHTML,
            pokemonSpecialAttackC2.innerHTML,
            pokemonSpeedC2.innerHTML,
            pokemonSpecialDefenseC2.innerHTML,
            pokemonDefenseC2.innerHTML
        ];
    }

    function updatePokemonImage(data, images) {
        pokemonImageC2.src = images.front_default.src;
        pokemonImageC2.style.visibility = 'hidden';
        loaderC2.style.visibility = 'visible';

        pokemonImageC2.onload = function () {
            pokemonImageC2.style.visibility = 'visible';
            loaderC2.style.visibility = 'hidden';
        }
    }

    function displayStat(statName, element) {
        const stat = data['stats'].find(stat => stat.stat.name === statName);
        if (stat) {
            element.innerHTML = stat['base_stat'];
        }
    }

    function status() {
        displayStat('hp', pokemonHpC2);
        displayStat('attack', pokemonAttackC2);
        displayStat('defense', pokemonDefenseC2);
        displayStat('special-attack', pokemonSpecialAttackC2);
        displayStat('special-defense', pokemonSpecialDefenseC2);
        displayStat('speed', pokemonSpeedC2);

        try {
            let sum = (
                Number(pokemonHpC2.innerHTML) +
                Number(pokemonAttackC2.innerHTML) +
                Number(pokemonDefenseC2.innerHTML) +
                Number(pokemonSpecialAttackC2.innerHTML) +
                Number(pokemonSpecialDefenseC2.innerHTML) +
                Number(pokemonSpeedC2.innerHTML
                ));
            sumC2 = sum;
        } catch (error) {
            console.error("Ocorreu um erro ao calcular a soma: ", error);
        }
    }

    function element() {
        const types = data['types'];
        const ulElement = select('.pokemon__type__compare2 ul');
        ulElement.innerHTML = '';
        fightC2 = [];
        types.forEach(typeObj => {
            const typeName = typeObj['type']['name'];
            const liElement = document.createElement('li');
            const typeInfo = pokemonTypes[typeName];
            if (typeInfo) {
                liElement.style.backgroundImage = `linear-gradient(180deg, ${typeInfo.color}, ${typeInfo.color}a6)`;
                liElement.textContent = typeInfo.name;
            } else {
                liElement.textContent = typeName;
            }
            ulElement.appendChild(liElement);

            fightC2.push(typeInfo.name);
        });
    }

    function handleNoPokemonData2() {
        inputC2.value = '';
        pokemonNumberC2.innerHTML = '';
        pokemonNameC2.innerHTML = 'não encontrado :(';
        pokemonImageC2.style.visibility = 'hidden';
        pokemonHpC2.innerHTML = '0';
        pokemonAttackC2.innerHTML = '0';
        pokemonDefenseC2.innerHTML = '0';
        pokemonSpecialAttackC2.innerHTML = '0';
        pokemonSpecialDefenseC2.innerHTML = '0';
        pokemonSpeedC2.innerHTML = '0'
        pokemonTypeC2.style.display = 'none';
        drawC1.style.opacity = "0";
        drawC1.style.visibility = "hidden";
        drawC2.style.opacity = "0";
        drawC2.style.visibility = "hidden";
        defeatC1.style.opacity = "0";
        defeatC1.style.visibility = "hidden";
        defeatC2.style.opacity = "0";
        defeatC2.style.visibility = "hidden";
        victoryC1.style.opacity = "0";
        victoryC1.style.visibility = "hidden";
        victoryC2.style.opacity = "0";
        victoryC2.style.visibility = "hidden";
        searchPokemonC2 = data.id;
    }

    imagesLoaded++;
}

function handleNoPokemonData() {
    input.value = '';
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'não encontrado :(';
    pokemonImage.style.visibility = 'hidden';
    pokemonHp.innerHTML = '0';
    pokemonAttack.innerHTML = '0';
    pokemonDefense.innerHTML = '0';
    pokemonSpecialAttack.innerHTML = '0';
    pokemonSpecialDefense.innerHTML = '0';
    pokemonSpeed.innerHTML = '0';
    pokemonWeight.innerHTML = '0';
    pokemonHeight.innerHTML = '0';
    pokemonType.style.visibility = 'hidden';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    pokemonImage.style.visibility = 'visible';
    renderMainPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if (pokemonName.innerHTML === 'não encontrado :(') {
        searchPokemon = 1;
        renderMainPokemon(searchPokemon);
        return;
    }

    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderMainPokemon(searchPokemon);
    } else {
        searchPokemon = MAX_POKEMON_NUMBER;
        renderMainPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    if (pokemonName.innerHTML === 'não encontrado :(') {
        searchPokemon = 1;
        renderMainPokemon(searchPokemon);
        return;
    }

    if (searchPokemon < MAX_POKEMON_NUMBER) {
        searchPokemon += 1;
        renderMainPokemon(searchPokemon);
    } else {
        searchPokemon = 1
        renderMainPokemon(searchPokemon);
    }
});

gear.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('show');
});

compareInfo.addEventListener('click', (event) => {
    event.stopPropagation();
    menuInfo.classList.toggle('show');
});

menu.addEventListener('click', (event) => {
    event.stopPropagation();
});

menuInfo.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
    }

    if (menuInfo.classList.contains('show')) {
        menuInfo.classList.remove('show');
    }
});

function setGearEvents(isChecked) {
    if (isChecked) {
        mainBg.classList.remove('body-bg');
        mainBg.classList.remove('compare-bg');
        mainBg.classList.add('dark-bg');

        gear.addEventListener('mouseover', function () {
            gear.style.filter = 'invert(1)';
            gear.style.background = '#888';
            gear.style.borderRadius = '50%';
        });

        gear.addEventListener('mouseout', function () {
            gear.style.filter = 'invert(1)';
            gear.style.background = 'transparent';
            gear.style.borderRadius = 'initial';
        });
    } else {
        mainBg.classList.add('body-bg');
        mainBg.classList.remove('compare-bg');
        mainBg.classList.remove('dark-bg');

        gear.addEventListener('mouseover', function () {
            gear.style.filter = 'invert(0)';
            gear.style.background = 'none';
        });

        gear.addEventListener('mouseout', function () {
            gear.style.filter = 'invert(1)';
        });
    }
}

document.getElementById('chk-1').addEventListener('change', function () {
    if (this.checked) {
        mainBg.classList.remove('body-bg');
        mainBg.classList.remove('compare-bg');
        mainBg.classList.add('dark-bg');
    } else {
        mainBg.classList.add('body-bg');
        mainBg.classList.remove('compare-bg');
        mainBg.classList.remove('dark-bg');
    }
    setGearEvents(this.checked);
});

btnCompare.addEventListener('click', () => {
    overlay.classList.remove('show');

    let chk1 = document.getElementById('chk-1');
    if (chk1.checked) {
        mainBg.classList.remove('body-bg');
        mainBg.classList.add('compare-bg');
        mainBg.classList.remove('dark-bg');
        compareContainer.classList.add('compare-container-dark');
        compareContainer.classList.remove('compare-container');
        compareClose.classList.add('compare-close-dark');
        compareClose.classList.remove('compare-close');
        compareInfo.classList.add('compare-info-dark');
        compareInfo.classList.remove('compare-info');
        vsCompare.style.display = "none";
        vsDarkCompare.style.display = "block";
    } else {
        mainBg.classList.remove('body-bg');
        mainBg.classList.add('compare-bg');
        mainBg.classList.remove('dark-bg');
        compareContainer.classList.remove('compare-container-dark');
        compareContainer.classList.add('compare-container');
        compareClose.classList.remove('compare-close-dark');
        compareClose.classList.add('compare-close');
        compareInfo.classList.remove('compare-info-dark');
        compareInfo.classList.add('compare-info');
        vsCompare.style.display = "block";
        vsDarkCompare.style.display = "none";
    }


});

document.addEventListener('DOMContentLoaded', (event) => {
    close.addEventListener('click', () => {
        overlay.classList.add('show');

        let chk1 = document.getElementById('chk-1');
        if (chk1.checked) {
            mainBg.classList.remove('body-bg');
            mainBg.classList.remove('compare-bg');
            mainBg.classList.add('dark-bg');

        } else {
            mainBg.classList.add('body-bg');
            mainBg.classList.remove('compare-bg');
            mainBg.classList.remove('dark-bg');

        }
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            overlay.classList.add('show');

            let chk1 = document.getElementById('chk-1');
            if (chk1.checked) {
                mainBg.classList.remove('body-bg');
                mainBg.classList.remove('compare-bg');
                mainBg.classList.add('dark-bg');
                compareContainer.classList.add('compare-container-dark');
                compareContainer.classList.remove('compare-container');
            } else {
                mainBg.classList.add('body-bg');
                mainBg.classList.remove('compare-bg');
                mainBg.classList.remove('dark-bg');
                compareContainer.classList.remove('compare-container-dark');
                compareContainer.classList.add('compare-container');
            }
        }
    });

    compareForm1.addEventListener('submit', (event) => {
        event.preventDefault();
        renderComparePokemon1(inputC1.value.toLowerCase());
    });

    compareForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        renderComparePokemon2(inputC2.value.toLowerCase());
    });

    btnPrevC1.addEventListener('click', () => {
        if (pokemonNameC1.innerHTML === 'não encontrado :(') {
            searchPokemonC1 = 1;
            renderComparePokemon1(searchPokemonC1);
            return;
        }

        if (searchPokemonC1 > 1) {
            searchPokemonC1 -= 1;
            renderComparePokemon1(searchPokemonC1);
        } else {
            searchPokemonC1 = MAX_POKEMON_NUMBER;
            renderComparePokemon1(searchPokemonC1);
        }
    });

    btnNextC1.addEventListener('click', () => {
        if (pokemonNameC1.innerHTML === 'não encontrado :(') {
            searchPokemonC1 = 1;
            renderComparePokemon1(searchPokemonC1);
            return;
        }

        if (searchPokemonC1 < MAX_POKEMON_NUMBER) {
            searchPokemonC1 += 1;
            renderComparePokemon1(searchPokemonC1);
        } else {
            searchPokemonC1 = 1
            renderComparePokemon1(searchPokemonC1);
        }
    });

    btnPrevC2.addEventListener('click', () => {
        if (pokemonNameC2.innerHTML === 'não encontrado :(') {
            searchPokemonC2 = 1;
            renderComparePokemon2(searchPokemonC2);
            return;
        }

        if (searchPokemonC2 > 1) {
            searchPokemonC2 -= 1;
            renderComparePokemon2(searchPokemonC2);
        } else {
            searchPokemonC2 = MAX_POKEMON_NUMBER;
            renderComparePokemon2(searchPokemonC2);
        }
    });

    btnNextC2.addEventListener('click', () => {
        if (pokemonNameC2.innerHTML === 'não encontrado :(') {
            searchPokemonC2 = 1;
            renderComparePokemon2(searchPokemonC2);
            return;
        }

        if (searchPokemonC2 < MAX_POKEMON_NUMBER) {
            searchPokemonC2 += 1;
            renderComparePokemon2(searchPokemonC2);
        } else {
            searchPokemonC2 = 1
            renderComparePokemon2(searchPokemonC2);
        }
    });
});

function calcWeakRes(sumC1Modified, sumC2Modified) {
    fightC1.forEach(type1 => {
        fightC2.forEach(type2 => {
            if (tipos[type1] && tipos[type1]['fraqueza'].includes(type2)) {
                sumC1Modified *= 0.5;
                sumC2Modified *= 2;
            }
        });
    });

    fightC2.forEach(type2 => {
        fightC1.forEach(type1 => {
            if (tipos[type2] && tipos[type2]['fraqueza'].includes(type1)) {
                sumC2Modified *= 0.5;
                sumC1Modified *= 2;
            }
        });
    });

    return [sumC1Modified, sumC2Modified];
}

function resetAnimation(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = null;
}

function fight() {
    let sumC1Modified = sumC1;
    let sumC2Modified = sumC2;

    [sumC1Modified, sumC2Modified] = calcWeakRes(sumC1Modified, sumC2Modified);

    try {
        if (pokemonNameC1.innerHTML == 'não encontrado :(' || pokemonNameC2.innerHTML == 'não encontrado :(') {
            drawC1.style.opacity = "0";
            drawC1.style.visibility = "hidden";
            drawC2.style.opacity = "0";
            drawC2.style.visibility = "hidden";
            defeatC1.style.opacity = "0";
            defeatC1.style.visibility = "hidden";
            defeatC2.style.opacity = "0";
            defeatC2.style.visibility = "hidden";
            victoryC1.style.opacity = "0";
            victoryC1.style.visibility = "hidden";
            victoryC2.style.opacity = "0";
            victoryC2.style.visibility = "hidden";
            return;
        }

        if (sumC1Modified === sumC2Modified) {
            resetAnimation(drawC1);
            resetAnimation(drawC2);

            drawC1.style.opacity = "0.8";
            drawC1.style.visibility = "visible";
            drawC2.style.opacity = "0.8";
            drawC2.style.visibility = "visible";
            defeatC1.style.opacity = "0";
            defeatC1.style.visibility = "hidden";
            defeatC2.style.opacity = "0";
            defeatC2.style.visibility = "hidden";
            victoryC1.style.opacity = "0";
            victoryC1.style.visibility = "hidden";
            victoryC2.style.opacity = "0";
            victoryC2.style.visibility = "hidden";
        } else if (sumC1Modified > sumC2Modified) {
            resetAnimation(defeatC2);
            resetAnimation(victoryC1);

            drawC1.style.opacity = "0";
            drawC1.style.visibility = "hidden";
            drawC2.style.opacity = "0";
            drawC2.style.visibility = "hidden";
            defeatC1.style.opacity = "0";
            defeatC1.style.visibility = "hidden";
            defeatC2.style.opacity = "0.8";
            defeatC2.style.visibility = "visible";
            victoryC1.style.opacity = "0.8";
            victoryC1.style.visibility = "visible";
            victoryC2.style.opacity = "0";
            victoryC2.style.visibility = "hidden";
        } else if (sumC1Modified < sumC2Modified) {
            resetAnimation(defeatC1);
            resetAnimation(victoryC2);

            drawC1.style.opacity = "0";
            drawC1.style.visibility = "hidden";
            drawC2.style.opacity = "0";
            drawC2.style.visibility = "hidden";
            defeatC1.style.opacity = "0.8";
            defeatC1.style.visibility = "visible";
            defeatC2.style.opacity = "0";
            defeatC2.style.visibility = "hidden";
            victoryC1.style.opacity = "0";
            victoryC1.style.visibility = "hidden";
            victoryC2.style.opacity = "0.8";
            victoryC2.style.visibility = "visible";
        }

        select('.status-total1').textContent = sumC1;
        select('.status-total2').textContent = sumC2;
        select('.buff-debuff1').textContent = sumC1Modified.toFixed(0);
        select('.buff-debuff2').textContent = sumC2Modified.toFixed(0);

    } catch (error) {
        console.error("Ocorreu um erro na luta: ", error);
    }
}

const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
            if (imagesLoaded >= 2) {
                fight(sumC1, sumC2);
            }
        }
    }
});

observer.observe(pokemonImageC1, { attributes: true });
observer.observe(pokemonImageC2, { attributes: true });

renderMainPokemon(searchPokemon);
renderComparePokemon1(searchPokemonC1);
renderComparePokemon2(searchPokemonC2);

//Suggestion

const pokemons = [];

async function fetchAllPokemon() {
    for (let id = 1; id <= MAX_POKEMON_NUMBER; id++) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (response.status === 200) {
                const { name } = response.data;
                pokemons.push({ id, name });
            }
        } catch (error) {
            console.error(`Erro ao buscar o Pokémon com o ID ${id}:`, error);
        }
    }
}

fetchAllPokemon();

//main

function filterPokemonList(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(lowerCaseInput) || pokemon.id.toString() === userInput);
}

function updateSuggestionsUI(suggestions) {
    const suggestionsElement = document.querySelector('.suggestions');

    suggestionsElement.innerHTML = '';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${suggestion.id} - ${suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}`;

        listItem.addEventListener('click', () => {
            suggestionsElement.innerHTML = '';
            suggestionsElement.classList.add('hidden');
            renderMainPokemon(suggestion.name);
        });

        suggestionsElement.appendChild(listItem);
    });
    suggestionsElement.scrollTop = 0;
}

document.querySelector('.input__search').addEventListener('input', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions');

    if (userInput === '') {
        updateSuggestionsUI([]);
        suggestionsElement.classList.add('hidden');
    } else {
        const suggestions = filterPokemonList(userInput);
        updateSuggestionsUI(suggestions);

        if (suggestions.length > 0) {
            suggestionsElement.classList.remove('hidden');
        } else {
            suggestionsElement.classList.add('hidden');
        }
    }
});

document.addEventListener('click', (event) => {
    const inputElement = document.querySelector('.input__search');
    const suggestionsElement = document.querySelector('.suggestions');

    if (!inputElement.contains(event.target) && !suggestionsElement.contains(event.target)) {
        suggestionsElement.classList.add('hidden');
    }
});

document.querySelector('.input__search').addEventListener('focus', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions');

    if (userInput !== '') {
        const suggestions = filterPokemonList(userInput);
        updateSuggestionsUI(suggestions);
        suggestionsElement.classList.remove('hidden');
    }
});

document.querySelector('.input__search').addEventListener('keydown', (event) => {
    const suggestionsElement = document.querySelector('.suggestions');

    if (event.key === 'Enter') {
        suggestionsElement.classList.add('hidden');
    }
});

//C1

function filterPokemonListC1(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(lowerCaseInput) || pokemon.id.toString() === userInput);
}

function updateSuggestionsUIC1(suggestions) {
    const suggestionsElement = document.querySelector('.suggestions__compare1');

    suggestionsElement.innerHTML = '';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${suggestion.id} - ${suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}`;

        listItem.addEventListener('click', () => {
            suggestionsElement.innerHTML = '';
            suggestionsElement.classList.add('hidden');
            renderComparePokemon1(suggestion.name);
        });

        suggestionsElement.appendChild(listItem);
    });
    suggestionsElement.scrollTop = 0;
}

document.querySelector('.input__search__compare1').addEventListener('input', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions__compare1');

    if (userInput === '') {
        updateSuggestionsUIC1([]);
        suggestionsElement.classList.add('hidden');
    } else {
        const suggestions = filterPokemonListC1(userInput);
        updateSuggestionsUIC1(suggestions);

        if (suggestions.length > 0) {
            suggestionsElement.classList.remove('hidden');
        } else {
            suggestionsElement.classList.add('hidden');
        }
    }
});

document.addEventListener('click', (event) => {
    const inputElement = document.querySelector('.input__search__compare1');
    const suggestionsElement = document.querySelector('.suggestions__compare1');

    if (!inputElement.contains(event.target) && !suggestionsElement.contains(event.target)) {
        suggestionsElement.classList.add('hidden');
    }
});

document.querySelector('.input__search__compare1').addEventListener('focus', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions__compare1');

    if (userInput !== '') {
        const suggestions = filterPokemonListC1(userInput);
        updateSuggestionsUI(suggestions);
        suggestionsElement.classList.remove('hidden');
    }
});

document.querySelector('.input__search__compare1').addEventListener('keydown', (event) => {
    const suggestionsElement = document.querySelector('.suggestions__compare1');

    if (event.key === 'Enter') {
        suggestionsElement.classList.add('hidden');
    }
});

//C2

function filterPokemonListC2(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(lowerCaseInput) || pokemon.id.toString() === userInput);
}

function updateSuggestionsUIC2(suggestions) {
    const suggestionsElement = document.querySelector('.suggestions__compare2');

    suggestionsElement.innerHTML = '';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${suggestion.id} - ${suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}`;

        listItem.addEventListener('click', () => {
            suggestionsElement.innerHTML = '';
            suggestionsElement.classList.add('hidden');
            renderComparePokemon2(suggestion.name);
        });

        suggestionsElement.appendChild(listItem);
    });
    suggestionsElement.scrollTop = 0;
}

document.querySelector('.input__search__compare2').addEventListener('input', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions__compare2');

    if (userInput === '') {
        updateSuggestionsUIC2([]);
        suggestionsElement.classList.add('hidden');
    } else {
        const suggestions = filterPokemonListC2(userInput);
        updateSuggestionsUIC2(suggestions);

        if (suggestions.length > 0) {
            suggestionsElement.classList.remove('hidden');
        } else {
            suggestionsElement.classList.add('hidden');
        }
    }
});

document.addEventListener('click', (event) => {
    const inputElement = document.querySelector('.input__search__compare2');
    const suggestionsElement = document.querySelector('.suggestions__compare2');

    if (!inputElement.contains(event.target) && !suggestionsElement.contains(event.target)) {
        suggestionsElement.classList.add('hidden');
    }
});

document.querySelector('.input__search__compare2').addEventListener('focus', (event) => {
    const userInput = event.target.value;
    const suggestionsElement = document.querySelector('.suggestions__compare2');

    if (userInput !== '') {
        const suggestions = filterPokemonListC2(userInput);
        updateSuggestionsUI(suggestions);
        suggestionsElement.classList.remove('hidden');
    }
});

document.querySelector('.input__search__compare2').addEventListener('keydown', (event) => {
    const suggestionsElement = document.querySelector('.suggestions__compare2');

    if (event.key === 'Enter') {
        suggestionsElement.classList.add('hidden');
    }
});