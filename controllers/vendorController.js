const Vendor = require("../models/vendor");
const Market = require("../models/market");
const Cart = require('../models/cart');
const Product = require('../models/product');
const db = require("../database/dbconfig");

exports.getVendors = async (req, res, next) => {
  try {
    const allVendors = await Vendor.getVendors();
    // console.log(allVendors);
    res.status(200).json(allVendors);
  } catch (error) {
    res.status(500).json(`No vendors found: ${error}`);
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'vendor id')
    if (id) {
      const vendor = await Vendor.getVendorById(id);
      const vendorCart = await Cart.getCartById(id)
      console.log(vendorCart, 'vendor cart')
      res.status(200).json({vendor, vendorCart});
    } else {
      res.status(400).json({ message: "No Vendor with that firebase Id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Vendor could not be found in the database: ${error}` });
  }
};

exports.getVendorByFirebaseId = async (req, res) => {
  try {
    const { firebase_id } = req.params;
    // console.log(firebase_id, 'vendor id')
    if (firebase_id) {
      const vendor = await Vendor.getVendorByfirebaseId(firebase_id);
      const vendorCart = await Cart.getCartById(firebase_id)
      console.log(vendorCart, 'vendor by id')
      res.status(200).json({...vendor, vendorCart});
      // res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "No Vendor with that firebase Id" });
    }
  } catch (error) {
    console.log(error, 'error from vendor by firebase id')

    res
      .status(500)
      .json({ error: `Vendor could not be found in the database: ${error}` });
  }
};

//testing add vendor
// exports.addVendor = async (req, res) => {
//   try {
//     const id = req.params.id
//     const newVendor = req.body;
//     // console.log(newVendor);
//     if (newVendor) {
//       const vendor = await Vendor.addVendor(newVendor, id);
//       const cart = await Cart.addCart(id)
//       console.log(cart)
//       res.status(200).json({vendor});
//     } else {
//       res.status(400).json({ message: "Must enter all input fields" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: `There was an error while adding vendor to the database: ${error}`,
     
//     });
//     console.log(error, 'add vendor error')
//   }
// };

exports.addVendor = async (req, res) => {
  try {
    const id = req.params.id
    const newVendor = req.body;
    // console.log(newVendor);
    if (newVendor) {
      const vendor = await Vendor.addVendor(newVendor);
      const cart = await Cart.addCart(id)
      console.log(id, 'vendor id')
      console.log(cart)
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "Must enter all input fields" });
    }
  } catch (error) {
    res.status(500).json({
      error: `There was an error while adding vendor to the database: ${error}`,
     
    });
    console.log(error, 'add vendor error')
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.updateVendor(req.params.firebase_id, req.body);
    if (vendor) {
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "Vendor is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating vendor: ${error}` });
  }
};

// exports.deleteVendor = async (req, res) => {
//   try {
//     const { firebase_id } = req.params;
//     if (firebase_id) {
//       let vendor = await Vendor.deleteVendor(firebase_id);
//       res.status(200).json({ message: `${vendor} was deleted` });
//     } else {
//       res.status(400).json({ message: "No vendor by that id" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: `There was an error deleting vendor: ${error}` });
//   }
// };

exports.deleteVendor = async (req, res) => {
  try {
    const { firebase_id } = req.params;
    if (firebase_id) {
      let cart = await Cart.deleteCartByVendorFirebaseId(firebase_id);
      let product = await Product.deleteProductByVendorFirebaseId(firebase_id)
      let vendor = await Vendor.deleteVendor(firebase_id);
      
      res.status(200).json({ message: `${vendor} with cart ${cart} was deleted` });
    } else {
      res.status(400).json({ message: "No vendor by that id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `There was an error deleting vendor: ${error}` });
  }
};

exports.getVendorByMarketFirebaseId = async (req, res) => {
  const { firebaseId } = req.params;
  try {
    const market = await Market.findByMarketFirebaseID(firebaseId);
    const vendors = await Vendor.getVendorByMarketFirebaseId(firebaseId);
    if (market) {
      res.status(200).json({ ...market, vendors });
    } else {
      res.status(404).json({ message: `market or vendor not found.` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.addVendorByFirebaseId = async (req, res) => {
//   try {
//     const firebase_id = req.params.firebaseId;
//     if (!firebase_id) {
//       res.status(404).json({ message: `You are missing firebase Id` });
//     } else {
//       let vendor = req.body;
      
//       // console.log(firebase_id, 'vendor id')
     
//       console.log("Vendor", vendor);
//       const newVendor = await Vendor.addVendorByFirebaseId(
//         vendor,
//         firebase_id
//       );
//       const cart = await Cart.addCart(firebase_id)
//       console.log("Added vendor", newVendor, cart);
//       console.log(cart, 'vendor cart')
//       res.status(200).json({newVendor, cart});
//     }
//   } catch (err) {
//     res.status(500).json(`Can not add vendor: ${err}`);
//     console.log(err);
//   }
// };

exports.addVendorByFirebaseId = async (req, res) => {
  try {
    const firebase_id = req.params.firebaseId;
    let vendor = req.body;
    const newVendor = await Vendor.addVendorByFirebaseId(
      vendor,
      firebase_id
    );
    if (newVendor) {
      const cart = await Cart.addCart(firebase_id)
      console.log("Added vendor", newVendor, cart);
      console.log(cart, 'vendor cart')
      res.status(200).json({...newVendor, cart});
    } 
  } catch (err) {
    res.status(500).json(`Can not add vendor: ${err}`);
    console.log(err);
  }
};
