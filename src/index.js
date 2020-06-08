
const url = 'http://localhost:3000/pups'
const divDogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

fetch (url)
  .then (res => res.json())
  .then (dogsJson => {
    for(const dog of dogsJson){
      addDogSpan(dog);
    }
  });

function addDogSpan(dog) {
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  divDogBar.append(dogSpan)

  dogSpan.addEventListener('click', ()=> {
    addDogToDOM(dog);
  })
};

function addDogToDOM(dog) {
    dogInfo.innerHTML = ''
    const image = document.createElement('img')
    const name = document.createElement('h2')
    const isGoodDogBtn = document.createElement('button')
    //condition for dog button default innerText
    const isGoodDogBtnText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

    image.src = dog.image
    name.innerText = dog.name
    isGoodDogBtn.innerText = isGoodDogBtnText

    dogInfo.append(image, name, isGoodDogBtn)
    isGoodDogBtn.addEventListener ('click', ()=> {
      isGoodDogTextReverse(dog);
    })
};

//reverse isGoodDog Text and patch
function isGoodDogTextReverse(dog) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify ({
      isGoodDog: !dog.isGoodDog
    })
  }

  fetch (`${url}/${dog.id}`, options)
    .then(res => res.json())
    .then(dog => {
      return addDogToDOM(dog)
    })

};

