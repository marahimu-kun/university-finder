let api = "http://universities.hipolabs.com/search?country=";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  let country = document.querySelector("#input").value;
  let state = document.querySelector("#state").value;
  let colleges = await getColleges(country);
  console.log(colleges);

  let colArr = await getColleges(country, state);
  show(colArr);
});

function show(colArr) {
  let list = document.querySelector("#list");
  list.innerText = "";
  for (col of colArr) {
    let li = document.createElement("li");
    li.innerText = col.name;
    list.appendChild(li);
  }
}

async function getColleges(country, state) {
  try {
    let response = await axios.get(api + country);
    let universities = response.data;

    // If state is provided, filter by state
    if (state) {
      return universities.filter(
        (uni) =>
          uni["state-province"] &&
          uni["state-province"].toLowerCase().includes(state.toLowerCase())
      );
    }

    // Otherwise return all universities for the country
    return universities;
  } catch (error) {
    console.log(error);
    return [];
  }
}
