const materiais = [

    'concreto',
    'argamassa'

]

const listaGrandeza = document.querySelector("#grandeza")
const form = [

    document.querySelector('div.concreto'),
    document.querySelector('div.argamassa')

]

const alturaConcreto = document.querySelector('input#alturaConcreto')
const larguraConcreto = document.querySelector('input#larguraConcreto')
const comprConcreto = document.querySelector('input#comprConcreto')
const divResultado = document.querySelector('div.resultados')
let volumeConcreto
let qtAreiaKG
let qtCimentoKG
let qtBritaKG
let qtAguaKG
let qtAreiaLatas
let qtBritaLatas
let qtAguaLatas
let qtCimentoSacos

// dados calculo argamassa

const alturaAmbiente = document.querySelector('input#alturaAmb')
const larguraAmbiente = document.querySelector('input#larguraAmb')
const nomeAmbiente = document.querySelector('input#nomeAmbiente')
let SomaAreaArgamassa = 0
const areaAmbiente = function (){
    
    return ((alturaAmbiente.value)*(larguraAmbiente.value)).toFixed(2)

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

        salvarQtMateriais(719,368,1087,174)

    }else if( fckConcreto === '30'){

        salvarQtMateriais(645,447,1092,177)

    }

    exibirResultado()

}

function salvarQtMateriais(areiam3, cimentom3, britam3,aguam3){

    qtAreiaKG = (volumeConcreto * areiam3).toFixed(2)
    qtCimentoKG = (volumeConcreto * cimentom3).toFixed(2)
    qtBritaKG = (volumeConcreto * britam3).toFixed(2)
    qtAguaKG = (volumeConcreto * aguam3).toFixed(2)

    converterMateriaisLatas()

}

function converterMateriaisLatas(){

    qtAreiaLatas = Math.ceil(qtAreiaKG / 24)
    qtBritaLatas = Math.ceil(qtBritaKG / 20.8)
    qtAguaLatas = Math.ceil(qtAguaKG / 16) //considerando densidade 1:1
    qtCimentoSacos = Math.ceil(qtCimentoKG / 25)

}
// calcular consumo por latas de 18l e saco de cimento
// informações para cálculo
// 1 lata de areia = 24kg
// 1 lata de brita = 20,8kg
// 1 lata de água  = 16kg(densidade 1para1)

function exibirResultado(){

    divResultado.innerHTML = ''

    let dadosResultado = document.createElement('p')
    dadosResultado.innerHTML = `

    Volume total de concreto: <strong>${volumeConcreto} m³</strong> <br>
    Quantidade total de areia: <strong>${qtAreiaKG} kg, ou ${qtAreiaLatas} Latas </strong> <br>
    Quantidade total de cimento: <strong>${qtCimentoKG} kg, ou ${qtCimentoSacos} sacos de 25Kg </strong> <br>
    Quantidade total de brita: <strong>${qtBritaKG} kg, ou ${qtBritaLatas} Latas </strong> <br>
    Quantidade total de água: <strong>${qtAguaKG} kg, ou ${qtAguaLatas} Latas </strong> <br>
    
    `
    divResultado.appendChild(dadosResultado)

    divResultado.classList.remove('hide')

}

const colagem = document.querySelector('#colagem')

// funções para calculo de argamassa

function consumoTotalArgamassa(){
   
    if(colagem.value === 'simples'){

        SomaAreaArgamassa += Number((areaAmbiente() * 5 * 1.1).toFixed(2))
        return SomaAreaArgamassa.toFixed(2)

    }else if(colagem.value ==='dupla'){

        SomaAreaArgamassa += Number((areaAmbiente() * 10 * 1.1).toFixed(2))
        return SomaAreaArgamassa.toFixed(2)

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

    if(alturaAmbiente.value ==='' || larguraAmbiente.value==='' || nomeAmbiente.value === ''){
    
        alert('Preencher campos vazios')
          
    } else{
        
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

}

function limparResultado(){


    divResultado.innerHTML = ''
    ambientes = []
    SomaAreaArgamassa = 0
    alturaAmbiente.value = ''
    larguraAmbiente.value = ''
    nomeAmbiente.value = ''

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
