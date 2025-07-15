document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const div = document.getElementById('dog-bar');
    fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(data => {
            data.forEach(pup => {
                const span = document.createElement("span");
                span.textContent = pup.name;

                span.addEventListener("click", () => {
                    const dogInfo = document.getElementById("dog-info");
                    dogInfo.innerHTML = "";

                    const img = document.createElement("img");
                    img.src = pup.image;
                    dogInfo.appendChild(img);

                    const name = document.createElement("h2");
                    name.textContent = pup.name;
                    dogInfo.appendChild(name);

                    const bttn = document.createElement("button");
                    
                    bttn.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
                    dogInfo.appendChild(bttn);

                    bttn.addEventListener("click", () => {
                        
                        if (bttn.textContent === "Good Dog!") {
                            bttn.textContent = "Bad Dog!";
                            pup.isGoodDog = false; 
                        } else {
                            bttn.textContent = "Good Dog!";
                            pup.isGoodDog = true;
                        }

                        
                        fetch(`http://localhost:3000/pups/2`, { 
                            method: "PATCH",
                            headers: {
                                "Content-type": "application/json",
                                Accept: "application/json"
                            },
                            body: JSON.stringify({
                                isGoodDog: pup.isGoodDog, 
                            }),
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log("updated", data); 
                            })
                            .catch(error => { 
                                console.error("Error updating pup:", error);
                            });
                    });
                });

                div.appendChild(span);
            });

                const allPups = [
                    { name: "Mr. Bonkers", isGoodDog: true },
                    { name: "Nugget", isGoodDog: false },
                    { name: "Skittles", isGoodDog: true },
                    { name: "Buttercup", isGoodDog: false },
                    { name: "Lucipher", isGoodDog: true },
                    { name: "Snooper Pooper", isGoodDog: true },
                    { name: "Puddles", isGoodDog: true },
                    { name: "Mittens", isGoodDog: true },
                    { name: "Middens", isGoodDog: true },
                    { name: "Fido", isGoodDog: true },
                ];
                const filterBttn = document.getElementById("good-dog-filter")
                filterBttn.addEventListener("click", () => {
                    if(filterBttn.textContent === "Filter good dogs: OFF"){
                        filterBttn.textContent = "Filter good dogs: ON";
                        const goodDogs = allPups.filter(pup => pup.isGoodDog);
                        renderPups(goodDogs);
                    } else {
                        filterBttn.textContent = "Filter good dogs: OFF";
                        renderPups(allPups);
                    }
                });

                function renderPups(pupsToDisplay) {
                  div.innerHTML = "";
                  pupsToDisplay.forEach(pup => {
                    const pupElement = document.createElement("div");
                    pupElement.textContent = pup.name;
                    div.appendChild(pupElement);
                  });
                }
        });
});