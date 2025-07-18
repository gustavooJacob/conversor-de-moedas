let form = document.getElementById("converter-form");
let amount = document.getElementById("amount");
let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let convertedAmount = document.getElementById("convertedAmount");
let loading = document.querySelector(".loading");
let result = document.querySelector(".result");
let error = document.querySelector(".error");

let API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
    loading.style.display = "block";
    error.style.display = "none";
    result.style.display = "none";

    try {
        let response = await fetch(API_URL + fromCurrency.value);
        let data = await response.json();

        let rate = data.rates[toCurrency.value];
        let convertedValue = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedValue;
        
        result.style.display = "block";
        
        result.innerHTML = `
            <div style="font-size: 1.4rem";>
                ${amount.value} ${fromCurrency.value} é igual a ${convertedValue} ${toCurrency.value}
            </div>
                
            <div style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px;">
                Taxa de Câmbio: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
            </div>
        `;

    } catch (err) {
        error.style.display = "block";
        error.innerHTML = `
        <div style="font-size: 1.2rem";>Falha ao converter moeda, por favor, tente novamente.</div>
        
        <div style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px;">Detalhes do erro: ${err.message}</div>
        `;
    }
    loading.style.display = "none";
}


form.addEventListener("submit", function(event) {
    event.preventDefault();
    convertMoney();
})