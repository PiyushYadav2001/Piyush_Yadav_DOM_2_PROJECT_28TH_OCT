// Function to fetch data from the API using Promises
function fetchDataWithPromises() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           
            return response.json();
        })
        .then((data) => {
            console.log(data)
            displayData(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("Something Went Worng Try After Some <T></T>ime");
            //Handleing the error with custom message 
        });
}


// Function to display the data in a table
function displayData(data) {
    const cryptoTableBody = document.getElementById("cryptoTableBody");
    data.forEach((coin) => {
        const row = cryptoTableBody.insertRow();

        // Coin Name
        const coinNameCell = row.insertCell(0);
        const coinName = document.createElement("div");
        coinName.className = "coin-name";
        const coinImg = document.createElement("img");
        coinImg.className = "coin-img";
        coinImg.src = coin.image;
        coinImg.alt = coin.name;
        const coinText = document.createTextNode(coin.name);
        coinName.appendChild(coinImg);
        coinName.appendChild(coinText);
        coinNameCell.appendChild(coinName);

        // Symbol
        const symbolCell = row.insertCell(1);
        symbolCell.textContent = coin.symbol;
        symbolCell.classList.add("symbol");

        // Current Price
        const priceCell = row.insertCell(2);
        priceCell.textContent = `$${coin.current_price.toFixed(2)}`;

        // 24h Volume
        const volumeCell = row.insertCell(3);
        volumeCell.textContent = `$${coin.total_volume.toLocaleString()}`;

        // Change
        const changeCell = row.insertCell(4);
        changeCell.textContent = coin.price_change_percentage_24h.toFixed(2) + "%";
        if (coin.price_change_percentage_24h > 0) {
            changeCell.classList.add("green");
        } else {
            changeCell.classList.add("red");
        }
   
        const mk = row.insertCell(5);
        mk.textContent = `Mkt Cap : $${coin.market_cap
            .toLocaleString()}`;
    });

         
      

        
    
}

// Fetch and display data when the page loads
window.addEventListener("load", () => {
    fetchDataWithPromises();
});
