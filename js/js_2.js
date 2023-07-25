// header

// hamburger 버튼으로 navbar 요소의 display 값 변환 (none <----> block)

function hamburgerFunc() {
  const navbarFunc = document.querySelector(".navbar");

  // 현재 요소의 display 상태를 가져옵니다.
  const currentDisplay = window.getComputedStyle(navbarFunc).display;

  // display 속성을 토글합니다.
  if (currentDisplay === "none") {
    navbarFunc.style.display = "block";
  } else {
    navbarFunc.style.display = "none";
  }
}

document.querySelector(".hamburger").onclick = hamburgerFunc;

// notification 창 활성화 (미완성입니다)
//active_notifications.svg 생성 필요

function notificationFunc() {
  const notificationIcon = document.querySelector(".notifications");

  // active 클래스가 이미 존재하면 제거, 존재하지 않으면 추가
  notificationIcon.classList.toggle("active");

  // css
  /*
    기본 아이콘 이미지
    .notifications {
    background-image: url('./img/notifications.svg');
  }
  
   클릭시 바뀔 아이콘 이미지
  .notifications.active {
    background-image: url('./img/active_notifications.svg');
  }
     */
}
