
document.getElementById("search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchVideos();
  }
});

async function searchVideos() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  const mainContainer = document.getElementById("mainContainer");
  const videoList = await getVideoList();
  let relatedVideos = [];

  videoList.forEach((video) => {
    const { video_title, video_detail, video_tag } = video;

    if (
      video_title.toLowerCase().includes(searchInput) ||
      video_detail.toLowerCase().includes(searchInput) ||
      video_tag.some((tag) => tag.toLowerCase().includes(searchInput))
    ) {
      relatedVideos.push(video);
    }
  });

  mainContainer.style.display = "none";
  searchResults.innerHTML = "";

  const videoPromises = relatedVideos.map((video) =>
    getVideoInfo(video.video_id)
  );

  Promise.all(videoPromises)
    .then((videoInfos) => {
      videoInfos.forEach((videoInfo) => {
        const infoHTML = generateVideoHTML(videoInfo);
        searchResults.innerHTML += infoHTML;
      });
      searchResults.style.display = "flex";
      searchResults.style.flexWrap = "wrap";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// VideoList Data Pull 함수
async function getVideoList() {
  const response = await fetch("http://oreumi.appspot.com/video/getVideoList");
  const VideoListData = await response.json();
  return VideoListData;
}

// VideoInfo Data Pull 함수
async function getVideoInfo(videoId) {
  const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
  const response = await fetch(apiUrl);
  const VideoInfoData = await response.json();
  return VideoInfoData;
}

async function getChannelInfo(channelName) {
  // 캐시에 채널 정보가 있는지 확인
  if (channelCache[channelName]) {
    return channelCache[channelName];
  }

  let url = `http://oreumi.appspot.com/channel/getChannelInfo`;

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ video_channel: channelName }),
  });

  let channelData = await response.json();

  // 캐시에 채널 정보 저장
  channelCache[channelName] = channelData;

  return channelData;
}


// videoInfo에 맞는 HTML 구조 구성 함수
function generateVideoHTML(videoInfo) {

  let channelInfo = await getChannelInfo(videoInfo.video_channel);
  let channelURL = `./channel.html?channelName=${videoInfo.video_channel}"`;
  let videoURL = `./video.html?id=${videoInfo.video_id}`;

  return `
          <div class="thumbnail">
              <a href="${videoURL}">
              <img src="${videoInfo.image_link}" style="width: 320px; cursor: pointer; border-radius:5px;"/>
              </a>
              <div style="display:flex;">
                  <a href="${channelURL}">
                    <img style="width: 30px; height: 30px; border-radius: 50%; overflow: hidden;"
                              class="feed__item__info__avatar" src='${channelInfo.channel_profile}'>
                   </a>
                  <div style="margin-left: 20px; margin-bottom: 20px;">
                      <a href="${videoURL}">
                      <div style="color:#fff;font-size:16px;">${videoInfo.video_title}</div>
                      </a>
                      <a href="${channelURL}">
                      <div style="color:#aaa;">${videoInfo.video_channel}</div>
                      </a>
                      <span style="color:#aaa;">${videoInfo.views} views</span>
                      <span style="color:#aaa;">· ${videoInfo.upload_date}</span>
                  </div>
              </div>
          </div>
      `;
}

// 화면에 띄워주는 함수
// list 형식으로 하나씩 띄우기 -> promise.all을 이용해서 한번에 띄우기
async function displayHome() {
  const videoList = await getVideoList();
  const infoContainer = document.getElementById("videoList");
  const videoInfoPromises = videoList.map(video => getVideoInfo(video.video_id));
  const allVideoInfo = await Promise.all(videoInfoPromises);

  const allVideoHTML = allVideoInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');

  infoContainer.innerHTML = allVideoHTML;
}

// 오류 시 안내
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await displayHome();
  } catch (error) {
    console.error("Error:", error);
  }
});