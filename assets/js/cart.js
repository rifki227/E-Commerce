const cartButton = document.querySelector(".cart__icon-btn");
const cartCount = document.querySelector(".cart__count");
const clearCart = document.querySelector(".clear__cart");
const productsDom = document.querySelector(".tab__items");
const cartSection = document.getElementById("cart");
const cartDom = document.getElementsByClassName("cart__page")[0];
const cartContent = document.getElementById("cart__content");
const cartSubTotal = document.getElementsByClassName(
  "cart__total-price subTotal__price"
);
const cartShipping = document.getElementsByClassName("shipping__price");
const cartTotal = document.getElementsByClassName("total__price");

// CART FUNCTIONS
let cart = [];

// BUTTONS
let buttonsDom = [];

// GETTING THE PRODUCTS
class Products {
  async getProducts() {
    try {
      let result = await fetch("./../products.json");
      let data = await result.json();
      let products = data.featured;

      products = products.map((item) => {
        const {
          imageOne,
          imageTwo,
          badge,
          badgeClass,
          category,
          title,
          oldPrice,
          newPrice,
          desc,
        } = item.fields;
        const { id } = item.sys;
        return {
          imageOne,
          imageTwo,
          badge,
          badgeClass,
          category,
          title,
          oldPrice,
          newPrice,
          id,
          desc,
        };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//DISPLAY PRODUCTS
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <div class="product__item">
          <div class="product__banner">
            <a href="details.html" class="product__images">
              <img
                src=${product.imageOne}
                alt=""
                class="product__image default"
              />

              <img
                src=${product.imageTwo}
                alt=""
                class="product__image hover"
              />
            </a>

            <div class="product__actions">
              <a href="#" class="action__btn" aria-label="Quick View">
                <i class="fi fi-rs-eye"></i>
              </a>

              <a
                href="#"
                class="action__btn"
                aria-label="Add to WhishList"
              >
                <i class="fi fi-rs-heart"></i>
              </a>

              <a href="#" class="action__btn" aria-label="Compare">
                <i class="fi fi-rs-shuffle"></i>
              </a>
            </div>

            <div class="product__badge ${product.badgeClass}">${product.badge}</div>
          </div>

          <div class="product__content">
            <span class="product__category"> ${product.category} </span>
            <a href="details.html">
              <h3 class="product__title">${product.title}</h3>
            </a>

            <div class="product__rating">
              <i class="fi fi-rs-star"></i>
              <i class="fi fi-rs-star"></i>
              <i class="fi fi-rs-star"></i>
              <i class="fi fi-rs-star"></i>
              <i class="fi fi-rs-star"></i>
            </div>

            <div class="product__price flex">
              <span class="new__price"> $${product.newPrice}</span>
              <span class="old__price"> $${product.oldPrice}</span>
            </div>

            <a
              href="#"
              class="action__btn cart__btn"
              aria-label="Add to Cart"
              data-id= ${product.id}
            >
              <i class="fi fi-rs-shopping-bag-add"></i>
            </a>
          </div>
        </div>
      `;
    });

    productsDom.innerHTML = `
        <div class="tab__item active__tab" content id="featured">
          <div class="products__container grid">
              ${result}
          </div>
        </div>
    `;
  }

  getCartButtons() {
    const cartBtns = [...document.querySelectorAll(".cart__btn")];
    buttonsDom = cartBtns;
    cartBtns.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => {
        item.id === id;
      });
      if (inCart) {
        // button.innerHTML = "In Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          // event.target.innerText = "In Cart";

          event.target.disabled = true;

          // get product from products
          let cartItem = { ...Storage.getProducts(id), amount: 1 };

          // add product to the cart
          cart = [...cart, cartItem];
          // console.log(cart);

          // save cart in local storage
          Storage.saveCart(cart);

          // set cart values
          this.setCartValues(cart);
          // display cart item
          this.addCartItem(cartItem);
          // show the cart
          this.showCart();
        });
      }
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.newPrice * item.amount;
      itemsTotal += item.amount;
    });

    cartSubTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartCount.innerText = itemsTotal;
    // console.log(cartSubTotal, cartCount);
  }

  addCartItem(item) {
    const cartTable = document.createElement("tr");
    cartTable.classList.add("cart_item");
    cartTable.innerHTML = `
          <td>
            <img
              src=${item.imageOne}
              alt=""
              class="table__image"
            />
          </td>

          <td>
            <h3 class="table__title">
              ${item.title}
            </h3>

            <p class="table__description">
              ${item.desc}
            </p>
          </td>

          <td>
            <span class="table__price"> $${item.newPrice} </span>
          </td>

          <td>
            <input type="number"
            value=${item.amount}
            class="quantity"
            data-id=${item.id}/>
          </td>

          <td>
            <span class="table__subtotal">$${++item.newPrice}</span>
          </td>

          <td>
            <i class="fi fi-rs-trash table__trash" data-id=${item.id}></i>
          </td>
    `;

    // console.log(cartTable);
    cartContent.appendChild(
      `
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>
        ${cartTable}
      `
    );
  }
}

// LOCAL STORAGE
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getCartButtons();
    });
});
