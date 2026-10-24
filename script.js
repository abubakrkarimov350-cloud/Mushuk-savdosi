
const cats = [
    {
        id: 1,
        name: "Mosh",
        breed: "British Shorthair",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Luna",
        breed: "Persian",
        price: 1800000,
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Simba",
        breed: "Maine Coon",
        price: 3500000,
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Momiq",
        breed: "Scottish Fold",
        price: 2200000,
        image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Oppoq",
        breed: "Turk Angorasi",
        price: 2000000,
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Tom",
        breed: "Oddiy uy mushugi",
        price: 500000,
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=700&q=80"
    }
];

let cart = [];

const catList = document.getElementById("cat-list");
const search = document.getElementById("search");

function formatPrice(price) {
    return price.toLocaleString("uz-UZ") + " so'm";
}

// Mushuklarni ekranga chiqarish
function renderCats(list) {
    if (list.length === 0) {
        catList.innerHTML =
            '<p class="empty">😿 Bunday mushuk topilmadi.</p>';
        return;
    }

    catList.innerHTML = list.map(cat => `
        <article class="cat-card">
            <img src="${cat.image}" alt="${cat.name}" loading="lazy">

            <div class="cat-info">
                <h3>${cat.name}</h3>
                <p class="breed">🐾 ${cat.breed}</p>
                <p class="price">${formatPrice(cat.price)}</p>

                <button class="add-btn" onclick="addToCart(${cat.id})">
                    🛒 Savatchaga qo'shish
                </button>
            </div>
        </article>
    `).join("");
}

// Savatchaga mushuk qo'shish
function addToCart(id) {
    const cat = cats.find(item => item.id === id);

    if (!cat) return;

    cart.push(cat);
    updateCart();
    openCart();
}

// Savatchani yangilash
function updateCart() {
    document.getElementById("cart-count").textContent = cart.length;

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="cart-empty">😿 Savatchangiz bo‘sh</p>';
    } else {
        cartItems.innerHTML = cart.map((cat, index) => `
            <div class="cart-item">
                <img src="${cat.image}" alt="${cat.name}">

                <div class="cart-item-info">
                    <h4>${cat.name}</h4>
                    <p>${formatPrice(cat.price)}</p>
                </div>

                <button class="remove-btn"
                    onclick="removeFromCart(${index})">
                    🗑️
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, cat) => sum + cat.price, 0);
    cartTotal.textContent = formatPrice(total);
}

// Savatchani ochish
function showCart() {
    openCart();
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
    updateCart();
}

// Savatchani yopish
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Mushukni savatchadan o'chirish
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Buyurtma tugmasi
function checkout() {
    if (cart.length === 0) {
        alert("Avval savatchaga mushuk qo'shing! 🐱");
        return;
    }

    const total = cart.reduce((sum, cat) => sum + cat.price, 0);

    alert(
        "Buyurtmangiz tayyor! 🐾\n" +
        "Mushuklar soni: " + cart.length + "\n" +
        "Jami: " + formatPrice(total) + "\n\n" +
        "Haqiqiy buyurtma yuborish uchun aloqa tizimi kerak."
    );
}

// Qidiruv
search.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    const filtered = cats.filter(cat =>
        cat.name.toLowerCase().includes(query) ||
        cat.breed.toLowerCase().includes(query)
    );

    renderCats(filtered);
});

// Dastlabki ishga tushirish
renderCats(cats);
updateCart();
