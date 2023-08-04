const channelToolbarLeftArrow = document.getElementById("channel-toolbar-left-arrow");

channelToolbarLeftArrow.onclick = () => {
  document.getElementsByClassName("channel-toolbar")[0].scrollLeft -= 240;
};

const channelToolbarRightArrow = document.getElementById("channel-toolbar-right-arrow");

channelToolbarRightArrow.onclick = () => {
  document.getElementsByClassName("channel-toolbar")[0].scrollLeft += 240;
};

// Top-Menu 스크롤 버튼 구현
const slideLeft = document.getElementById("slide-left");

slideLeft.onclick = () => {
document.getElementsByClassName("tag_button")[0].scrollLeft -= 300;
};

const slideRight = document.getElementById("slide-right");

slideRight.onclick = () => {
document.getElementsByClassName("tag_button")[0].scrollLeft += 300;
};
