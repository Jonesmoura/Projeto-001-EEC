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
let cimentom3
let areiam3
let britam3
let aguam3

// dados calculo argamassa

const alturaAmbiente = document.querySelector('input#alturaAmb')
const larguraAmbiente = document.querySelector('input#larguraAmb')
const nomeAmbiente = document.querySelector('input#nomeAmbiente')
let SomaAreaArgamassa = 0
const areaAmbiente = function (){
    
    return (alturaAmbiente.value)*(larguraAmbiente.value)

}
let ambientes = []
let contadorAmbientes = 0


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

    // limpa a exibição dos resultados, caso tenha sido calculado algo anteriormente
    divResultado.innerHTML = ''

    for(let i = 0; i<form.length; i++){

        form[i].classList.add('hide')

    }

}

// funções para calculo de concreto

function calcularVolumeConcreto(){

    return ((alturaConcreto.value/100) * (larguraConcreto.value/100) * (comprConcreto.value/100)).toFixed(2)

}

function calculoMateriaisConcreto(){

    const fckConcreto = String(document.querySelector('select#fck').value).substring(0,2)
    volumeConcreto = calcularVolumeConcreto()

    if(fckConcreto === '20'){

        //valores em kg/m³ para concreto de 20mpa
        cimentom3 = 368
        areiam3 = 719
        britam3 = 1087
        aguam3 = 174

        salvarQtMateriais()
        exibirResultado()

    }else if( fckConcreto === '30'){

        //valores em kg/m³ para concreto de 30mpa
        cimentom3 = 447
        areiam3 = 645
        britam3 = 1092
        aguam3 = 177

        salvarQtMateriais()
        exibirResultado()

    }

}

function salvarQtMateriais(){

    qtAreia = (volumeConcreto * areiam3).toFixed(2)
    qtCimento = (volumeConcreto * cimentom3).toFixed(2)
    qtBrita = (volumeConcreto * britam3).toFixed(2)
    qtAgua = (volumeConcreto * aguam3).toFixed(2)

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

const colagem = document.querySelector('#colagem')

// funções para calculo de argamassa

function consumoTotalArgamassa(){

    if(colagem.value === 'simples'){

        SomaAreaArgamassa += Number((areaAmbiente() * 5 * 1.1).toFixed(2))
        return SomaAreaArgamassa

    }else if(colagem.value ==='dupla'){

        SomaAreaArgamassa += Number((areaAmbiente() * 10 * 1.1).toFixed(2))
        return SomaAreaArgamassa

    }

}

function ArgamassaEmSacos20kg(){

     return Math.ceil(SomaAreaArgamassa/20)

}

function ObjetoAmbiente(){

    let key = nomeAmbiente.value
    let object = {}
    object[key] = areaAmbiente()
    return object

}

function exibirResultadoArgamassa(){

    contadorAmbientes ++
    ambientes.push(

        ObjetoAmbiente()

    )

    divResultado.innerHTML = ''

    let dadosResultado = document.createElement('p')
    dadosResultado.innerHTML = `

    Consumo total: <strong>${consumoTotalArgamassa()} Kg, ou ${ArgamassaEmSacos20kg()} sacos de 20 Kg. </strong> <br>
    
    `

    divResultado.appendChild(dadosResultado)
    divResultado.appendChild(listarAmbientes())

    

    divResultado.classList.remove('hide')
}

function limparResultado(){


    divResultado.innerHTML = ''
    ambientes = []
    
}

function listarAmbientes(){

    let ambientexArea = document.createElement('p')
    ambientexArea.innerHTML = '<strong>Lista de Ambientes/Área</strong><br>'

    ambientes.forEach(

        (element)=>{

            ambientexArea.innerHTML += `${Object.keys(element)} Área:${Object.values(element)} m² <br> `

        }

    )
    
    return ambientexArea

}
