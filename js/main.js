const productos = document.querySelector('#productos');
let productosCarrito = [];

document.addEventListener('DOMContentLoaded', function() {
eventListeners();
});

function eventListeners (){
  productos.addEventListener('click', getDataElements);
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
}
function prodshtml(){
  productosCarrito.forEach(product => {
console.log(product)
  });
  }