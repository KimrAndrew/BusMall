let containerDiv = document.getElementById("product-selector");
let leftProduct = document.getElementById("left-product");
let rightProduct = document.getElementById("right-product");
let centerProduct = document.getElementById("center-product");


let productLineUp = [];

let Product = function(name, url) {
    this.name = name;
    this.url = "assets/" + url;
    this.timesShown = 0;
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
    console.log(productsToDisplay[0].name, productsToDisplay[1].name, productsToDisplay[2].name);
    leftProduct.src = productsToDisplay[0].url;
    centerProduct.src = productsToDisplay[1].url;
    rightProduct.src = productsToDisplay[2].url;
    console.log(rightProduct.src);
    console.log(typeof leftProduct.src);
    console.log("done");  
}

let Bag = new Product("bag", "bag.jpeg");
let Banana = new Product("banana", "banana.jpeg");
let Bathroom = new Product("bathroom","bathroom.jpeg");
let Boots = new Product("boots", "boots.jpeg");
let Breakfast = new Product("breakfast", "breakfast.jpeg");
let Bubblegum = new Product("bubblegum","bubblegum.jpeg");
let Chair = new Product("chair", "bubblegum.jpeg");
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

leftProduct.src = Bag.url;
renderProducts();




