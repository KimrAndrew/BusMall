let numberOfRounds = 25;

let containerDiv = document.getElementById("product-selector");
let leftProduct = document.getElementById("left-product");
let rightProduct = document.getElementById("right-product");
let centerProduct = document.getElementById("center-product");


let productLineUp = [];

let Product = function(name, url) {
    this.name = name;
    this.url = "assets/" + url;
    this.timesShown = 0;
    this.clicks = 0;
    productLineUp.push(this);
}

let arrayContains = function(array, product) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name == product.name) {
            return true;
        }
    }
    return false;
}

let generateRandIndex = function() {
    let selectionIndex = Math.floor(Math.random() * productLineUp.length);
    return selectionIndex;
}

let selectProductsToDisplay = function() {
    let productsToDisplay = [];

    //select given number of unique items from the product lineup
    let productLineUpIndex = generateRandIndex();
    for (let i = 0; i <= 3; i++) {
        while (arrayContains(productsToDisplay, productLineUp[productLineUpIndex])) {
            productLineUpIndex = generateRandIndex();
        }
        productsToDisplay.push(productLineUp[productLineUpIndex]);
        productLineUpIndex = generateRandIndex();
    }

    //increment times shown for each product selected
    for (let i = 0; i < productsToDisplay.length; i++) {
        productsToDisplay[i].timesShown++;
    }

    return productsToDisplay;
}


let renderProducts = function() {
    let productsToDisplay = selectProductsToDisplay();
    let left = productsToDisplay[0];
    let center = productsToDisplay[1];
    let right = productsToDisplay[2];

    leftProduct.src = left.url;
    leftProduct.name = left.name;

    centerProduct.name = center.name;
    centerProduct.src = center.url;

    rightProduct.name = right.name;
    rightProduct.src = right.url;
}

let imgClickHandler = function(event) {
    numberOfRounds--;
    for(let i = 0; i < productLineUp.length; i++) {
        if(event.target.name == productLineUp[i].name) {
            productLineUp[i].clicks++;
        }
    }
    if (numberOfRounds >= 0) {
        renderProducts();
    } else {
        containerDiv.class = "selector-hidden"
        fillResults();
    }
}

let buttonClickHandler = function() {
    numberOfRounds = 0;
    fillResults();
}

leftProduct.addEventListener("click", imgClickHandler);
rightProduct.addEventListener("click", imgClickHandler);
centerProduct.addEventListener("click", imgClickHandler);
document.querySelector("button").addEventListener("click", buttonClickHandler);

let Bag = new Product("bag", "bag.jpeg");
let Banana = new Product("banana", "banana.jpeg");
let Bathroom = new Product("bathroom","bathroom.jpeg");
let Boots = new Product("boots", "boots.jpeg");
let Breakfast = new Product("breakfast", "breakfast.jpeg");
let Bubblegum = new Product("bubblegum","bubblegum.jpeg");
let Chair = new Product("chair", "chair.jpeg");
let Cthulhu = new Product("cthulhu", "cthulhu.jpeg");
let DogDuck = new Product("dog-duck", "dog-duck.jpeg");
let Dragon = new Product("dragon", "dragon.jpeg");
let Pen = new Product("pen","pen.jpeg");
let PetSweep = new Product("pet-sweep", "pet-sweep.jpeg");
let Scissors = new Product("scissors", "scissors.jpeg");
let Shark = new Product("shark", "shark.jpeg");
let Sweep = new Product("sweep", "sweep.png");
let TaunTaun = new Product("tauntaun", "tauntaun.jpeg");
let Unicorn = new Product("unicorn", "unicorn.jpeg");
let WaterCan = new Product("water-can", "water-can.jpeg");
let WineGlass = new Product("wine-glass", "wine-glass.jpeg");

let fillResults = function() {
    let results = document.getElementById("results");
    for(let i = 0; i < productLineUp.length; i++) {
        let line = document.createElement("p");
        let product = productLineUp[i];
        line.innerHTML = `<span>${product.name}</span> had ${product.clicks} vote(s), and was seen ${product.timesShown} times.`;
        results.appendChild(line);
    }

}

renderProducts();




