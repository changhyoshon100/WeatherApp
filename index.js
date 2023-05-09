const btn = document.querySelector("#btn");
const searchText = document.querySelector("#searchBar");
const appKey = "af5f9c9a2a1d0c99d0af858bc7caa75f";
let inputRst = "";
btn.addEventListener("click", clickSearch);
searchText.addEventListener("input", keyPress);

function keyPress(e) {
  console.log(searchText.value);
  inputRst = searchText.value;
}

function clickSearch(e) {
  console.log(inputRst);
}
