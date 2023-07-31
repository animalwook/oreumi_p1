document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const channel = urlParams.get("channel"); // 채널 이름이 URL 매개변수로 전달

  if (channel) {
    await postChannelInfo(channel);
  } else {
    console.error("채널 이름이 제공되지 않았습니다.");
  }
});
