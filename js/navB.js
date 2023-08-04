/////////////////////////////////////////////
/* navBarB가 켜져있는 경우 복구*/ 
/*pading 값의 경우 값이 고정 되어 버리니까 css에서 인식 주의*/ 
window.addEventListener('resize', function() {
    const navBarA = document.getElementById('navBarA');
    const navBarB = document.getElementById('navBarB');
    const navBarC = document.getElementById('navBarC');
    const section = document.getElementById('section');
  
   if (window.innerWidth <= 1366) {
    navBarB.classList.remove('active');
    navBarA.classList.add('active');
    section.style.paddingLeft = "80px";
    navBarC.classList.remove('active');
   }
   if (window.innerWidth <= 600) {
    section.style.paddingLeft = "5px";
   }
  });
  
  /////////////////////////////////////////////
  /* 햄버거 온오프 기능 적용됨*/ 
  document.getElementById('hamburger').addEventListener('click', function() {
  const navBarA = document.getElementById('navBarA');
  const navBarB = document.getElementById('navBarB');
  const navBarC = document.getElementById('navBarC');
  const section = document.getElementById('section');
  
  
  /*1366이상에서는 온오프기능으로*/ 
  if(window.innerWidth > 1366 ){
    if (navBarC.classList.contains('active')) {
      navBarC.classList.remove('active');
    }
  
    else if (navBarA.classList.contains('active')) {
      navBarA.classList.remove('active');
      navBarB.classList.add('active');
      section.style.paddingLeft = "240px";
      navBarC.classList.remove('active');
    } 
    else  {
      navBarB.classList.remove('active');
      navBarA.classList.add('active');
      section.style.paddingLeft = "80px";
    }
  }
  /*1366 아닌경우 창 나타나기로*/
  if(window.innerWidth <= 1366){
      if (navBarC.classList.contains('active')) {
        navBarC.classList.remove('active');
    } else{
      navBarC.classList.add('active');
    }
  }
  });