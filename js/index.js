// const of buttons
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

// funcionalidad of styles
let valor = 10
const table = document.getElementById('table');
const openRow = () => {
    let rows = document.getElementsByClassName('column--table');
    let log = rows.length;
    let reduce = Array.prototype.slice.call(rows, log - 2, log - 1)
    reduce.length ? valor = reduce[0].innerText : valor = 0
    table.innerHTML += `<span class="section__card--input width--column column--table" >${++valor}</span>
    <input class="section__card--input width--column column--table" type="number" placeholder="cantidad">`
}
const deleteRow = () => {
    let rows = document.getElementsByClassName('column--table');
    let log = rows.length;
    if(log !== 2){
        let reduce = Array.prototype.slice.call(rows, 0, log - 2)
        table.innerHTML = `<span class="section__card--input width--column"><span id="numUnidades">Nro. de Uds.</span><span id="newUnidades"></span></span>
        <select class="section__card--input width--column" name="medias" id="medidas">
            <option value="horas">horas</option>
            <option value="dias">dias</option>
            <option value="metros">metros</option>
            <option value="bs.">bs.</option>
            <option value="$">$</option>
        </select>`;
        reduce.forEach(element => {
            table.appendChild(element)
        })
    }
}

// functio disable button
const disableButton = () => {
    btn2.disabled = false
    btn2.classList.remove('no--button')
    btn2.innerText = 'Get Accumulated'
    btn3.disabled = false
    btn3.classList.remove('no--button')
    btn3.innerText = 'Get Unidad'
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    let unidad = document.getElementById('unidad');
    start.disabled = false
    end.disabled = false
    unidad.disabled = false
}

// function object table lista
function objectItem (num) {
    this.num = num;
    this.costo = null;

}
// genration of list
const genListItem = () => {
    let lista = new Array()
    let ind = 0;
    let rows = document.getElementsByClassName('column--table');
    Array.prototype.forEach.call(rows, (row, index) => {
        if((index + 1) % 2 != 0) {
            lista.push(new objectItem(parseInt(row.innerText)))
        }
    });
    Array.prototype.forEach.call(rows, (row, index) => {
        if((index + 1) % 2 === 0) {
            lista[ind].costo = parseInt(row.value);
            ind++
        }
    })
    return lista;
}

// calulo of index learnig
const genlistDobles = () => {
    let dobles = new Array();
    let lista = genListItem();
    // sacando list de dobles
    let i = 1
    do{
        dobles.push(lista[i-1])
        i = i*2
    }while(i < lista.length)
    return dobles;
}
// validation of list item
const validation = (lista) => {
    let valorNan = lista.map(item => {
        return item.costo === NaN
    })
    return valorNan.length > 0 ? false : true
}
// calulo of index learnig
const calIndexLearn = () => {
    let lista = genlistDobles()
    let promedios = new Array()
    for (let i = 0; i < lista.length; i++) {
        if(i !== 0) {
            promedios.push(lista[i].costo/lista[i - 1].costo)
        }
    }
    // sacando el promedio
    return promedios.reduce((suma, i,) => {
        return suma += i
    },0)/promedios.length
}
// render result
const mostrarResult1 = (id) => {
    let result = calIndexLearn()
    let salida = document.getElementById(id);
    if(result){
        salida.innerText = `${(result*100).toFixed(2)}%`
        let section = document.getElementsByClassName('main__section');
        Array.prototype.forEach.call(section, item => item.classList.remove('opacity'));
        disableButton()
    } else {
        salida.innerText = 'llené todos los campos!'
    }
}

// function for calculate 
const costsUnidad = (fristCost, numPieza, porsetajeLearning) => {
    return fristCost * (numPieza**(Math.log10(porsetajeLearning)/Math.log10(2))) 
}
// calculate cost for acumulado
const costsAcum = (fristCost, startPieza, endPieza, porsetajeLearning) => {
    let sumaCost = 0
    for(let i = startPieza; i <= endPieza; i++) {
        sumaCost += costsUnidad(fristCost, i, porsetajeLearning)
    }
    return sumaCost
}

// render result
const mostrarResult2 = (id) => {
    let salida = document.getElementById(id)
    let medida = document.getElementById('medidas').value;
    let firstValue = document.getElementById('fristValue').value;
    let startPieza = document.getElementById('start').value;
    let endPieza = document.getElementById('end').value;
    let porsetaje = calIndexLearn()
    let costoAcumulado = costsAcum(parseInt(firstValue), parseInt(startPieza), parseInt(endPieza), porsetaje)
    salida.innerText = `${costoAcumulado.toFixed(2)} ${medida}.`
}

// render result
const mostrarResult3 = (id) => {
    let salida = document.getElementById(id)
    let medida = document.getElementById('medidas').value;
    let firstValue = document.getElementById('fristValue').value;
    let unidad = document.getElementById('unidad').value;
    let porsetaje = calIndexLearn()
    let costoUnidad = costsUnidad(parseInt(firstValue), parseInt(unidad), porsetaje) 
    salida.innerText = `${costoUnidad.toFixed(2)} ${medida}.`
}

// events buttons
btn1.onclick = () => {
    mostrarResult1("salidaI")
}

btn2.onclick = () => {
    mostrarResult2("salidaA")
}

btn3.onclick = () => {
    mostrarResult3("salidaU")
}


// services worques
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => console.error(error));
}