function addComment(event) {
    event.preventDefault();
    var commentInput = event.target.querySelector("input");
    var commentText = commentInput.value;
    var date = new Date().toLocaleString();

    var commentDiv = document.createElement("div");
    commentDiv.className = "commentCard";
    commentDiv.innerHTML = `
<div class="card-body">
  <span>name</span> <span class="card-text"><small class="text-muted">${date}</small></span>
  <p class="card-text">${commentText}</p>      
  <span style="padding:8px"  ><img style="cursor:pointer" src="img/Video/uup.svg" alt=""></span> <span >좋아요</span> <span style="padding:8px"><img style="cursor:pointer" src="img/Video/uup.svg" alt=""></span>싫어요<span style="padding:8px 16px">REPLY</span>

</div>
`;

    var commentsDiv = event.target.parentNode.querySelector(".commentsList");
    commentsDiv.insertBefore(commentDiv, commentsDiv.firstChild);

    commentInput.value = "";
  }