const channelToolbarLeftArrow = document.getElementById("channel-toolbar-left-arrow");

channelToolbarLeftArrow.onclick = () => {
  document.getElementsByClassName("channel-toolbar")[0].scrollLeft -= 240;
};

const channelToolbarRightArrow = document.getElementById("channel-toolbar-right-arrow");

channelToolbarRightArrow.onclick = () => {
  document.getElementsByClassName("channel-toolbar")[0].scrollLeft += 240;
};