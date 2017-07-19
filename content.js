//Initialize variables
const xhr = new XMLHttpRequest();
let amt = 0;

//Coinbase price data url for BTC-USD
const COINBASE_BTC_PRICE_URL = "https://api.coinbase.com/v2/prices/BTC-USD/spot"

//Set icon badge with current price of BTC
const setBadge = (amt) => {
  chrome.browserAction.setBadgeText({
    text: amt.split('.')[0]
  });
};

//Fetches current BTC price and sets badge
const fetchPrice = () => {
  xhr.open("GET", COINBASE_BTC_PRICE_URL, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      const resp = JSON.parse(xhr.responseText);
      const { data: { amount } } = resp;
      amt = amount;
      setBadge(amount);
    }
  }
  xhr.send();
};

//Init for fetchPrice
fetchPrice();

//Poll for price every 10 seconds
setInterval(fetchPrice, 10000);
