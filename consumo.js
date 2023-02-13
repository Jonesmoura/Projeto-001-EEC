const materiais = [

    'concreto',
    'argamassa',
    'nivelador_piso',
    'tinta',
    'massa_Corrida'

]

const listaGrandeza = document.querySelector("#grandeza")
const form = [

    document.querySelector('div.concreto'),
    document.querySelector('div.argamassa'),
    document.querySelector('div.nivelador_piso'),
    document.querySelector('div.tinta'),
    document.querySelector('div.massa_Corrida')

]

function atualizarLista() {

    if (listaGrandeza.length === 0) {

        for (i = 0; i < materiais.length; i++) {
            let addGrandeza = materiais[i]
            let itemNaListaGrandeza = document.createElement('option')
            itemNaListaGrandeza.innerHTML = `${addGrandeza}`
            itemNaListaGrandeza.value = `${addGrandeza}`
            listaGrandeza.appendChild(itemNaListaGrandeza)

        }

        listaGrandeza.value =''

    }

}

atualizarLista()

function attFormulario(){

    esconderForm()

    // função para hide/unHide dos formularios para calculo de consumo, de acordo com o item selecionado

    for(let i = 0; i<form.length; i++){

        if(form[i].classList[0] === listaGrandeza.value){

            form[i].classList.remove('hide')

        }
    }
}

function esconderForm(){

    for(let i = 0; i<form.length; i++){

        form[i].classList.add('hide')

    }

}
