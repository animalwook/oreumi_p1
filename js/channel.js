function goToChannel(channel) {
  const link = `channel.html?channel=${encodeURIComponent(channel)}`;
  location.href = link;
}

const typoElements = document.querySelectorAll(".typo");
const navIconElements = document.querySelectorAll(".navIcon");

typoElements.forEach((element) => {
  element.addEventListener("click", () => goToChannel(element.textContent));
});

navIconElements.forEach((element) => {
  element.addEventListener("click", () => goToChannel(element.textContent));
});
