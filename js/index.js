//+++++++++++++++++++++++++++++++++++++++++ DYNAMIC LOAD OF PAGE TO MAIN BLOCK
async function loadHtml(link) {
  const response = await fetch(link);
  const html = await response.text();

  document.querySelector(".main_container").innerHTML = html;
  document.querySelectorAll(".main__link--item").forEach((element) =>
    element.addEventListener("click", (event) => {
      const elementClicked = event.currentTarget;
      if (elementClicked.nextElementSibling.hidden) {
        elementClicked.nextElementSibling.hidden = false;
      } else {
        elementClicked.nextElementSibling.hidden = true;
      }
    })
  );
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
