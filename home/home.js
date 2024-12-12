function btc(publicKey) {
  fetch(`https://blockchain.info/q/addressbalance/${publicKey}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("btc").innerHTML = data / 100000000;
    });
}

function xmr(publicKey, viewKey) {
  fetch(``);
}
