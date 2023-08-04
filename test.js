// videoInfo에 맞는 HTML 구조 구성 함수
function generateVideoHTML(videoInfo) {
  return `
          <div class="thumbnail">
              <a href="javascript:;" id="goToVideo" onclick="goToVideo('${videoInfo.video_id}')">
              <img src="${videoInfo.image_link}" style="width:320px;cursor:pointer;"/>
              </a>
              <div style="display:flex;">
                  <div style="width:30px; height: 30px; border-radius: 50%; overflow:hidden;">
                  </div>
                  <div style="margin-left: 10px;">
                      <a href="javascript:;" id="goToVideo" onclick="goToVideo('${videoInfo.video_id}')">
                      <p>${videoInfo.video_title}</p>
                      </a>
                      <a href="javascript:;" id="goToChannel" onclick="goToChannel('${videoInfo.video_channel}')">
                      <p>${videoInfo.video_channel}</p>
                      </a>
                      <p>${videoInfo.views} views</p>
                      <p>${videoInfo.upload_date}</p>
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

  // tag 추출
  const tagSet = new Set();
  const topTagContainer = document.getElementById("tag_button");
  videoList.map(video => video.video_tag.map(tag => tagSet.add(tag)));
  const allTagList = Array.from(tagSet);

  // video HTML 및 tag HTML 생성
  const allVideoHTML = allVideoInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');
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

  // video HTML 생성
  const allVideoHTML = allVideoInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');

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

  // video HTML 생성
  const allVideoHTML = allVideoInfo.map(videoInfo => generateVideoHTML(videoInfo)).join('');

  // HTML 적용
  infoContainer.innerHTML = allVideoHTML;
}