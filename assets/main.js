var data = [];
window.addEventListener("load", async () => {
  //load data json
  const getData = async () => {
    return await fetch("./assets/data.json").then((res) => res.json());
  };
  data = await getData();
  data = data.products ? data.products : [];
  // fake fetch data
  const search = (search, limit = 5) => {
    search = search.toLowerCase();
    return new Promise((resolve, reject) => {
      let result = data
        .filter((x) => x.title.toLowerCase().includes(search))
        .slice(0, limit)
        .map((x) => x.title);
      setTimeout(() => resolve(result), 3000);
    });
  };

  const showResultSearch = async (value) => {
    let result = await search(value);
    result = result.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    showSuggestions(result);
  };

  //selecter
  const searchWrapper = document.querySelector(".search-input");
  const inputBox = searchWrapper.querySelector("input");
  const suggBox = searchWrapper.querySelector(".autocom-box");
  inputBox.onkeyup = async (e) => {
    let loading = [`<li class="loading">loading</li>`];
    showSuggestions(loading);
    searchWrapper.classList.add("active");
    if (e.target.value) {
      showResultSearch(e.target.value);
    } else {
      searchWrapper.classList.remove("active");
    }
  };

  const showSuggestions = (list) => {
    let listData;
    if (!list.length) {
      userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
    } else {
      listData = list.join("");
    }
    suggBox.innerHTML = listData;
  };
});
