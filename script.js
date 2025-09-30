const searchBox = document.getElementById("SearchBox");

let resultsContainer = document.getElementsByClassName("container")[0]

const validateInput = (el) => {
    if(el.value === ""){
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
    }else{
        generateResults(el.value, el)
    }
}

const debouncedValidateInput = debounce(validateInput, 500);

searchBox.addEventListener("keyup", function () {
    debouncedValidateInput(this);
});

const generateResults = (searchValue, inputField) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
    .then(response => response.json())
    .then(data => {
        let results = data.query.search
        let numberOfResults = data.query.search.length
        resultsContainer.innerHTML = ""
        for(let i=0; i<numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
        }
        if(inputField.value === ""){
            resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
        }
    })
}

function debounce(func, delay) {
  let timeoutId; // store timer id

  return function (...args) {
    clearTimeout(timeoutId); // clear previous timer
    timeoutId = setTimeout(() => {
      func.apply(this, args); // run the function
    }, delay);
  };
}


