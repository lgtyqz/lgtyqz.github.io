// Run before the body is parsed so history navigation never flashes the intro.
const navigation = performance.getEntriesByType("navigation")[0];
const isHistoryNavigation = navigation
  ? navigation.type === "back_forward"
  : performance.navigation?.type === 2;

if (!isHistoryNavigation) {
  document.documentElement.classList.add("play-intro");
}

// A restored back/forward-cache page can otherwise resume an unfinished intro.
window.addEventListener("pagehide", () => {
  document.documentElement.classList.remove("play-intro");
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) document.documentElement.classList.remove("play-intro");
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".case-study-toggle").forEach((button) => {
    const article = document.getElementById(
      button.getAttribute("aria-controls"),
    );
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      button.querySelector("span").textContent = expanded
        ? "HIDE CASE STUDY"
        : "VIEW CASE STUDY";
      article.inert = !expanded;
      article.classList.toggle("hidden", !expanded);
    });
  });
});
