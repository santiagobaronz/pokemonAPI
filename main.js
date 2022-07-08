'use strict'

/* Selecting the elements from the HTML file. */
const findInput = document.querySelector('#findInput');
const findButton = document.querySelector('#findButton');
const alertBanner = document.querySelector('#alert-banner');

const resultDiv = document.querySelector('.results-div')
const pokemonTitle = document.querySelector('#pokemonTitle');
const pokemonImg = document.querySelector('#pokemonImg');
const pokemonSkills = document.querySelector('#pokemonSkills');

const convertString = (text) => {
    text = text[0].toUpperCase() + text.substring(1);
    return text;
}

const showPokemon = (userInfo) => {

    const request = fetch(`https://pokeapi.co/api/v2/pokemon/${userInfo}`);

    request.then( data => data.json())
            .then(({abilities, id,name, sprites}) => {

                name = convertString(name);
                pokemonTitle.innerHTML = `El pokémon es ${name} (${id})`;

                if(sprites.front_default != null){
                    pokemonImg.src = sprites.front_default;
                }else{
                    pokemonImg.src = "https://i.pinimg.com/originals/81/82/d8/8182d8cbea7f45d66d6511153e21ca32.png"
                }

                let pList = document.createElement("p");
                pList.id = "pList"
                resultDiv.appendChild(pList);
                pList.innerHTML = "Lista de habilidades:"

                pokemonSkills.remove();
                let newList = document.createElement("ul");
                newList.id = 'pokemonAbilities';
                resultDiv.appendChild(newList);
                

                abilities.forEach(element => {
                    let newItem = document.createElement('li');
                    newList.appendChild(newItem);
                    
                    let ability = convertString(element.ability.name);
                    newItem.innerHTML = ability;
                });

            })

}


findButton.addEventListener("click", () => {

    let inputValue = findInput.value;
    
    if(inputValue == '' || inputValue == "0"){
        alertBanner.innerHTML = "Ingresa algún dato válido...";
    }else{

        alertBanner.innerHTML = "";

        inputValue = inputValue.toLowerCase();
        inputValue = inputValue.trim();

        let listElement = document.querySelector('#pokemonAbilities');
        if(listElement != null){
            document.querySelector('#pList').remove();
            listElement.remove();
        }

        showPokemon(inputValue);

    }

},false)