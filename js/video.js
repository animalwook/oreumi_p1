function YouTubePlayer(videoId) {
    let playerContainer = document.querySelector(".youtubeVideoPlayer");
    // 이미지를 동영상 iframe으로 대체
    let iframe = document.createElement("iframe");
    iframe.width = "424";
    iframe.height = "238";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
  
    // 기존 이미지 제거
    while (playerContainer.firstChild) {
      playerContainer.removeChild(playerContainer.firstChild);
    }
  
    // 동영상 iframe 추가
    playerContainer.appendChild(iframe);
  }
  
  const videoId = "3iM_06QeZi8";
  YouTubePlayer(videoId);