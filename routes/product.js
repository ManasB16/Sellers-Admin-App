const express = require("express");

const prodController = require("../controllers/product");

const router = express.Router();

router.get("/get-prods", prodController.getProds);

router.post("/add-prod", prodController.postProd);

router.delete("/delete-prod/:prodID", prodController.deleteProd);

module.exports = router;
