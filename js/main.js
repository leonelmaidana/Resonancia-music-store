const productos = document.querySelector('#productos');

document.addEventListener('DOMContentLoaded', function() {
eventListeners();
});

function eventListeners (){
  productos.addEventListener('click', getDataElements);
}

function getDataElements(e){
  if (e.target.classList.contains('botoncarrito'));{
    const elementHtml = (e.target.parentElement.parentElement)
    selectData(elementHtml)
  }
}

function selectData (producto){
  const pepe= {
    img: producto.querySelector ('img').src,
    title: producto.querySelector ('h2').textContent,
    price:parseFloat (producto.querySelector ('h3').textContent.replace('$', ''))
  }
  console.log (pepe)
}