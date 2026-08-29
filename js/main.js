const productos = document.querySelector('#productos');
let productosCarrito = [];
const carrito = document.querySelector('#carrito');
const carritoBody = carrito.querySelector('tbody');
const cartToggle = document.querySelector('#cart-toggle');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const cartClose = document.querySelector('#cart-close');
const cartTotal = document.querySelector('#cart-total');
const btnCheckout = document.querySelector('#btn-checkout');
const checkoutForm = document.querySelector('#checkout-form');
const paymentForm = document.querySelector('#payment-form');
const btnCancelCheckout = document.querySelector('#btn-cancel-checkout');
const checkoutSuccess = document.querySelector('#checkout-success');
const btnCloseSuccess = document.querySelector('#btn-close-success');

document.addEventListener('DOMContentLoaded', function() {
eventListeners();
});

function eventListeners (){
  productos.addEventListener('click', getDataElements);
 carritoBody.addEventListener('click', eliminarProducto);

  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeCart();
  });
    btnCheckout.addEventListener('click', mostrarCheckout);
  btnCancelCheckout.addEventListener('click', ocultarCheckout);
  paymentForm.addEventListener('submit', procesarPago);
  btnCloseSuccess.addEventListener('click', finalizarCompra);
}



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
function eliminarProducto(e){
  if (e.target.tagName !== 'BUTTON') return;
  const id = e.target.dataset.id;
  productosCarrito = productosCarrito.filter(p => p.id !== id);
  prodshtml();
  }

function actualizarCantidad(e){
  if (e.target.tagName !== 'INPUT') return;
  const id = e.target.dataset.id;
  let cantidad = parseInt(e.target.value, 10);
  if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
  e.target.value = cantidad;

  const producto = productosCarrito.find(p => p.id === id);
  if (producto) producto.quantity = cantidad;

  calcularTotal();
}


function calcularTotal(){
  const total = productosCarrito.reduce((acc, p) => acc + p.price * p.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}


function mostrarCheckout(){
  if (productosCarrito.length === 0){
    alert('Tu carrito está vacío.');
    return;
  }
  checkoutForm.style.display = 'block';
}

function ocultarCheckout(){
  checkoutForm.style.display = 'none';
}

function procesarPago(e){
  e.preventDefault();
  checkoutForm.style.display = 'none';
  checkoutSuccess.style.display = 'block';
}

function finalizarCompra(){
  productosCarrito = [];
  prodshtml();
  paymentForm.reset();
  checkoutSuccess.style.display = 'none';
  closeCart();
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
 calcularTotal();

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
prodDelete.dataset.id = id;
tdDelete.appendChild(prodDelete);


tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);
carritoBody.appendChild(tr); 
 } )}

 
