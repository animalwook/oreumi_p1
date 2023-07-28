const hamburgerActive = document.querySelector(".hamburger");
const mainContent = document.getElementById("mainContent");
const divLine = document.getElementById("divLine");
const sectionContent = document.getElementById("sectionContent");
let isMarginAdded = false; // 초기에는 false로 설정합니다

hamburgerActive.addEventListener("click", () => {
  isMarginAdded = !isMarginAdded; // 버튼을 클릭할 때마다 상태를 반대로 변경합니다
  if (isMarginAdded) {
    mainContent.classList.add("margin-add");
    // divLine.classList.add("margin-add");
    sectionContent.classList.add("margin-add");
  } else {
    mainContent.classList.remove("margin-add");
    // divLine.classList.remove("margin-add");
    sectionContent.classList.remove("margin-add");
  }
});