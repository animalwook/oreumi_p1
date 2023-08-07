document.getElementById("search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchVideos();
  }
});

let channelinfoProfile;


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

let channelCache=[];
// 채널 정보
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


// 오류 시 안내
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await displayHome();
  } catch (error) {
    console.error("Error:", error);
  }
});


function getChannelInfoProfile(info) {
  channelinfoProfile = info;
  return channelinfoProfile;
}


function generateVideoHTML(videoInfo) {

let channelURL = `./channel.html?channelName=${videoInfo.video_channel}`;
let videoURL = `./video.html?id=${videoInfo.video_id}`;

return `
        <div class="thumbnail">
            <a href="${videoURL}">
            <img src="${videoInfo.image_link}" style="width: 320px; cursor: pointer; border-radius:5px;"/>
            </a>
            <div class="thumnail_card" style="display:flex;">
                <div class = "thumnail_profile">
                  <a href="${channelURL}">
                  <img src="${videoInfo.channel_profile}"/>
                </div>
                <div style="margin-left: 20px; margin-bottom: 20px;">
                    <a href="${videoURL}">
                    <div style="color:#fff;font-size:16px;">${videoInfo.video_title}</div>
                    </a>
                    <a href="${channelURL}">
                    <div style="color:#aaa;">${videoInfo.video_channel}</div>
                    </a>
                    <span style="color:#aaa;">조회수 ${convertViews(videoInfo.views)} </span>
                    <span style="color:#aaa;">· ${convertDate(videoInfo.upload_date)}</span>
                </div>
            </div>
        </div>
    `;
}

// tagList에 맞는 HTML 구조 구성 함수
function generateTagHTML(tagName) {
return `
        <button class="tag_button_buttonItem" id="" onclick="displayTaggedVideo('${tagName}')">${tagName}</button>
    `;
}

// 화면에 띄워주는 함수
// list 형식으로 하나씩 띄우기 -> promise.all을 이용해서 한번에 띄우기
async function displayHome() {
// video 정보 추출
const videoList = await getVideoList();
const infoContainer = document.getElementById("videoList");
const videoInfoPromises = videoList.map(video => getVideoInfo(video.video_id));
const allVideoInfo = await Promise.all(videoInfoPromises);

const channelList = videoList.map(video => getChannelInfo(video.video_channel));
const allChannelInfo = await Promise.all(channelList);

//비디오정보와 채널정보 합하기
const allInfo = [];

 for (let i = 0 ; i < allVideoInfo.length;i++){
   allInfo.push(Object.assign(allVideoInfo[i], allChannelInfo[i]));
 }


// tag 추출
const tagSet = new Set();
const topTagContainer = document.getElementById("tag_button");
videoList.map(video => video.video_tag.map(tag => tagSet.add(tag)));
const allTagList = Array.from(tagSet);

// video HTML 및 tag HTML 생성
const allVideoHTML = allInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');
const tagAllHTML = `<button class="tag_button_buttonAll" id="" onclick="displayAllVideo()">All</button>`
const allTagHTML = tagAllHTML + allTagList.map(tag => generateTagHTML(tag)).join('');

// HTML 적용
infoContainer.innerHTML = allVideoHTML;
topTagContainer.innerHTML = allTagHTML;
}

async function displayAllVideo() {
// video 정보 추출
const videoList = await getVideoList();
const infoContainer = document.getElementById("videoList");
const videoInfoPromises = videoList.map(video => getVideoInfo(video.video_id));
const allVideoInfo = await Promise.all(videoInfoPromises);

const channelList = videoList.map(video => getChannelInfo(video.video_channel));
const allChannelInfo = await Promise.all(channelList);

//비디오정보와 채널정보 합하기
const allInfo = [];

 for (let i = 0 ; i < allVideoInfo.length;i++){
   allInfo.push(Object.assign(allVideoInfo[i], allChannelInfo[i]));
 }

// video HTML 생성
const allVideoHTML = allInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');

// HTML 적용
infoContainer.innerHTML = allVideoHTML;
}

async function displayTaggedVideo(tag) {
// video 목록 가져오기
const videoList = await getVideoList();
const infoContainer = document.getElementById("videoList");

// tag에 맞는 video 정보 추출
const tagFilterPromises = videoList.filter(video => video.video_tag.includes(tag))
const tagVideoList = await Promise.all(tagFilterPromises);
const videoInfoPromises = tagVideoList.map(video => getVideoInfo(video.video_id));
const allVideoInfo = await Promise.all(videoInfoPromises);

const channelList = videoList.map(video => getChannelInfo(video.video_channel));
const allChannelInfo = await Promise.all(channelList);

//비디오정보와 채널정보 합하기
const allInfo = [];

 for (let i = 0 ; i < allVideoInfo.length;i++){
   allInfo.push(Object.assign(allVideoInfo[i], allChannelInfo[i]));
 }

// video HTML 생성
const allVideoHTML = allInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');

// HTML 적용
infoContainer.innerHTML = allVideoHTML;
}



// 단위 변환 함수
function convertViews(views) {
  if (views >= 10000000) {
    const converted = (views / 10000000).toFixed(1);
    return converted.endsWith(".0")
      ? converted.slice(0, -2) + "천만"
      : converted + "천만";
  } else if (views >= 1000000) {
    const converted = (views / 1000000).toFixed(1);
    return converted.endsWith(".0")
      ? converted.slice(0, -2) + "백만"
      : converted + "백만";
  } else if (views >= 10000) {
    const converted = (views / 10000).toFixed(1);
    return converted.endsWith(".0")
      ? converted.slice(0, -2) + "만"
      : converted + "만";
  } else if (views >= 1000) {
    const converted = (views / 1000).toFixed(1);
    return converted.endsWith(".0")
      ? converted.slice(0, -2) + "천"
      : converted + "천";
  } else {
    return views.toString();
  }
}

// 날짜 변환 함수
function convertDate(dateString) {
  // 파라미터로 받은 날짜를 Date 객체로 변환
  const targetDate = new Date(dateString);

  // 현재 날짜를 구하기 위해 현재 시간 기준으로 Date 객체 생성
  const currentDate = new Date();

  // 두 날짜의 시간 차이 계산 (밀리초 기준)
  const timeDifference = currentDate - targetDate;

  // 1년의 밀리초 수
  const oneYearInMilliseconds = 31536000000;

  if (timeDifference < 86400000) {
    // 하루(24시간) 기준의 밀리초 수
    return "오늘";
  } else if (timeDifference < 172800000) {
    // 이틀(48시간) 기준의 밀리초 수 (어제)
    return "어제";
  } else if (timeDifference < 604800000) {
    // 일주일(7일) 기준의 밀리초 수
    return "1주 전";
  } else if (timeDifference < oneYearInMilliseconds) {
    // 한 달 전 계산
    const currentMonth = currentDate.getMonth();
    const targetMonth = targetDate.getMonth();

    if (currentMonth === targetMonth) {
      return "1개월 전";
    } else {
      return `${currentMonth - targetMonth}개월 전`;
    }
  } else {
    return `${Math.floor(timeDifference / oneYearInMilliseconds)}년 전`;
  }
}
