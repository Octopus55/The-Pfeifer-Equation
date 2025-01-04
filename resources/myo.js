function getInputValue() {
    let inputValue = document.getElementsByName('factor-value')[0].value;
    return inputValue
}

function calculateN() {
    let inputs = document.getElementsByName('factor-value');
    let operators = document.getElementsByClassName('operator');
    let n = Number(inputs[0].value);
    oCount = 0
    for (let o in operators) {
        if (operators[o].innerHTML === 'x'){
            n *= Number(inputs[oCount+1].value)
        }
        else if (operators[o].innerHTML === '+'){
            n += Number(inputs[oCount+1].value)
        }
        else if (operators[o].innerHTML === '='){
            return n
        }
        oCount += 1
    }
}

function calculateProb() {
    let inputs = document.getElementsByName('factor-value');
    let operators = document.getElementsByClassName('operator');
    let parentStyle = window.getComputedStyle(inputs[0].parentNode);
    let prob = 1;
    oCount = 0
    if (parentStyle.backgroundColor === "rgb(247, 197, 157)" || parentStyle.backgroundColor === "rgb(234, 160, 155)"){
        prob = Number(inputs[0].value);
    }
    for (let o in operators) {
        parentStyle = window.getComputedStyle(inputs[oCount+1].parentNode);
        if (operators[o].innerHTML === 'x' && (parentStyle.backgroundColor === "rgb(247, 197, 157)" || parentStyle.backgroundColor === "rgb(234, 160, 155)")) {
            prob *= Number(inputs[oCount+1].value)
        }
        else {
            return prob
        }
        oCount += 1
    }
}

function removeStreak4(decimal) {
    let strDecimal = decimal.toString()
    if (strDecimal.includes('e')){
        places = Number(strDecimal.split('-')[1])
    }
    else {
        places = 0
    }
    let len = strDecimal.length;
    streak = 1;
    prevChar = NaN;
    for (let c = len-1; c > 0; c--){
      char = strDecimal[c]
      if (char === prevChar){
        streak += 1;
      }
      else {
        streak = 1;
      }
      prevChar = char;
      if (streak >= 4 && prevChar != strDecimal[c-1] && strDecimal[c-1] != '.'){
        return Number(decimal.toFixed(c-2+places));
      }
    }
    return Number(strDecimal);
}


function calculateNumer() {
    prob = calculateProb()
    if (prob > 0.5) {
        numer = Math.round(prob/(1-prob));
    }
    else {
        numer = 1
    }
    return numer;
}

function calculateDenom() {
    prob = calculateProb()
    if (prob > 0.5) {
        denom = calculateNumer() + 1
    }
    else {
        denom = 1/prob
    }
    return denom
}

function calculateWorlds() {
    let inputs = document.getElementsByName('factor-value');
    let operators = document.getElementsByClassName('operator');
    let found = false;
    let numWorlds = 0;
    oCount = 0
    for (let o in operators) {
        parentStyle = window.getComputedStyle(inputs[oCount].parentNode);
        if (parentStyle.backgroundColor === "rgb(210, 177, 216)" && found === false) {
            numWorlds = Number(inputs[oCount].value)
            found = true;
        }
        else if (parentStyle.backgroundColor === "rgb(210, 177, 216)" && found === true){
            numWorlds *= Number(inputs[oCount].value)
        }
        if (parentStyle.backgroundColor === "rgb(193, 212, 193)" || oCount >= operators.length - 2){
            return numWorlds
        }
        oCount += 1
    }
}

function calculatePHabitable() {
    let inputs = document.getElementsByName('factor-value');
    let operators = document.getElementsByClassName('operator');
    let parentStyle = window.getComputedStyle(inputs[0].parentNode);
    let probH = 1;
    oCount = 0
    if (parentStyle.backgroundColor === "rgb(247, 197, 157)"){
        probH = Number(inputs[0].value);
    }
    for (let o in operators) {
        parentStyle = window.getComputedStyle(inputs[oCount+1].parentNode);
        if (operators[o].innerHTML === 'x' && parentStyle.backgroundColor === "rgb(247, 197, 157)") {
            probH *= Number(inputs[oCount+1].value)
        }
        else {
            return probH
        }
        oCount += 1
    }
}

function calculateProbLifeHab() {
    let inputs = document.getElementsByName('factor-value');
    let operators = document.getElementsByClassName('operator');
    let found = false;
    let probLH = 1;
    oCount = 0
    for (let o in operators) {
        parentStyle = window.getComputedStyle(inputs[oCount].parentNode);
        if (parentStyle.backgroundColor === "rgb(234, 160, 155)" && found === false) {
            probLH = Number(inputs[oCount].value)
            found = true;
        }
        else if (parentStyle.backgroundColor === "rgb(234, 160, 155)" && found === true){
            probLH *= Number(inputs[oCount].value)
        }
        if (parentStyle.backgroundColor === "rgb(210, 177, 216)" || oCount >= operators.length - 2){
            return probLH
        }
        oCount += 1
    }
}


const submit = document.getElementById('submit-button');

const result = document.getElementById('result');
result.hidden = true;

function showResult() {
    n = Math.round(calculateN())
    if (n === 1){
        worlds = 'World'
    }
    else {
        worlds = 'Worlds'
    }
    result.innerHTML = `n = ${n.toLocaleString()} Life-Inhabiting ${worlds}`;
    result.hidden = false;
}

submit.addEventListener('click', showResult)

const result2 = document.getElementById('result2');
result2.hidden = true;

function showResult2() {
    prob = calculateProb()
    prob = removeStreak4(prob)
    result2.innerHTML = `${prob} Probability of Life on Individual World`;
    result2.hidden = false;
}

submit.addEventListener('click', showResult2)

const result3 = document.getElementById('result3');
result3.hidden = true

function showResult3() {
    numer = calculateNumer()
    denom = Math.round(calculateDenom())
    if (numer === Infinity && denom === Infinity) {
        result3.innerHTML = "Every World has Life?!"
    }
    else {
        result3.innerHTML = `That's ${numer.toLocaleString()} in every ${denom.toLocaleString()} Worlds!`;
    }
    result3.hidden = false;
}

submit.addEventListener('click', showResult3)

const result4 = document.getElementById('result4');
result4.hidden = true

function showResult4() {
    totalWorlds = Math.round(calculateWorlds())
    result4.innerHTML = `${totalWorlds.toLocaleString()} Total Worlds`
    result4.hidden = false;
}

submit.addEventListener('click', showResult4)

const result5 = document.getElementById('result5');
result5.hidden = true

function showResult5() {
    probHabitable = calculatePHabitable()
    probHabitable = removeStreak4(probHabitable)
    result5.innerHTML = `${probHabitable} Probability of a Habitable World`;
    result5.hidden = false;
}

submit.addEventListener('click', showResult5)

const result6 = document.getElementById('result6');
result6.hidden = true

function showResult6() {
    probLifeHab = calculateProbLifeHab()
    probLifeHab = removeStreak4(probLifeHab)
    result6.innerHTML = `${probLifeHab} Probability of Life on a Habitable World`;
    result6.hidden = false;
}

submit.addEventListener('click', showResult6)


let inputs = document.getElementsByName('factor-value');


let factors = document.getElementsByClassName('with-input');

for (let f = 0; f < factors.length; f++){
    let invalidText = document.createElement('p');
    invalidText.innerHTML = 'some text';
    invalidText.style.margin = 0;
    invalidText.style.color = "rgb(227, 71, 59)"
    invalidText.style.marginInline = '10%'
    factors[f].appendChild(invalidText);
    factors[f].lastChild.hidden = true
}


let checkValid = function(event) {
    let parentStyle = window.getComputedStyle(event.target.parentNode);
    if (parentStyle.backgroundColor === "rgb(247, 197, 157)" || parentStyle.backgroundColor === "rgb(234, 160, 155)") {
        if (event.target.value === ''){
            event.target.style.backgroundColor = "white";
            event.target.style.borderColor = "black";

            event.target.parentNode.lastChild.hidden = true
        }
        else if (Number(event.target.value) <= 1 && Number(event.target.value) >= 0) {
            event.target.style.borderStyle = 'solid';
            event.target.style.borderColor = "rgb(93, 165, 96)";
            event.target.style.backgroundColor = "rgb(193, 212, 193)"

            event.target.parentNode.lastChild.hidden = true
        }
        else {
            event.target.style.borderStyle = 'solid'
            event.target.style.borderColor = "rgb(227, 71, 59)"
            event.target.style.backgroundColor = "rgb(234, 160, 155)"

            event.target.parentNode.lastChild.innerHTML = 'Please enter a value between 0 and 1'
            event.target.parentNode.lastChild.hidden = false
        }   
    }
    else if (parentStyle.backgroundColor === "rgb(210, 177, 216)"){
        if (event.target.value === ''){
            event.target.style.backgroundColor = "white";
            event.target.style.borderColor = "black";

            event.target.parentNode.lastChild.hidden = true
        }
        else if (Number(event.target.value) >= 0) {
            event.target.style.borderStyle = 'solid';
            event.target.style.borderColor = "rgb(93, 165, 96)";
            event.target.style.backgroundColor = "rgb(193, 212, 193)"

            event.target.parentNode.lastChild.hidden = true
        }
        else {
            event.target.style.borderStyle = 'solid'
            event.target.style.borderColor = "rgb(227, 71, 59)"
            event.target.style.backgroundColor = "rgb(234, 160, 155)"

            event.target.parentNode.lastChild.innerHTML = 'Please enter a positive value'
            event.target.parentNode.lastChild.hidden = false
        }
    }
    else if (parentStyle.backgroundColor === "rgb(193, 212, 193)"){
        if (event.target.value === ''){
            event.target.style.backgroundColor = "white";
            event.target.style.borderColor = "black";

            event.target.parentNode.lastChild.hidden = true
        }
        else if (Number(event.target.value) >= 0 && Number(event.target.value) % 1 === 0) {
            event.target.style.borderStyle = 'solid';
            event.target.style.borderColor = "rgb(93, 165, 96)";
            event.target.style.backgroundColor = "rgb(193, 212, 193)"

            event.target.parentNode.lastChild.hidden = true
        }
        else {
            event.target.style.borderStyle = 'solid'
            event.target.style.borderColor = "rgb(227, 71, 59)"
            event.target.style.backgroundColor = "rgb(234, 160, 155)"

            event.target.parentNode.lastChild.innerHTML = 'Please enter a positive integer'
            event.target.parentNode.lastChild.hidden = false
        }
    }
}

for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('keyup', checkValid);
}


const addOrangeButton = document.getElementById('add-orange');
const addRedButton = document.getElementById('add-red');
const addPurpleButton = document.getElementById('add-purple');
const addGreenButton = document.getElementById('add-green');

function addFactor(event) {
    if (event.target.innerHTML.includes('Orange')){
        color = 'orange';
    }
    else if (event.target.innerHTML.includes('Red')){
        color = 'red';
    }
    else if (event.target.innerHTML.includes('Purple')){
        color = 'purple';
    }
    else if (event.target.innerHTML.includes('Green')){
        color = 'green';
    }

    let newOperator = document.createElement('div');
    newOperator.classList.add('operator', 'x');
    if (color === 'red'){
        newOperator.classList.add('red');
    }
    else if (color === 'purple'){
        newOperator.classList.add('purple');
    }
    else if (color === 'green'){
        newOperator.classList.add('green');
    }
    newOperator.style.marginRight = '4px'
    newOperator.innerHTML = 'x'
    if (color === 'green'){
        newOperator.innerHTML = '+'
    }

    let newFactor = document.createElement('div');
    newFactor.classList.add('circle', 'outer')
    if (color === 'red'){
        newFactor.classList.add('red');
    }
    else if (color === 'purple'){
        newFactor.classList.add('purple');
    }
    else if (color === 'green'){
        newFactor.classList.add('green');
    }
    newFactor.style.marginRight = '0.25em'
    newFactor.innerHTML = '<div class="circle inner with-input">';
    if (color === 'red'){
        newFactor.firstChild.classList.add('red');
    }
    else if (color === 'purple'){
        newFactor.firstChild.classList.add('purple');
    }
    else if (color === 'green'){
        newFactor.firstChild.classList.add('green');
    }
    
    let descriptionBox = document.createElement('textarea')
    descriptionBox.name = "factor-description";
    descriptionBox.placeholder = "Enter Your Factor Here";
    descriptionBox.rows = "2";
    descriptionBox.cols = "11";
    descriptionBox.maxLength = "50";
    descriptionBox.style.overflow = "hidden";
    descriptionBox.style.resize = "none";
    descriptionBox.style.height = '6.5vw';
    descriptionBox.style.width = '15vw';
    descriptionBox.style.fontSize = '3vw';
    descriptionBox.style.textAlign = 'center';
    descriptionBox.style.fontFamily = "Poor Story";
    descriptionBox.style.fontWeight = '400';
    descriptionBox.style.fontStyle = 'normal';
    descriptionBox.style.borderStyle = 'solid';
    descriptionBox.style.borderWidth = '0.2vw';
    descriptionBox.style.borderColor = 'black';
    
    let inputBox = document.createElement('input');
    inputBox.type = "text";
    inputBox.name = "factor-value";

    let invalidText = document.createElement('p');
    invalidText.innerHTML = 'some text';
    invalidText.style.margin = 0;
    invalidText.style.color = "rgb(227, 71, 59)"
    invalidText.style.marginInline = '10%'

    inputBox.addEventListener('keyup', checkValid);

    newFactor.firstChild.appendChild(descriptionBox);
    newFactor.firstChild.appendChild(inputBox);
    newFactor.firstChild.appendChild(invalidText);
    newFactor.firstChild.lastChild.hidden = true;

    let referenceElement = document.getElementsByClassName('or-re')[0];
    if (color === 'orange' && document.getElementsByClassName('or-re').length === 0){
        referenceElement = NaN
    }
    else if (color === 'red'){
        referenceElement = document.getElementsByClassName('re-pr')[0];
        if (document.getElementsByClassName('re-pr').length === 0){
            referenceElement = NaN
        }
    }
    else if (color === 'purple'){
        referenceElement = document.getElementsByClassName('pr-gr')[0];
        if (document.getElementsByClassName('pr-gr').length === 0){
            referenceElement = document.querySelectorAll('.operator.green')[0];
        }
    }
    else if (color === 'green'){
        referenceElement = document.getElementsByClassName('=')[0];
    }

    document.body.insertBefore(newOperator, referenceElement);
    document.body.insertBefore(newFactor, referenceElement);
}

addOrangeButton.addEventListener('click', addFactor);
addRedButton.addEventListener('click', addFactor);
addPurpleButton.addEventListener('click', addFactor);
addGreenButton.addEventListener('click', addFactor);



const removeButton = document.getElementById('remove-factor')

function removeFactor() {
    let factors = document.getElementsByClassName('with-input');

    for (let f = 0; f < factors.length; f++){
        let rIcon = document.createElement('p');
        rIcon.classList.add('ricon');
        rIcon.style.color = "rgb(227, 71, 59)";
        rIcon.innerHTML = 'x';
        rIcon.style.margin = 0;
        rIcon.style.fontSize = '4vw';
        rIcon.style.height = '10%';
        rIcon.style.cursor = 'pointer';
        
        factors[f].appendChild(rIcon);
    }

    removeButton.innerHTML = 'Cancel';
    removeButton.style.justifyContent = 'center';
    removeButton.removeEventListener('click', removeFactor);

    function executeCancel(){
        let factors = document.getElementsByClassName('with-input');

        for (let f = 0; f < factors.length; f++){
            factors[f].removeChild(factors[f].lastChild);
        }

        removeButton.innerHTML = 'Remove Factor <span class="red" id="remove-icon">x</span>';
        removeButton.removeEventListener('click', executeCancel);
        removeButton.addEventListener('click', removeFactor);
        
    }

    removeButton.addEventListener('click', executeCancel);

    function removeCircles(event){
        let outerCircle = event.target.parentNode.parentNode;
        let correspondingOperator = outerCircle.nextElementSibling;
        if (correspondingOperator.classList.contains('=') || correspondingOperator.classList.contains('or-re') || correspondingOperator.classList.contains('re-pr') || correspondingOperator.classList.contains('pr-gr')){
            if (!outerCircle.previousElementSibling.classList.contains('or-re') && !outerCircle.previousElementSibling.classList.contains('re-pr') && !outerCircle.previousElementSibling.classList.contains('pr-gr')){
                correspondingOperator = outerCircle.previousElementSibling;
            }
            if (correspondingOperator.innerHTML === '='){
                correspondingOperator = outerCircle.previousElementSibling;
            }
            else if (!outerCircle.previousElementSibling.classList.contains('operator')){
                correspondingOperator = outerCircle.nextElementSibling;
            }
        }

        document.body.removeChild(outerCircle)
        document.body.removeChild(correspondingOperator)
    }

    for (let f = 0; f < factors.length; f++){
        factors[f].lastChild.addEventListener('click', removeCircles);
    }    
}

removeButton.addEventListener('click', removeFactor)