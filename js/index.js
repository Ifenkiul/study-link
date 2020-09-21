let visible = true;
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
