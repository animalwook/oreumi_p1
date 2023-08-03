//페이지 로딩 시 함수 실행
getVideoList().then(createVideoItem);

// 해당 페이지의 URL에서 채널 이름 가져오기
const channelName = new URL(window.location.href).searchParams.get("channelName");

// 
async function getVideoList() {
  const response = await fetch("http://oreumi.appspot.com/video/getVideoList");
  return await response.json();
}

async function getVideoInfo(videoId) {
  const response = await fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`);
  return await response.json();
}

async function getChannelInfo() {
  const response = await fetch(`http://oreumi.appspot.com/channel/getChannelInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ video_channel: channelName }),
  });
  return await response.json();
}

// 컨텐츠를 불러오는 메인 함수
async function createVideoItem(videoList) {
  const videoInfoList = await Promise.all(videoList.map(video => getVideoInfo(video.video_id)));
  const filteredVideoList = videoInfoList.filter(videoInfo => videoInfo.video_channel === channelName);
  const channelInfo = await getChannelInfo();

  document.getElementById("A").innerHTML = buildChannelInfo(channelInfo);
  document.getElementById("youtube-player").innerHTML = buildBigVideoItem(filteredVideoList[0]);
  document.getElementById("play-list").innerHTML = buildPlaylistItems(filteredVideoList);
}

function buildChannelInfo(channelInfo) {
  return `
    <div class="channel-cover">
      <img src='${channelInfo.channel_banner}' alt="Channel-Cover" class="channel-cover" id="channel-cover" />
    </div>
    <div class="channel-title">
      <img src='${channelInfo.channel_profile}' alt="User-Avatar" class="channel-avatar" id="channel-avatar" />
      <div class="channel-title-info">
        <span class="channel-title-name">${channelInfo.channel_name}</span>
        <span class="channel-title-subscribers">${channelInfo.subscribers} subscribers</span>
      </div>
      <button class="subscribes-btn" onclick="">SUBSCRIBES</button>
    </div>`;
}

function buildBigVideoItem(masterVideo) {
  return `
    <div class="youtube-player">
      <video controls autoplay muted>
        <source src='${masterVideo.video_link}' type="video/mp4" >
      </video>
    </div>
    <div class="youtube-player-info">
      <span class="youtube-player-title">${masterVideo.video_title}</span>
      <span class="youtube-player-views">${masterVideo.views} . ${masterVideo.upload_date}</span>
      <span class="youtube-player-desc">${masterVideo.video_detail}</span>
    </div>`;
}

function buildPlaylistItems(filteredVideoList) {
  return filteredVideoList.map(video => `
    <div class="channel__small__video__box">
      <div class="video__thumbnail">
        <img src="${video.image_link}" alt="">
      </div>
      <div class="video__info">
        <h4>${video.video_title}</h4>
        <p>${channelName}</p>
        <p>${video.views} . ${video.upload_date}</p>
      </div>
    </div>`).join('');
}