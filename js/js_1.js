import { XMLHttpRequest } from "xmlhttprequest";

class VideoInfo {
    constructor(videoId) {
        this.videoId = videoId;
    }

    loadVideoInfo() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data.Response === 'False') {
                        console.log('Fail to fetch video info. Response is \'False\'');
                    } else {
                        console.log('Success to fetch video info.');
                        this.imageLink = data.image_link;
                        this.uploadDate = data.upload_date;
                        this.videoChannel = data.video_channel;
                        this.videoDetail = data.video_detail;
                        this.videoLink = data.video_link;
                        this.videoTag = data.video_tag;
                        this.videoTitle = data.video_title;
                        this.views = data.views;
                    }
                } else {
                    console.log('Fail to fetch video info.');
                }
            }
        };
        xhr.open('GET', 'https://oreumi.appspot.com/video/getVideoInfo?video_id=' + encodeURIComponent(this.videoId), true);
        xhr.send();
    }

    showVideoInfo() {
        console.log(this.imageLink);
        console.log(this.uploadDate);
        console.log(this.videoChannel);
        console.log(this.videoDetail);
        console.log(this.videoLink);
        console.log(this.videoTag);
        console.log(this.videoTitle);
        console.log(this.views);
    }
}

/* Test code */
// let vi = new VideoInfo(0);
// vi.loadVideoInfo();
// setTimeout(() => {
//     vi.showVideoInfo();
// }, "5000");

export default VideoInfo;