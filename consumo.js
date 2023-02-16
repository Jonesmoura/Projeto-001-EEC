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

const alturaConcreto = document.querySelector('input#alturaConcreto')
const larguraConcreto = document.querySelector('input#larguraConcreto')
const comprConcreto = document.querySelector('input#comprConcreto')
const divResultado = document.querySelector('div.resultados')
let volumeConcreto
let qtAreia
let qtCimento
let qtBrita
let qtAgua


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

function calcularVolumeConcreto(){

    return ((alturaConcreto.value/100) * (larguraConcreto.value/100) * (comprConcreto.value/100)).toFixed(2)

}

function calculoMateriaisConcreto(){

    const fckConcreto = String(document.querySelector('select#fck').value).substring(0,2)

    if(fckConcreto === '20'){

        // calculo de materiais com volume e massa, conforme planilha de calculo de traço
        volumeConcreto = calcularVolumeConcreto()
        const cimentom3 = 447
        const areiam3 = 645
        const britam3 = 1092
        const aguam3 = 177

        qtAreia = (volumeConcreto * areiam3).toFixed(2)
        qtCimento = (volumeConcreto * cimentom3).toFixed(2)
        qtBrita = (volumeConcreto * britam3).toFixed(2)
        qtAgua = (volumeConcreto * aguam3).toFixed(2)

        console.log(`qtAreia: ${qtAreia} qtCimento: ${qtCimento} qtBrita ${qtBrita} qtAgua ${qtAgua}`)

        // criar lógica para hide/unhide da div de resultados

        exibirResultado()


    }else if( fckConcreto === 30){

        console.log(' fck 30 não calculado ainda.')

    }

}

function exibirResultado(){

    divResultado.innerHTML = ''

    let dadosResultado = document.createElement('p')
    dadosResultado.innerHTML = `

    Volume total de concreto: <strong>${volumeConcreto} m³</strong> <br>
    
    Quantidade total de areia: <strong>${qtAreia} kg</strong> <br>
    Quantidade total de cimento: <strong>${qtCimento} kg</strong> <br>
    Quantidade total de brita: <strong>${qtBrita} kg</strong> <br>
    Quantidade total de água: <strong>${qtAgua} kg</strong> <br>
    
    `
    divResultado.appendChild(dadosResultado)

    divResultado.classList.remove('hide')


}