// {
//   "id": 1,
//   "name": "Mr. Bonkers",
//   "isGoodDog": true,
//   "image": "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_1.jpg"
// },

// <div id="filter-div">
//  <button id="good-dog-filter">Filter good dogs: OFF</button>
// </div>
// <div id="dog-bar">

// </div>
// <div id="dog-summary-container">
//  <h1>DOGGO:</h1>
//  <div id="dog-info">

//  </div>
// </div>

const url = 'http://localhost:3000/pups'
const divDogs = document.querySelector('#dog-bar')
// const divDog = addDog();

fetch(url)
.then(res => res.json())
.then(dogsJson => {
  dogsJson.forEach(dog => {
    const spanDog = document.createElement('span');
    spanDog.innerText = dog.name
    divDogs.append(spanDog)
    spanDog.addEventListener('click', e => {
      e.preventDefault();
      addDog(dog)
    })
    // addDog(dog)
  })
})



function addDog(dog){
  const divInfo = document.querySelector('#dog-info');
  divInfo.innerHTML = ''
  const imageUrl = document.createElement('img');
  const nameH2 = document.createElement('h2');
  const isGoodDogBtn = document.createElement('button');

  imageUrl.src = dog.image;
  nameH2.innerText = dog.name;
  //establish default dog button text
  dog.isGoodDog ? isGoodDogBtn.innerText = 'Good Dog!' : isGoodDogBtn.innerText = 'Bad Dog!';

  divInfo.append(nameH2, isGoodDogBtn, imageUrl)

  isGoodDogBtn.addEventListener('click', e => {
    e.preventDefault()
    // if (isGoodDogBtn.innerText === 'Good Dog!'){
    //   isGoodDogBtn.innerText = 'Bad Dog!'
    // } else {
    //   isGoodDogBtn.innerText = 'Good Dog!'
    // }
    
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog

      })
    } 

    fetch(`${url}/${dog.id}`, options)
    .then(res => res.json())
    .then(updatedStatus => {
      dog.isGoodDog ? isGoodDogBtn.innerText = 'Good Dog!' : isGoodDogBtn.innerText = 'Bad Dog!';
      addDog(updatedStatus)
    })
    // .catch(error)
  })
}
