let containerDiv = document.getElementById("product-selector");
let leftProduct = document.getElementById("left-product");
let rightProduct = document.getElementById("right-product");
let centerProduct = document.getElementById("center-product");

let productLineUp = [];

let Product = function(name, path) {
    this.name = name;
    this.path = path;
    this.timesShown = 0;
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
        while (arrayContains(productsToDisplay, productLineUpIndex)) {
            productLineUpIndex = generateRandIndex();
        }
        productsToDisplay.push(productLineUp[productLineUpIndex]);
    }

    //increment times shown for each product selected
    for (let i = 0; i < productsToDisplay.length; i++) {
        productsToDisplay[i].timesShown++;
    }

    return productsToDisplay;
}


let renderProducts = function() {
    let productsToDisplay = selectProductsToDisplay();
    leftProduct.src = productsToDisplay[0];
    centerProduct.src = productsToDisplay[1];
    rightProduct.src = productsToDisplay[2];   
}





