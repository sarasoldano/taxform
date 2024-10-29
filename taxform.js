"use strict";

var input1 = document.querySelector('input[name=value-1]');
var input2 = document.querySelector('input[name=value-2]');
var input3 = document.querySelector('input[name=value-3]');
var input4 = document.querySelector('input[name=value-4]');

var checky = document.getElementById('checkbox');
var input5 = document.querySelector('input[name=value-5]');

var input6 = document.querySelector('input[name=value-6]')

var input7 = document.querySelector('input[name=value-7]')
var input8 = document.querySelector('input[name=value-8]')

var input9 = document.querySelector('input[name=value-9]')
var input10 = document.querySelector('input[name=value-10]')
var input11 = document.querySelector('input[name=value-11]')
var input12 = document.querySelector('input[name=value-12]')
var input13 = document.querySelector('input[name=value-13]')
var input14 = document.querySelector('input[name=value-14]')

var rates = [[10, 0, 0]
             [12, 11000, 22000],
             [22, 44725, 89450],
             [24, 95375, 190750],
             [32, 182100, 364200],
             [35, 231250, 462500],
             [37, 578125, 693750]]

function calculate_gross_income() {
    var val1 = parseFloat(input1.value) || 0;
    var val2 = parseFloat(input2.value) || 0;
    var val3 = parseFloat(input3.value) || 0;
    input4.value= val1 + val2 + val3;
}

function joint_or_not() {
    if(checky.checked){
        input5.value = 27700;
    } else {
        input5.value = 13850;
    }
}

function taxable_income() {
    var val4 = parseFloat(input4.value);
    var val5 = parseFloat(input5.value);
    if(val4 < val5){
        input6.value = 0;
    } else {
        input6.value = (val4 - val5);
    }
}

function total_paymentcreds() {
    var val7 = parseFloat(input7.value) || 0;
    var val8 = parseFloat(input8.value) || 0;
    input9.value = val7 + val8;
}

function customRound(value) {
    var remainder = value % 1; // Get the remainder when dividing by 1

    if (remainder < 0.25) {
        return Math.floor(value);
    } else if (remainder > 0.60) {
        return Math.ceil(value);
    } else {
        return Math.floor(value) + 0.5;
    }
}
function rate2perc(r) {
    var percentage = r/100
    return percentage; 
}

function multiplication(difference,percentage) {
    var tax = (difference * percentage).toFixed(2);
    var roundedTax = customRound(tax);
    return parseFloat(roundedTax).toFixed(2);
    //return tax;
}

var rates = [[10, 0, 0],
             [12, 11000, 22000],
             [22, 44725, 89450],
             [24, 95375, 190750],
             [32, 182100, 364200],
             [35, 231250, 462500],
             [37, 578125, 693750]
];

function tax_bracket() {
    var val6 = parseFloat(input6.value) || 0; 
    var result = 0;

    // check if married or not
    if(checky.checked){
        // if married, check if value6 is greater than the value of highest lower-bracket
        var maxlowb = rates[rates.length - 1][2];
        if (val6 > maxlowb) {
            // max length should always be 6
            let x = rates.length - 1;
            var maxlowplus1 = maxlowb + 1;
            var d1 = val6 - maxlowplus1; // subtract the input by the last lower bracket
            var p1 = rate2perc(rates[x][0]);
            result = multiplication(d1,p1);
            for(let j = x-1; j>=0; j--,x--){
                var d2 = rates[x][2] - (j === 0 ? rates[j][2] : rates[j][2] + 1);
                var perc = rate2perc(rates[j][0]);
                // result += multiplication(d2,perc);
                result = (parseFloat(result) + parseFloat(multiplication(d2, perc))).toFixed(1);
            }
        } else { // married but not greater than highest bracket
            // starting at the first array up to last array
            for(let i = 0; i < rates.length; i++) {
                // variable for last element in the i array
                let jointLowB = rates[i][2];
                // if the input is less than the last element
                if(jointLowB > val6) {
                    let x = i-1;
                    var d1 = val6 - (x === 0 ? rates[x][2] : rates[x][2]+1);
                    var p1 = rate2perc(rates[x][0]);
                    result = multiplication(d1,p1);
                    for(let j = x-1; j>=0; j--,x--){
                        var d2 = rates[x][2] - (j === 0 ? rates[j][2] : rates[j][2] + 1);
                        var perc = rate2perc(rates[j][0]);
                        // result += multiplication(d2,perc);
                        result = (parseFloat(result) + parseFloat(multiplication(d2, perc))).toFixed(1);
                    }
                    break;
                }
            }
        }
    } else { // Not married
        // greater than last bracket
        var maxlowb = rates[rates.length - 1][1];
        if (val6 > maxlowb) {
            let x = rates.length - 1;
            var maxlowplus1 = maxlowb + 1;
            var d1 = val6 - maxlowplus1; // subtract the input by the last lower bracket
            var p1 = rate2perc(rates[x][0]);
            result = multiplication(d1,p1);
            for(let j = x-1; j>=0; j--,x--){
                var d2 = rates[x][1] - rates[j][1];
                var perc = rate2perc(rates[j][0]);
                // result += multiplication(d2,perc);
                result = (parseFloat(result) + parseFloat(multiplication(d2, perc))).toFixed(1);
            }
        } else { // not married and not greater
            for(let i = 0; i < rates.length; i++) {
                // variable for last element in the i array
                let sepLowB = rates[i][1];
                // if the input is less than the last element
                if(sepLowB > val6) {
                    let x = i-1;
                    var d1 = val6 - (x === 0 ? rates[x][1] : (rates[x][1]) + 1);
                    var p1 = rate2perc(rates[x][0])
                    result = multiplication(d1,p1);
                    for(let j = x-1; j>=0; j--,x--){
                        var d2 = rates[x][1] - (j === 0 ? rates[j][1] : (rates[j][1]) + 1);          
                        var perc = rate2perc(rates[j][0]);
                        // result += multiplication(d2,perc);
                        result = (parseFloat(result) + parseFloat(multiplication(d2, perc))).toFixed(1);
                    }
                    break
                }
            }
        }
    }
    input10.value = result;
}

function total_tax() {
    var val10 = parseFloat(input10.value) || 0;
    var val11 = parseFloat(input11.value) || 0;
    input12.value = val10 + val11;
}

function refund_or_owe() {
    var val9 = parseFloat(input9.value) || 0;
    var val12 = parseFloat(input12.value) || 0;
    if(val9 > val12){
        input13.value = val9 - val12;
        input14.value = 0;
    }
    else if(val9 < val12){
        input13.value = 0;
        input14.value = val12 - val9;
    } else {
        // input13.value = 0;
        input14.value = 0;
    }
}

input1.addEventListener("input",calculate_gross_income);
input2.addEventListener("input",calculate_gross_income);
input3.addEventListener("input",calculate_gross_income);

checky.addEventListener('change',joint_or_not);

input1.addEventListener("input",taxable_income);
input2.addEventListener("input",taxable_income);
input3.addEventListener("input",taxable_income);
checky.addEventListener('change',taxable_income);
input4.addEventListener("input",taxable_income);


input7.addEventListener("input",total_paymentcreds);
input8.addEventListener("input",total_paymentcreds);

input1.addEventListener("input",tax_bracket);
input2.addEventListener("input",tax_bracket);
input3.addEventListener("input",tax_bracket);
input4.addEventListener("input",tax_bracket);
checky.addEventListener('change',tax_bracket);
input6.addEventListener('change',tax_bracket);


input1.addEventListener("input",total_tax);
input2.addEventListener("input",total_tax);
input3.addEventListener("input",total_tax);
input4.addEventListener("input",total_tax);
input6.addEventListener('change',total_tax);
input10.addEventListener("input",total_tax);
input11.addEventListener("input",total_tax);
input12.addEventListener("input",total_tax);
checky.addEventListener('change',total_tax);

input1.addEventListener("input",refund_or_owe);
input2.addEventListener("input",refund_or_owe);
input3.addEventListener("input",refund_or_owe);
input4.addEventListener("input",refund_or_owe);
checky.addEventListener('change',refund_or_owe);
input6.addEventListener('change',refund_or_owe);
input7.addEventListener("input",refund_or_owe);
input8.addEventListener("input",refund_or_owe);
input10.addEventListener("input",refund_or_owe);
input11.addEventListener("input",refund_or_owe);
input9.addEventListener("input",refund_or_owe);
input12.addEventListener("input",refund_or_owe);