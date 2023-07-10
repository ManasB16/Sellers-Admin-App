const form = document.querySelector("#myform");
const price = document.querySelector("#price");
const productname = document.querySelector("#productname");
const Productslist = document.querySelector("#products");
let total = document.getElementById("total");

var totalprice = 0;

document.addEventListener("submit", onsubmit);

async function onsubmit(e) {
  try {
    e.preventDefault();

    let prod = {
      price: price.value,
      productname: productname.value,
    };

    let product = await axios.post("http://localhost:3000/add-prod", prod);
    totalprice += parseInt(price.value);
    total.innerHTML = `<h2>Total value worth of products: Rs ${totalprice} </h2>`;
    showNewProdOnScreen(product.data.newProd);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let products = await axios.get("http://localhost:3000/get-prods");
    products.data.prods.forEach((ele) => {
      totalprice += ele.price;
      showNewProdOnScreen(ele);
    });
    total.innerHTML = `<h2>Total value worth of products: Rs ${totalprice} </h2>`;
  } catch (err) {
    console.log(err);
  }
});

function showNewProdOnScreen(product) {
  document.getElementById("price").value = "";
  document.getElementById("productname").value = "";

  const parentNode = document.getElementById("products");
  const childElement = `<li id=${product.id}> ${product.price} - ${product.productname}
                        <button onclick=deleteProd('${product.id}','${product.price}')> Delete </button>               
                        </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childElement;
}

async function deleteProd(prodID, prodPrice) {
  try {
    let product = await axios.delete(
      `http://localhost:3000/delete-prod/${prodID}`
    );
    totalprice -= prodPrice;
    total.innerHTML = `<h2>Total value worth of products: Rs${totalprice}</h2>`;
    removeProdFromScreen(prodID);
  } catch (err) {
    console.log(err);
  }
}

function removeProdFromScreen(prodID) {
  const parentNode = document.getElementById("products");
  const childnodetobeDeleted = document.getElementById(prodID);
  if (childnodetobeDeleted) {
    parentNode.removeChild(childnodetobeDeleted);
  }
}
