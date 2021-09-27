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

let selectProductsToDisplay = function(numSelections) {
    let productsToDisplay = [];
    for (let i = 0; i <= numSelections; i++) {
        let selectionIndex = Math.floor(Math.random() * productLineUp.length);
    }

}



