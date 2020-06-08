const dogUrl = "http://localhost:3000/pups";
const doggos = document.getElementById("dog-bar");
const filterBtn = document.getElementById("good-dog-filter");


function toggleFilterDogs() {
    doggos.innerHTML = ""
    if (filterBtn.innerText.includes("OFF")) {
        filterBtn.innerText = "Filter good dogs: ON"
        getDogs().then(dogs => dogs.filter(dog => dog.isGoodDog).forEach(renderName))
    } else {
        filterBtn.innerText = "Filter good dogs: OFF"
        getDogs().then(dogs => dogs.forEach(renderName))
    }
}

function updateBoard(target) {
    doggos.innerHTML = ""
    if (filterBtn.innerText.includes("ON")) {
        getDogs().then(dogs => dogs.filter(dog => dog.isGoodDog).forEach(renderName))
    } else {
        getDogs().then(dogs => dogs.forEach(renderName))
    }
}

function getDogs () {
    return fetch(dogUrl)
        .then(res => res.json())
}

function main() {
    filterBtn.addEventListener("click", toggleFilterDogs)
    getDogs().then(dogs => dogs.forEach(renderName))
}   

function renderName(dog) {
    const nameSpan = document.createElement("span")
    nameSpan.innerText = dog.name
    doggos.append(nameSpan)
    nameSpan.dataset.id = dog.id

    nameSpan.addEventListener('click', onSpanClick)
}

function onSpanClick(e) {
    getSingleDog(e.target.dataset.id)
    .then(doggoInfo)
}

function getSingleDog(id){
    return fetch(dogUrl + `/${id}`)
      .then(res => res.json()) 
}

function doggoInfo(dog) {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerText = ""
    const dogImg = document.createElement("img");
    const dogH2 =  document.createElement("h2");
    const dogBtn = document.createElement("button");
    dogImg.src = dog.image
    dogH2.innerText = dog.name
    dogBtn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogBtn.dataset.id = dog.id
    dogBtn.addEventListener("click", onGoodDogClick)
    dogInfo.append(dogImg, dogH2, dogBtn)
}

function onGoodDogClick(e) {
    let isGood;
    if (e.target.innerText.includes("Good")) {
        e.target.innerText = "Bad Dog!"
        isGood = false;
    } else {
        e.target.innerText = "Good Dog!"
        isGood = true;
    }
    toggleGoodDog(e.target.dataset.id, isGood).then(updateBoard)
}

function toggleGoodDog(id, newValue) {
    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newValue
        })
    }
    return fetch(dogUrl + `/${id}`, options)
        .then(res => res.json())
}

main()
