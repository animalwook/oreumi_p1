// // header

// // hamburger 버튼으로 navbar 요소의 display 값 변환 (none <----> block)

// function hamburgerMobileFunc() {
//   const navbarFunc = document.querySelector(".navbar");

//   // 현재 요소의 display 상태를 가져옵니다.
//   const currentDisplay = window.getComputedStyle(navbarFunc).display;

//   // display 속성을 토글합니다.
//   if (currentDisplay === "none") {
//     navbarFunc.style.display = "block";
//   } else {
//     navbarFunc.style.display = "none";
//   }
// }

// function hamburgerFunc() {
//   const navbarFunc = document.querySelector(".navbar");
//   const navbarSmallFunc = document.querySelector(".navbar-small");

//   // 현재 요소의 display 상태를 가져옵니다.
//   const currentDisplay = window.getComputedStyle(navbarFunc).display;

//   // display 속성을 토글합니다.
//   if (currentDisplay === "none") {
//     navbarFunc.style.display = "block";
//     navbarSmallFunc.style.display = "none";
//   } else {
//     navbarFunc.style.display = "none";
//     navbarSmallFunc.style.display = "block";
//   }
// }

// document.querySelector(".hamburger").onclick = hamburgerFunc;

// // notification 창 활성화 (미완성입니다)
// //active_notifications.svg 생성 필요

// function notificationFunc() {
//   const notificationIcon = document.querySelector(".notifications");

//   // active 클래스가 이미 존재하면 제거, 존재하지 않으면 추가
//   notificationIcon.classList.toggle("active");

//   // css
//   /*
//     기본 아이콘 이미지
//     .notifications {
//     background-image: url('./img/notifications.svg');
//   }
  
//    클릭시 바뀔 아이콘 이미지
//   .notifications.active {
//     background-image: url('./img/active_notifications.svg');
//   }
//      */
// }


/* ---------------navbar on/off------------- */
window.addEventListener('resize', function() {
  if (window.innerWidth < 900) {
      const navBarA = document.getElementById('navBarA');
      if (navBarA) navBarA.style.display = 'none';

      const navBarB = document.getElementById('navBarB');
      if (navBarB) navBarB.style.display = 'none';
  }
  else {
      const navBarA = document.getElementById('navBarA');
      if (navBarA) navBarA.style.display = '';

      const navBarB = document.getElementById('navBarB');
      if (navBarB) navBarB.style.display = '';
  }
});

document.getElementById('hamburger').addEventListener('click', function() {
  const navBarA = document.getElementById('navBarA');
  const navBarB = document.getElementById('navBarB');

  if(window.innerWidth >= 900){
    if (navBarA.classList.contains('active')) {
      navBarA.classList.remove('active');
      navBarB.classList.add('active');
    } else {
      navBarB.classList.remove('active');
      navBarA.classList.add('active');
    }
  }
});

document.getElementById('navBarHamburger').addEventListener('click', function() {
  const navBarC = document.getElementById('navBarC');
  const overlay = document.getElementById('overlay');

  navBarC.classList.remove('active');
  overlay.classList.remove('visible');
});

document.getElementById('overlay').addEventListener('click', function() {
  const navBarC = document.getElementById('navBarC');
  const overlay = document.getElementById('overlay');

  navBarC.classList.remove('active');
  overlay.classList.remove('visible');
});



function isMiddlePage() {
  return window.location.pathname.includes("/middle-page");
}

function showExpandNavbar() {
  const expandNavbar = document.querySelector(".expand-navbar");
  expandNavbar.style.display = "block";
}

function hideExpandNavbar() {
  const expandNavbar = document.querySelector(".expand-navbar");
  expandNavbar.style.display = "none";
}

// 페이지 사이즈별 구분
function controlScreen() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const screenWidth = window.innerWidth;

  // 모든 페이지에서 햄버거 버튼은 보여짐 // 최소화면에서 햄버거가 계속 사라져서 강제시켰습니다.
  hamburger.style.display = "block";

  if (isMiddlePage() && screenWidth > 768) {
    showExpandNavbar();
    navbar.style.display = "none";
  } else {
    hideExpandNavbar();
    navbar.style.display = "block";
  }
}

window.addEventListener("load", controlScreen);
window.addEventListener("resize", controlScreen);

controlScreen();

// Top-Menu 스크롤 버튼 구현
const slideLeft = document.getElementById("slide-left");

slideLeft.onclick = () => {
  document.getElementsByClassName("button")[0].scrollLeft -= 300;
};

const slideRight = document.getElementById("slide-right");

slideRight.onclick = () => {
  document.getElementsByClassName("button")[0].scrollLeft += 300;
};
