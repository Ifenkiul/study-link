// const save = require('../js/save/save');

let currentData = {};
const linkTemplate = `<input type="checkbox" class="link_element-check">
<a href="{0}" target="_blank">{1}</a>`;
const containerTemplate = `<h3 class="links-category">{0}</h3>
<div class="links-category_list" data-data-id="{0}" hidden>
</div>`;;

//+++++++++++++++++++++++++++++++++++++++++ DYNAMIC LOAD OF PAGE TO MAIN BLOCK
async function loadHtml(link) {
  const response = await fetch(link);
  currentData = await response.json();

  const mainContainer = document.querySelector(".main_container");
  mainContainer.innerHTML = "";
  const currentContainer = document.createElement('div');
  currentContainer.className = "links-list";


  for (let key in currentData) {
    const currentField = currentData[key];
    const newElement = document.createElement('div');
    newElement.innerHTML += containerTemplate.replace('{0}', key);
    newElement.querySelector('.links-category_list').dataset.dataId = key;

    for (let key in currentField) {
      const currentElement = currentField[key];

      const newLink = document.createElement('label');
      newLink.className = 'link_element';
      newLink.innerHTML = linkTemplate.replace('{0}',currentElement['href']).replace('{1}', key);
      newLink.querySelector('.link_element-check').dataset.dataId = `${key}`;

      if (currentElement['checked'] === 'true') {
        newLink.querySelector('.link_element-check').checked = true;
      }

      newElement.querySelector('.links-category_list').appendChild(newLink);
    }
    currentContainer.appendChild(newElement);
  }
  mainContainer.appendChild(currentContainer);

  document.querySelectorAll(".links-category").forEach((element) =>
    element.addEventListener("click", (event) => {
      const elementClicked = event.currentTarget;
      if (elementClicked.nextElementSibling.hidden) {
        elementClicked.nextElementSibling.hidden = false;
      } else {
        elementClicked.nextElementSibling.hidden = true;
      }
    })
  );

  document.querySelectorAll('.links-category_list').forEach((element) => element.addEventListener('click', function(event) {
    const currentTarget = event.currentTarget;
    if (event.target.dataset.dataId && currentTarget.dataset.dataId){
      console.log('target: ' + event.target.dataset.dataId);
      console.log('current target data : ' + currentTarget.dataset.dataId);
      currentData[currentTarget.dataset.dataId][event.target.dataset.dataId]['checked'] = event.target.checked + '';
    }
    
    // currentData[event.target.dataset]
  }))
}

//++++++++++++++++++++++++++++++++++++ SIDEBAR HIDING
document.querySelector(".btn__close--sidebar").addEventListener("click", () => {
  const sideMenu = document.querySelector("sidebar");
  if (sideMenu.hidden) {
    sideMenu.hidden = false;
    document.querySelector(".grid__container").style.gridTemplateAreas = "";
    document.querySelector(".btn__close--sidebar").innerHTML = "&#8678;";
  } else {
    sideMenu.hidden = true;
    document.querySelector(".grid__container").style.gridTemplateAreas =
      '"header header header header""main main main main"';
    document.querySelector(".btn__close--sidebar").innerHTML = "&#8680;";
  }
});

//********************************************************* SIDEBAR MENU ELEMENT CLICK
let previousSideClicked = null;
document.querySelectorAll(".sidebar__menu--item").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (previousSideClicked) {
      previousSideClicked.style.color = "";
    }
    previousSideClicked = event.currentTarget;
    previousSideClicked.style.color = "yellowgreen";
    loadHtml(event.currentTarget.dataset.url);
  });
});

//******************************* 
document.querySelector('.btn_save').addEventListener('click', saveData);
function saveData(){
  console.log(currentData);
  fetch('saveData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(currentData)
})
}
