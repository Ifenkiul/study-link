let visible = true;
//--------------------------------------SIDEBAR SLIDING
document.querySelector(".nav__sidebar").addEventListener("click", () => {
  if (visible) {
    document.querySelector(".grid__container").style.gridTemplateAreas =
      '"header header header header""main main main main"';
    document.querySelector(".side").style.display = "none";
    document.querySelector(".nav__sidebar").innerHTML = "&#9658;";
    visible = false;
  } else {
    document.querySelector(".grid__container").style.gridTemplateAreas =
      '"header header header header""side main main main"';
    document.querySelector(".side").style.display = "unset";
    document.querySelector(".nav__sidebar").innerHTML = "&#9668;";
    visible = true;
  }
});

//----------------------------------LOADING HTML TO MAIN BLOCK
async function loadHtml(link) {
  const response = await fetch(link);
  const html = await response.text();
  document.querySelector(".main").innerHTML =
    "<span class='nav__sidebar'>&#9668;</span>" + html;

  document.querySelector(".nav__sidebar").addEventListener("click", () => {
    if (visible) {
      document.querySelector(".grid__container").style.gridTemplateAreas =
        '"header header header header""main main main main"';
      document.querySelector(".side").style.display = "none";
      document.querySelector(".nav__sidebar").innerHTML = "&#9658;";
      visible = false;
    } else {
      document.querySelector(".grid__container").style.gridTemplateAreas =
        '"header header header header""side main main main"';
      document.querySelector(".side").style.display = "unset";
      document.querySelector(".nav__sidebar").innerHTML = "&#9668;";
      visible = true;
    }
  });

  document.querySelectorAll(".main__link--item").forEach((element) =>
    element.addEventListener("click", (event) => {
      if (event.currentTarget.dataset.clicked === "false") {
        event.currentTarget.dataset.clicked = "true";
        event.currentTarget.nextElementSibling.style = "display:unset";
      } else {
        event.currentTarget.dataset.clicked = "false";
        event.currentTarget.nextElementSibling.style = "display:none";
      }
    })
  );
}
document.querySelectorAll(".sidebar__menu--item").forEach((element) => {
  element.addEventListener("click", (event) => {
    loadHtml(event.currentTarget.dataset.url);
  });
});

//------------------------------------NAVIGATION THROUGH LINKS
