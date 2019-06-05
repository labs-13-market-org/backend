const db = require("../database/dbconfig");

async function getProductsByVendorId(vendorId) {
    try{
        return db("product").where({vendor_id: vendorId})
    }
    catch(err){
        console.log(err);
    }
}

async function addProductByVendorId(product, vendorId) {
    try{
        let addedProduct = {
            ...product,
            vendors_id: vendorId
        };
        console.log("Our added product :",addedProduct);
        return db("product").insert(addedProduct);
    }
    catch(err){
        console.log(err);
    }
}

async function updateProductByProductId(product, productId) {
    try{
        console.log("Updated product :", product);
        return db("product").where({id: productId}).update(product);
    }
    catch(err){
        console.log(err);
    }
}

async function deleteProductByProductId(productId) {
    try{
        return db("product").where({id: productId}).delete();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getProductsByVendorId,
    addProductByVendorId,
    updateProductByProductId,
    deleteProductByProductId
}