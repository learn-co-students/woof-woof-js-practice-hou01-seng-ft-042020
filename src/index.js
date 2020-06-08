const dogFilter = document.getElementById('good-dog-filter');
dogFilter.addEventListener("click",  e => {
    const dogBar = document.getElementById('dog-bar')
    if (dogFilter.textContent == 'Filter good dogs: ON') {
        dogBar.innerHTML = ""
        e.target.textContent = 'Filter good dogs: OFF'
        const dogsUrl = 'http://localhost:3000/pups'
fetch(dogsUrl)
.then(res => res.json())
.then(json => {
  const showDog = document.querySelector('#dog-bar')
      for (let i=0; i< json.length; i++) {
          const dogPojo = json[i]
            const dogInfo = document.createElement("span") 
            dogInfo.addEventListener('click', function(e) {
                const displayDog = document.querySelector('#dog-info');
                const img = document.createElement('img')
                const h2 = document.createElement('h2')
                const btn = document.createElement('button')
                // an img tag with the pup's image url
                img.src = `${dogPojo.image}`
                // an h2 with the pup's name
                h2.textContent = `${dogPojo.name}`
                // a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.
                if (dogPojo.isGoodDog == true) {
                    btn.textContent = `Good Dog!`
                } 
                else {
                    btn.textContent = `Bad Dog!`
                }

                btn.addEventListener('click', function(e) {
                    if (e.target.textContent == `Bad Dog!`) {

                        fetch(`${dogsUrl}/${dogPojo.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                            isGoodDog: 'true'})
                        })
                        .then(res => res.json())
                        .then(json => {
                            btn.textContent = `Good Dog!`
                       
                        });
                    } 
                    else {
                        fetch(`${dogsUrl}/${dogPojo.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                            isGoodDog: 'false'})
                        })
                        .then(res => res.json())
                        .then(json => {
                            btn.textContent = `Bad Dog!`
                        })
                        };
                    
                })
                displayDog.innerHTML = ''
                displayDog.append(img, h2, btn);
              });


            dogInfo.textContent = `${dogPojo.name}`;
            showDog.append(dogInfo);
      }
});
    }
    else {
        dogBar.innerHTML = ""

        e.target.textContent = 'Filter good dogs: ON'
        const dogsUrl = 'http://localhost:3000/pups'
fetch(dogsUrl)
.then(res => res.json())
.then(json => {
  const showDog = document.querySelector('#dog-bar')
      for (let i=0; i< json.length; i++) {
          const dogPojo = json[i]
          if (dogPojo.isGoodDog == true) {
            const dogInfo = document.createElement("span") 
            dogInfo.addEventListener('click', function(e) {
                const displayDog = document.querySelector('#dog-info');
                const img = document.createElement('img')
                const h2 = document.createElement('h2')
                const btn = document.createElement('button')
                // an img tag with the pup's image url
                img.src = `${dogPojo.image}`
                // an h2 with the pup's name
                h2.textContent = `${dogPojo.name}`
                // a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.
                if (dogPojo.isGoodDog == true) {
                    btn.textContent = `Good Dog!`
                } 
                else {
                    btn.textContent = `Bad Dog!`
                }

                btn.addEventListener('click', function(e) {
                    if (e.target.textContent == `Bad Dog!`) {

                        fetch(`${dogsUrl}/${dogPojo.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                            isGoodDog: 'true'})
                        })
                        .then(res => res.json())
                        .then(json => {
                        if (json.isGoodDog == true) {
                            btn.textContent = `Good Dog!`
                        } 
                        else {
                            btn.textContent = `Bad Dog!`
                        }
                        });
                    } 
                    else {
                        fetch(`${dogsUrl}/${dogPojo.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                            isGoodDog: 'false'})
                        })
                        .then(res => res.json())
                        .then(json => {
                        if (json.isGoodDog == true) {
                            btn.textContent = `Good Dog!`
                        } 
                        else {
                            btn.textContent = `Bad Dog!`
                        }
                        });
                    }
                })
                displayDog.innerHTML = ''
                displayDog.append(img, h2, btn);
              });
            dogInfo.textContent = `${dogPojo.name}`;
            showDog.append(dogInfo);
          }
      }
});
}
});

