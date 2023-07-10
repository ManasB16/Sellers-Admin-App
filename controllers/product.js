const Product = require("../models/Seller-Product");

exports.getProds = async (req, res, next) => {
  try {
    const prods = await Product.findAll();
    res.status(200).json({prods});
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.postProd = async (req, res, next) => {
  try {
    const price = req.body.price;
    const productname = req.body.productname;
    const newProd = await Product.create({
      price: price,
      productname: productname,
    });
    res.status(201).json({newProd});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteProd = async (req, res, next) => {
  try {
    const pId = req.params.prodID;
    await Product.destroy({ where: { id: pId } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
