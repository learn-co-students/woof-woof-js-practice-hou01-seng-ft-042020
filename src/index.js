const url = "http://localhost:3000/pups";
fetch(url)
  .then((res) => res.json())
  .then((dogs) => {
    //get all dogs
    for (const dog of dogs) {
      getDogBar(dog);
    }
  });

function getDogBar(dog) {
  const div = document.getElementById("dog-bar");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.innerText = dog.name;

  div.append(span);

  span.addEventListener("click", (e) => {
    const dogInfo = document.getElementById("dog-info");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");

    h2.innerText = dog.name;
    img.src = dog.image;
    if (dog.isGoodDog == true) {
      button.innerText = "Good Dog!";
    } else {
      button.innerText = "Bad Dog!";
    }

    dogInfo.innerHTML = "";
    dogInfo.append(img, h2, button);
  });
  button.addEventListener("click", (e) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog,
      }),
    };
    fetch(`${url}/${dog.id}`, options)
      .then((res) => res.json())
      .then((json) => {
        if (e.target.innerText == "Good Dog!") {
          button.innerText = "Bad Dog!";
        } else {
          button.innerText = "Good Dog!";
        }
      });
  });
}
