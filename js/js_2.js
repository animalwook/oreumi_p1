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
  const section = document.getElementById('section');

  if(window.innerWidth >= 900){
    if (navBarA.classList.contains('active')) {
      navBarA.classList.remove('active');
      navBarB.classList.add('active');
      section.style.paddingLeft = "240px";
    } else {
      navBarB.classList.remove('active');
      navBarA.classList.add('active');
      section.style.paddingLeft = "80px";
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
