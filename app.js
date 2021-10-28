let numberOfRounds = 25;
const numItemsToDisplay = 3;


let createChart = function() {

    const productNames = [];
    const productClicks = [];

    for(let i = 0; i < Product.lineUp.length; i++) {
        productNames.push(Product.lineUp[i].name);
        productClicks.push(Product.lineUp[i].clicks);
    }

    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext('2d');

    const resultsChart = new Chart(ctx,{
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: "Votes",
                data: productClicks,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginsAtZero: true
                },
                x: {

                }
            }
        }
    });
}




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
    Product.lineUp.push(this);
}
Product.lineUp = [];
Product.current = [];
Product.previous = [];

let arrayContains = function(array, product) {
    for (let i = 0; i < array.length; i++) {
        console.log("product " + (i+1) + ": " + array[i].name);
        console.log("product checked: " + product.name);
        if (array[i].name == product.name) {
            console.log("same name");
            return true;
        }
    }
    return false;
}

let generateRandIndex = function() {
    let selectionIndex = Math.floor(Math.random() * Product.lineUp.length);
    return selectionIndex;
}

Product.updateCurrent = function() {
    let uniqueSelection = [];

    //fixes issue of checking 2 rounds back instead of 1
    Product.previous = Product.current;

    for(let i = 0; i < numItemsToDisplay; i++) {
        let productIndex = generateRandIndex();
        //console.log(arrayContains(Product.previous, Product.lineUp[productIndex]));
        while(
            arrayContains(uniqueSelection, Product.lineUp[productIndex]) 
            || arrayContains(Product.previous, Product.lineUp[productIndex])) {
                console.log(Product.lineUp[productIndex]);
                productIndex = generateRandIndex();
        }
        uniqueSelection.push(Product.lineUp[productIndex]);
    }

    Product.current = uniqueSelection;
    console.log("previous: ");
    console.log(Product.previous);
    console.log("current: ");
    console.log(uniqueSelection);
}

let selectProductsToDisplay = function() {
    let productsToDisplay = [];

    //select given number of unique items from the product lineup
    let productLineUpIndex = generateRandIndex();
    for (let i = 0; i <= 3; i++) {
        while (arrayContains(productsToDisplay, Product.lineUp[productLineUpIndex])) {
            productLineUpIndex = generateRandIndex();
        }
        productsToDisplay.push(Product.lineUp[productLineUpIndex]);
        productLineUpIndex = generateRandIndex();
    }

    //increment times shown for each product selected
    for (let i = 0; i < productsToDisplay.length; i++) {
        productsToDisplay[i].timesShown++;
    }

    return productsToDisplay;
}


let renderProducts = function() {
    Product.updateCurrent();
    let productsToDisplay = Product.current;
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
    for(let i = 0; i < Product.lineUp.length; i++) {
        if(event.target.name == Product.lineUp[i].name) {
            Product.lineUp[i].clicks++;
        }
    }
    if (numberOfRounds >= 0) {
        renderProducts();
    } else {
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
    for(let i = 0; i < Product.lineUp.length; i++) {
        let line = document.createElement("p");
        let product = Product.lineUp[i];
        line.innerHTML = `<span>${product.name}</span> had ${product.clicks} vote(s), and was seen ${product.timesShown} times.`;
        results.appendChild(line);
    }
    createChart();
}

renderProducts();





