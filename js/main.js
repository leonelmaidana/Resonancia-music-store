const productos = document.querySelector('#productos');
let productosCarrito = [];
const carrito = document.querySelector('#carrito');
const carritoBody = carrito.querySelector('tbody');
const cartToggle = document.querySelector('#cart-toggle');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const cartClose = document.querySelector('#cart-close');

document.addEventListener('DOMContentLoaded', function() {
eventListeners();
});

function eventListeners (){
  productos.addEventListener('click', getDataElements);

  // NUEVO: abrir y cerrar el carrito
  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeCart();
  });
}

// NUEVO
function openCart(){
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('visible');
  cartToggle.setAttribute('aria-expanded', 'true');
}
function closeCart(){
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('visible');
  cartToggle.setAttribute('aria-expanded', 'false');
}

function getDataElements(e){
  if (e.target.classList.contains('botoncarrito')) {
    const elementHtml = e.target.parentElement; 
    selectData(elementHtml)
  }
}

function selectData (producto){
  const prod = {
    img: producto.querySelector('img').src,
    title: producto.querySelector('h2').textContent,
    price: parseFloat(producto.querySelector('h3').textContent.replace('$', '')),
    id: producto.id, 
    quantity: 1
  }
  productosCarrito = [...productosCarrito, prod];
  prodshtml();
  openCart(); 
}
function prodshtml(){
  carritoBody.innerHTML = '';
  productosCarrito.forEach(product => {
const {img, title, price, id, quantity} = product;
const tr = document.createElement('tr');

const tdImg = document.createElement('td');
const prodImg = document.createElement('img');
prodImg.src = img;
prodImg.alt = 'image product';
tdImg.appendChild(prodImg);

const tdTitle = document.createElement('td');
const prodTitle = document.createElement('p');
prodTitle.textContent = title;
tdTitle.appendChild(prodTitle);

const tdPrice = document.createElement('td');
const prodPrice = document.createElement('p');
prodPrice.textContent = `$${price.toFixed(2)}`;
tdPrice.appendChild(prodPrice);

const tdQuantity = document.createElement('td');
const prodQuantity = document.createElement('input');
prodQuantity.type = 'number';
prodQuantity.min = '1';
prodQuantity.value = quantity;
prodQuantity.dataset.id = id;
tdQuantity.appendChild(prodQuantity);

const tdDelete= document.createElement('td');
const prodDelete= document.createElement('button');
prodDelete.type = 'button';
prodDelete.textContent = 'Eliminar';
tdDelete.appendChild(prodDelete);

tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);
carritoBody.appendChild(tr); 
 } )}

 
