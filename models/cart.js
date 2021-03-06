const db = require("../database/dbconfig");

getCart = () => {
  return db("cart").select("cart.id", "cart.firebase_id");
};

getCartById = id => {
  return db("cart")
    .where({ firebase_id: id })
    .first();
};

getVendorCart = id => {
  return db("cart")
    .innerJoin("vendor", "cart.firebase_id", "vendor.firebase_id")
    .select("vendor.contact_fullname")
    .where({ firebase_id: id });
};

async function addCart(firebaseId) {
  try {
    let addedCart = {
      firebase_id: firebaseId
    };
    const [id] = await db("cart")
      .insert(addedCart)
      .returning("id");
    return getCartById(id);
  } catch (err) {
    console.log(err);
  }
}

addStallToCart = (stalls_id, cart_id) => {
  let addedItem = {
    stalls_id,
    cart_id
  };

  console.log("added item", addedItem);
  return db("cart_item").insert(addedItem);
};

removeStallsFromCartByCartId = (cart_id) => {
  return db("cart_item")
  .where({ cart_id: cart_id })
  .delete();
}

removeStallFromCart = (stalls_id, cart_id) => {
  let deletedItem = {
    stalls_id,
    cart_id
  };
  console.log("deleted item", deletedItem);
  return db("cart_item")
    .where({ stalls_id: stalls_id, cart_id: cart_id })
    .delete();
};

//   getCartItems = (id) => {
//       return db('cart_item')
//         .innerJoin('stall', 'cart_item.stalls_id', 'stall.id')
//         .innerJoin('cart', 'cart_item.cart_id', 'cart.firebase_id')
//         .innerJoin('market', 'stall.market_id',  'market.stripeAccountId')
//         .select('cart_item.id as cart_item _id', 'stalls_id', 'stall.price', 'stall.size', 'stall.market_id', 'market.market_name', 'cart.firebase_id as user_firebase_id', 'cart.id')
//         .where({'cart_id': id})
//   }

getCartItems = id => {
  return db("cart_item")
    .innerJoin("stall", "cart_item.stalls_id", "stall.id")
    .innerJoin("market", "stall.market_id", "market.firebase_id")
    .innerJoin("cart", "cart_item.cart_id", "cart.firebase_id")
    .select([
      "cart_item.id",
      "stalls_id",
      "stall.price",
      "stall.size",
      "stall.market_id",
      "cart.firebase_id",
      "cart.id",
      "market.stripeAccountId",
      "market.market_name",
    ])
    .where({ cart_id: id });
};

function deleteCartByVendorFirebaseId(id) {
  return db("cart")
    .where({ 'firebase_id': id })
    .del();
}

module.exports = {
  getCartById,
  addCart,
  getCart,
  getVendorCart,
  addStallToCart,
  getCartItems,
  removeStallFromCart,
  deleteCartByVendorFirebaseId,
  removeStallsFromCartByCartId
};
