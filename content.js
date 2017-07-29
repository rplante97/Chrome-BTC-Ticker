//Initialize variables
const xhr = new XMLHttpRequest();
var oldAmount = null;

//Coinbase price data url for BTC-USD
const COINBASE_BTC_PRICE_URL = "https://api.coinbase.com/v2/prices/BTC-USD/spot"

//Set icon badge with current price of BTC
const setBadge = (amt) => {
  if(amt > oldAmount){
  	//green (5 seconds)
  	chrome.browserAction.setBadgeBackgroundColor({color: "#008000"});
  }
  else if (amt < oldAmount){
  	//red (5  seconds)
  	chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
  }
  setTimeout(setColorDefault, 5000);

  chrome.browserAction.setBadgeText({
    text: amt
  });
  oldAmount = amt;
};

const setColorDefault = function() {
	chrome.browserAction.setBadgeBackgroundColor({color: "#3297FD"});
}

//Fetches current BTC price and sets badge
const fetchPrice = () => {
  xhr.open("GET", COINBASE_BTC_PRICE_URL, true);
  xhr.onreadystatechange = function() {
  	//readyState 4 means request is finished and response is ready
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      const { data: { amount } } = response;
      var amt = parseFloat(amount);
      amt = amt.toFixed(1);
      setBadge(amt);
    }
  }
  xhr.send();
};

//Init for fetchPrice
fetchPrice();

//Poll for price every 10 seconds
setInterval(fetchPrice, 5000);
