const grandeza = [
    'massa',
    'velocidade',
    'força',
    'comprimento',
    'pressao',
]

const massa = [
    'kg',
    'g',
    'T'
]

const velocidade = [
    'km/h',
    'm/s',
]

const força = [
    'kgf',
    'N',
]

const comprimento = [
    'metro',
    'mm',
    'cm',
    'km',
    'pol'
]

const pressao = [
    'Mpa',
    'Kpa',
    'M.c.a',
    'kgf/cm2'
]

//object taxas de conversão, usarei o elemento taxasDeConversao[name] para acessar o valor cadastrado no objeto

const taxasDeConversao = {
    // considerar taxa de multiplicação

    //taxas para massa
    'kgg': 1000,
    'kgT': 0.001,
    'gkg': 0.001,
    'gT': 0.000001,
    'Tkg': 1000,
    'Tg': 1000000,

    // velocidade

    'km/hm/s': 0.2777778,
    'm/skm/h': 3.6,

    // força

    'kgfN': 9.80665,
    'Nkgf': 0.101972,

    //comprimento

    'metromm': 1000,
    'metrocm': 100,
    'metrokm': 0.001,
    'metropol': 39.3701,
    'mmmetro': 0.001,
    'mmcm': 0.1,
    'mmkm': 0.000001,
    'mmpol': 0.0393701,
    'cmmetro': 0.010,
    'cmmm': 10,
    'cmkm': 0.00001,
    'cmpol': 0.393701,
    'kmmetro': 1000,
    'kmmm': 1000000,
    'kmcm': 100000,
    'kmpol': 39370.1,
    'polmetro': 0.0254,
    'polmm': 25.4,
    'polcm': 2.54,
    'polkm': 0.0000254,

    // pressao

    'MpaKpa': 1000,
    'MpaM.c.a': 101.974,
    'Mpakgf/cm2': 10.1972,
    'KpaMpa': 0.001,
    'KpaM.c.a': 0.10197,
    'Kpakgf/cm2': 0.0101972,
    'M.c.aMpa': 0.00980638,
    'M.c.aKpa': 9.80638,
    'M.c.aKgf/cm2': 0.1,
    'kgf/cm2Mpa': 0.0980665,
    'kgf/cm2Kpa': 98.0665,
    'kgf/cm2M.c.a': 10.3323,

}

const listaGrandeza = document.querySelector("#grandeza")
const listaUn = document.querySelector('.listaUn1')
const listaUn2 = document.querySelector('.listaUn2')
const valorEntrada = document.querySelector('#valorEntrada')
const valorSaida = document.querySelector('#valorSaida')


function atualizarLista() {

    if (listaGrandeza.length === 0) {

        for (i = 0; i < grandeza.length; i++) {
            let addGrandeza = grandeza[i]
            let itemNaListaGrandeza = document.createElement('option')
            itemNaListaGrandeza.innerHTML = `${addGrandeza}`
            itemNaListaGrandeza.value = `${addGrandeza}`
            listaGrandeza.appendChild(itemNaListaGrandeza)

        }

        listaGrandeza.value =''

    }

}

function limparUn (){

    listaUn.value = ""
    listaUn.innerHTML = ""
    listaUn2.value = ""
    listaUn2.innerHTML = ""
}

atualizarLista()

function addItensGrandeza(grandeza, lista) {

    let addUn
    let addLista

    for (i = 0; i < grandeza.length; i++) {

        addUn = grandeza[i]
        addLista = document.createElement('option')
        addLista.innerHTML = `${addUn}`
        addLista.value = `${addUn}`
        lista.appendChild(addLista)
        
    }
    // a atribuição abaixo foi feita para que apos a criação da lista não tenhamos nenhum select pre selecionado
    lista.value = ''

}

function atualizarUnidades(lista) {

    if (lista.length === 0) {

        if (listaGrandeza.value == 'pressao') {

            addItensGrandeza(pressao, lista)

        } else if (listaGrandeza.value == 'massa') {

            addItensGrandeza(massa, lista)

        } else if (listaGrandeza.value == 'velocidade') {

            addItensGrandeza(velocidade, lista)

        } else if (listaGrandeza.value == 'força') {

            addItensGrandeza(força, lista)

        } else if(listaGrandeza.value == 'comprimento'){

            addItensGrandeza(comprimento, lista)

        }
    }
}

function calcular() {

    
    if(valorEntrada.value === ''){

    alert('Preencher valor a ser convertido')

    }else if(listaUn.value === listaUn2.value){

    alert('Selecionar unidades diferentes para realizar a conversão.')

    } else{

    let eleObjTaxa = String(listaUn.value + listaUn2.value)
    resultado = (taxasDeConversao[eleObjTaxa] * valorEntrada.value).toFixed(5)
    valorSaida.value = resultado

    }
    
}

function limparDados (){

    limparUn()

    listaGrandeza.value =''
    valorEntrada.value = ''
    valorSaida.value=''

}
