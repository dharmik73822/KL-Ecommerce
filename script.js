/* =========================================================
   KLECOMMERCE - ROLE BASED E-COMMERCE WEBSITE
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

let products = [
    {
        id: 1,
        name: "Men's Shirt",
        price: 999,
        category: "Fashion",
        image: "shirt.jpg"
    },

    {
        id: 2,
        name: "Rice Bag",
        price: 1200,
        category: "Groceries",
        image: "rice.jpg"
    },

    {
        id: 3,
        name: "Smart Phone",
        price: 15000,
        category: "Mobiles",
        image: "mobile.jpg"
    },

    {
        id: 4,
        name: "Washing Machine",
        price: 22000,
        category: "Appliances",
        image: "washing.jpg"
    }
];


/* =========================================================
   CART
========================================================= */

let cart = [];


/* =========================================================
   ORDERS
========================================================= */

let orders = [];


/* =========================================================
   SELECT ELEMENTS
========================================================= */

const roleScreen =
    document.getElementById("roleScreen");

const userWebsite =
    document.getElementById("userWebsite");

const adminWebsite =
    document.getElementById("adminWebsite");


const userRoleBtn =
    document.getElementById("userRoleBtn");

const adminRoleBtn =
    document.getElementById("adminRoleBtn");


const logoutUserBtn =
    document.getElementById("logoutUserBtn");

const logoutAdminBtn =
    document.getElementById("logoutAdminBtn");


const productContainer =
    document.getElementById("productContainer");

const noProducts =
    document.getElementById("noProducts");


const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


const categoryButtons =
    document.querySelectorAll(".category-btn");


const cartBtn =
    document.getElementById("cartBtn");

const accountBtn =
    document.getElementById("accountBtn");


const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


const paymentMethod =
    document.getElementById("paymentMethod");

const qrPayment =
    document.getElementById("qrPayment");

const cardPayment =
    document.getElementById("cardPayment");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

const paymentDoneBtn =
    document.getElementById("paymentDoneBtn");


const checkoutForm =
    document.getElementById("checkoutForm");


const loginModal =
    document.getElementById("loginModal");

const loginForm =
    document.getElementById("loginForm");

const loginTitle =
    document.getElementById("loginTitle");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");


const accountModal =
    document.getElementById("accountModal");

const cartModal =
    document.getElementById("cartModal");

const checkoutModal =
    document.getElementById("checkoutModal");


/* ADMIN ELEMENTS */

const productForm =
    document.getElementById("productForm");

const editProductId =
    document.getElementById("editProductId");

const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productCategory =
    document.getElementById("productCategory");

const productImage =
    document.getElementById("productImage");

const saveProductBtn =
    document.getElementById("saveProductBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const adminProductList =
    document.getElementById("adminProductList");

const adminOrderList =
    document.getElementById("adminOrderList");

const totalProducts =
    document.getElementById("totalProducts");

const totalOrders =
    document.getElementById("totalOrders");

const totalSales =
    document.getElementById("totalSales");


/* =========================================================
   CURRENT ROLE
========================================================= */

let currentRole = null;

let loginRole = null;


/* =========================================================
   ROLE SELECTION
========================================================= */

userRoleBtn.addEventListener(
    "click",
    function () {

        loginRole = "user";

        loginTitle.textContent =
            "User Login";

        openModal(loginModal);

    }
);


adminRoleBtn.addEventListener(
    "click",
    function () {

        loginRole = "admin";

        loginTitle.textContent =
            "Admin Login";

        openModal(loginModal);

    }
);


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value.trim();


        if (loginRole === "user") {

            if (
                username === "" ||
                password === ""
            ) {

                alert(
                    "Please enter username and password."
                );

                return;
            }


            currentRole = "user";

            closeModal(loginModal);

            roleScreen.classList.add(
                "hidden"
            );

            userWebsite.classList.remove(
                "hidden"
            );

            adminWebsite.classList.add(
                "hidden"
            );


            loginForm.reset();

            renderProducts();

            updateCart();

            alert(
                "Welcome to KLECommerce!"
            );

        }


        else if (loginRole === "admin") {

            /*
                DEMO ADMIN LOGIN

                Username: admin
                Password: admin123
            */

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                currentRole = "admin";

                closeModal(loginModal);

                roleScreen.classList.add(
                    "hidden"
                );

                userWebsite.classList.add(
                    "hidden"
                );

                adminWebsite.classList.remove(
                    "hidden"
                );


                loginForm.reset();

                renderAdminDashboard();

                alert(
                    "Admin login successful!"
                );

            }

            else {

                alert(
                    "Invalid Admin Login!\n\nUsername: admin\nPassword: admin123"
                );

            }

        }

    }
);


/* =========================================================
   LOGOUT USER
========================================================= */

logoutUserBtn.addEventListener(
    "click",
    function () {

        currentRole = null;

        userWebsite.classList.add(
            "hidden"
        );

        roleScreen.classList.remove(
            "hidden"
        );

        cart = [];

        updateCart();

    }
);


/* =========================================================
   LOGOUT ADMIN
========================================================= */

logoutAdminBtn.addEventListener(
    "click",
    function () {

        currentRole = null;

        adminWebsite.classList.add(
            "hidden"
        );

        roleScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(
    selectedCategory = "All",
    searchText = ""
) {

    productContainer.innerHTML = "";


    const filteredProducts =
        products.filter(
            function (product) {

                const categoryMatch =
                    selectedCategory === "All" ||
                    product.category === selectedCategory;


                const searchMatch =
                    product.name
                        .toLowerCase()
                        .includes(
                            searchText.toLowerCase()
                        ) ||

                    product.category
                        .toLowerCase()
                        .includes(
                            searchText.toLowerCase()
                        );


                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    if (filteredProducts.length === 0) {

        noProducts.classList.remove(
            "hidden"
        );

        return;

    }


    noProducts.classList.add(
        "hidden"
    );


    filteredProducts.forEach(
        function (product) {

            const card =
                document.createElement("div");

            card.className =
                "product-card";


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="this.src='logo.png'"
                >

                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            `;


            productContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        const activeCategory =
            document.querySelector(
                ".category-btn.active"
            );


        const category =
            activeCategory
                ? activeCategory.dataset.category
                : "All";


        renderProducts(
            category,
            searchInput.value
        );

    }
);


searchBtn.addEventListener(
    "click",
    function () {

        searchInput.focus();

    }
);


/* =========================================================
   CATEGORY FILTER
========================================================= */

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderProducts(
                    button.dataset.category,
                    searchInput.value
                );

            }
        );

    }
);


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    const count =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    cartCount.textContent =
        count;


    cartTotal.textContent =
        "₹" +
        total.toLocaleString(
            "en-IN"
        );


    renderCart();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>Your cart is empty</h3>

                <p>
                    Add some products to continue shopping.
                </p>

            </div>

        `;

        checkoutBtn.disabled = true;

        checkoutBtn.style.opacity = "0.5";

        return;

    }


    checkoutBtn.disabled = false;

    checkoutBtn.style.opacity = "1";


    cart.forEach(
        function (item) {

            const cartRow =
                document.createElement("div");

            cartRow.className =
                "cart-item";


            cartRow.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.src='logo.png'"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                </div>


                <div class="cart-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(
                cartRow
            );

        }
    );

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            function (cartItem) {

                return cartItem.id === productId;

            }
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (cartItem) {

                    return cartItem.id !== productId;

                }
            );

    }


    updateCart();

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    updateCart();

}


/* =========================================================
   CART BUTTON
========================================================= */

cartBtn.addEventListener(
    "click",
    function () {

        renderCart();

        openModal(cartModal);

    }
);


/* =========================================================
   ACCOUNT BUTTON
========================================================= */

accountBtn.addEventListener(
    "click",
    function () {

        openModal(accountModal);

    }
);


/* =========================================================
   CHECKOUT
========================================================= */

checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        closeModal(cartModal);

        openModal(checkoutModal);

    }
);


/* =========================================================
   PAYMENT METHOD
========================================================= */

paymentMethod.addEventListener(
    "change",
    function () {

        const method =
            paymentMethod.value;


        qrPayment.classList.add(
            "hidden"
        );


        cardPayment.classList.add(
            "hidden"
        );


        placeOrderBtn.classList.remove(
            "hidden"
        );


        if (method === "upi") {

            qrPayment.classList.remove(
                "hidden"
            );

            placeOrderBtn.classList.add(
                "hidden"
            );

        }


        if (method === "card") {

            cardPayment.classList.remove(
                "hidden"
            );

        }

    }
);


/* =========================================================
   CHECKOUT FORM
========================================================= */

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const method =
            paymentMethod.value;


        if (!method) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        if (method === "upi") {

            return;

        }


        placeOrder();

    }
);


/* =========================================================
   UPI PAYMENT DONE
========================================================= */

paymentDoneBtn.addEventListener(
    "click",
    function () {

        placeOrder();

    }
);


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const customerAddress =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const method =
        paymentMethod.value;


    if (
        customerName === "" ||
        customerAddress === ""
    ) {

        alert(
            "Please enter your name and delivery address."
        );

        return;

    }


    let paymentName = "";


    if (method === "cod") {

        paymentName =
            "Cash on Delivery";

    }

    else if (method === "card") {

        paymentName =
            "Card";

    }

    else if (method === "upi") {

        paymentName =
            "UPI / QR";

    }


    const orderTotal =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    const order = {

        id:
            "ORD" +
            Date.now(),

        customer:
            customerName,

        address:
            customerAddress,

        payment:
            paymentName,

        total:
            orderTotal,

        items:
            [...cart],

        status:
            "Order Placed",

        date:
            new Date().toLocaleString()

    };


    orders.push(order);


    alert(
        "Order placed successfully!"
    );


    cart = [];

    updateCart();


    checkoutForm.reset();


    qrPayment.classList.add(
        "hidden"
    );


    cardPayment.classList.add(
        "hidden"
    );


    placeOrderBtn.classList.remove(
        "hidden"
    );


    closeModal(checkoutModal);

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdminDashboard() {

    renderAdminProducts();

    renderAdminOrders();

    updateAdminStats();

}


/* =========================================================
   ADMIN STATISTICS
========================================================= */

function updateAdminStats() {

    totalProducts.textContent =
        products.length;


    totalOrders.textContent =
        orders.length;


    const sales =
        orders.reduce(
            function (sum, order) {

                return sum + order.total;

            },
            0
        );


    totalSales.textContent =
        "₹" +
        sales.toLocaleString(
            "en-IN"
        );

}


/* =========================================================
   ADMIN PRODUCT LIST
========================================================= */

function renderAdminProducts() {

    adminProductList.innerHTML = "";


    if (products.length === 0) {

        adminProductList.innerHTML = `

            <p>
                No products available.
            </p>

        `;

        return;

    }


    products.forEach(
        function (product) {

            const item =
                document.createElement("div");

            item.className =
                "admin-product-item";


            item.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src='logo.png'"
                >


                <div class="admin-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Category:
                        ${product.category}
                    </p>

                    <p class="admin-product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                </div>


                <div class="admin-actions">

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            adminProductList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   ADD / EDIT PRODUCT
========================================================= */

productForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            productName.value.trim();

        const price =
            Number(productPrice.value);

        const category =
            productCategory.value;

        const image =
            productImage.value.trim();

        const existingId =
            editProductId.value;


        if (
            name === "" ||
            price <= 0 ||
            category === "" ||
            image === ""
        ) {

            alert(
                "Please fill all product details."
            );

            return;

        }


        /* EDIT PRODUCT */

        if (existingId) {

            const product =
                products.find(
                    function (item) {

                        return (
                            item.id ===
                            Number(existingId)
                        );

                    }
                );


            if (product) {

                product.name =
                    name;

                product.price =
                    price;

                product.category =
                    category;

                product.image =
                    image;

            }


            alert(
                "Product updated successfully!"
            );

        }


        /* ADD PRODUCT */

        else {

            const newProduct = {

                id:
                    Date.now(),

                name:
                    name,

                price:
                    price,

                category:
                    category,

                image:
                    image

            };


            products.push(
                newProduct
            );


            alert(
                "Product added successfully!"
            );

        }


        resetProductForm();


        renderAdminDashboard();

        renderProducts();

    }
);


/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(productId) {

    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {
        return;
    }


    editProductId.value =
        product.id;


    productName.value =
        product.name;


    productPrice.value =
        product.price;


    productCategory.value =
        product.category;


    productImage.value =
        product.image;


    saveProductBtn.textContent =
        "Update Product";


    cancelEditBtn.classList.remove(
        "hidden"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   CANCEL EDIT
========================================================= */

cancelEditBtn.addEventListener(
    "click",
    function () {

        resetProductForm();

    }
);


/* =========================================================
   RESET PRODUCT FORM
========================================================= */

function resetProductForm() {

    productForm.reset();

    editProductId.value = "";

    saveProductBtn.textContent =
        "Add Product";

    cancelEditBtn.classList.add(
        "hidden"
    );

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(productId) {

    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {
        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    products =
        products.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    /* Remove deleted product from cart */

    cart =
        cart.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    updateCart();


    renderAdminDashboard();

    renderProducts();


    alert(
        "Product deleted successfully!"
    );

}


/* =========================================================
   ADMIN ORDER LIST
========================================================= */

function renderAdminOrders() {

    adminOrderList.innerHTML = "";


    if (orders.length === 0) {

        adminOrderList.innerHTML = `

            <div class="empty-cart">

                <h3>
                    No orders yet
                </h3>

                <p>
                    Customer orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    orders
        .slice()
        .reverse()
        .forEach(
            function (order) {

                const orderCard =
                    document.createElement("div");

                orderCard.className =
                    "order-card";


                const itemsText =
                    order.items
                        .map(
                            function (item) {

                                return (
                                    item.name +
                                    " × " +
                                    item.quantity
                                );

                            }
                        )
                        .join(", ");


                orderCard.innerHTML = `

                    <div class="order-header">

                        <span class="order-id">
                            ${order.id}
                        </span>

                        <span class="order-status">
                            ${order.status}
                        </span>

                    </div>


                    <p>
                        <strong>
                            Customer:
                        </strong>
                        ${order.customer}
                    </p>


                    <p>
                        <strong>
                            Address:
                        </strong>
                        ${order.address}
                    </p>


                    <p>
                        <strong>
                            Payment:
                        </strong>
                        ${order.payment}
                    </p>


                    <div class="order-items">

                        <p>
                            <strong>
                                Products:
                            </strong>
                            ${itemsText}
                        </p>

                        <p class="order-total">
                            Total:
                            ₹${order.total.toLocaleString("en-IN")}
                        </p>

                        <p>
                            <strong>
                                Date:
                            </strong>
                            ${order.date}
                        </p>

                    </div>

                `;


                adminOrderList.appendChild(
                    orderCard
                );

            }
        );

}


/* =========================================================
   MODAL FUNCTIONS
========================================================= */

function openModal(modal) {

    modal.classList.remove(
        "hidden"
    );

}


function closeModal(modal) {

    modal.classList.add(
        "hidden"
    );

}


/* =========================================================
   CLOSE BUTTONS
========================================================= */

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modalId =
                        button.dataset.close;


                    const modal =
                        document.getElementById(
                            modalId
                        );


                    closeModal(modal);

                }
            );

        }
    );


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

document
    .querySelectorAll(".modal")
    .forEach(
        function (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === modal
                    ) {

                        closeModal(
                            modal
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   INITIAL DISPLAY
========================================================= */

roleScreen.classList.remove(
    "hidden"
);

userWebsite.classList.add(
    "hidden"
);

adminWebsite.classList.add(
    "hidden"
);