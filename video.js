const API_KEY = "AIzaSyDijmeEgM8AIsrm8BlNzMSLySkfJ4antY0";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

let dataToGet;

const videoPlayer = document.querySelector(".video-player");

const channelName = document.querySelector(".channel-name");

const videoDescText = document.querySelector(".video-desc-text");

const suggetions = document.querySelector(".suggetions");

const searchButton = document.querySelector(".search-button");

const searchInput = document.querySelector(".search-actual-input");

const singleComment = document.querySelector(".single-comments");

let showMoreBefore;
let showMoreAfter;

function getDataFromStorage() {
  dataToGet = JSON.parse(localStorage.getItem("videoToWatch"));

  displayVideo(dataToGet);
}

searchButton.addEventListener("click", () => {
  localStorage.setItem("searchFromVideo", searchInput.value);
});

function goToHome() {
  localStorage.setItem("searchFromVideo", "");
  window.location.href = "/YoutubeClone/";
}

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    localStorage.setItem("searchFromVideo", searchInput.value);
    window.location.href = "/YoutubeClone/";
  }
});

async function displayVideo(data) {
  const youtubePlayer = document.createElement("div");
  youtubePlayer.className = "youtube-player";
  console.log(data);

  showMoreBefore = data.snippet.description;

  const videoData = await videoDetailS(data.id.videoId);

  // console.log(videoData);

  const commentCount = videoData.items[0].statistics.commentCount;

  const formattedDate = convertTimestamp(videoData);

  const likeCount = converViews(videoData.items[0].statistics.likeCount);

  document.title = data.snippet.title;

  youtubePlayer.innerHTML = `
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/${data.id.videoId}"
    frameborder="0"
    allowfullscreen
  ></iframe>
  <div class="video-info">
    <h3>${data.snippet.title}</h3>
    <div class="info">
      <div class="info-text">
        <h3>${videoData.items[0].statistics.viewCount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views  ${formattedDate}</h3>
      </div>
      <div class="info-button">
        <div class="like-button indi-button">
          <div class="button-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <path
                d="M15.77 7H11.54L13.06 2.06C13.38 1.03 12.54 0 11.38 0C10.8 0 10.24 0.24 9.86 0.65L4 7H0V17H4H5H14.43C15.49 17 16.41 16.33 16.62 15.39L17.96 9.39C18.23 8.15 17.18 7 15.77 7ZM4 16H1V8H4V16ZM16.98 9.17L15.64 15.17C15.54 15.65 15.03 16 14.43 16H5V7.39L10.6 1.33C10.79 1.12 11.08 1 11.38 1C11.64 1 11.88 1.11 12.01 1.3C12.08 1.4 12.16 1.56 12.1 1.77L10.58 6.71L10.18 8H11.53H15.76C16.17 8 16.56 8.17 16.79 8.46C16.92 8.61 17.05 8.86 16.98 9.17Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="button-text">
            <h3>${likeCount}</h3>
          </div>
        </div>
        <div class="dislike-button indi-button">
          <div class="button-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <path
                d="M14.0001 0H13.0001H3.57007C2.50007 0 1.59007 0.67 1.38007 1.61L0.040068 7.61C-0.229932 8.85 0.820068 10 2.23007 10H6.46007L4.94007 14.94C4.62007 15.97 5.46007 17 6.62007 17C7.20007 17 7.76007 16.76 8.14007 16.35L14.0001 10H18.0001V0H14.0001ZM7.40007 15.67C7.21007 15.88 6.92007 16 6.62007 16C6.36007 16 6.12007 15.89 5.99007 15.7C5.92007 15.6 5.84007 15.44 5.90007 15.23L7.42007 10.29L7.82007 9H6.46007H2.23007C1.82007 9 1.43007 8.83 1.20007 8.54C1.08007 8.39 0.950068 8.14 1.02007 7.82L2.36007 1.82C2.46007 1.35 2.97007 1 3.57007 1H13.0001V9.61L7.40007 15.67ZM17.0001 9H14.0001V1H17.0001V9Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div class="share-button indi-button">
          <div class="button-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M13 2.63L18.66 9L13 15.37V12V11H12C8.04 11 4.86 12 2.25 14.09C4.09 10.02 7.36 7.69 12.14 6.99L13 6.86V6V2.63ZM12 0V6C4.22 7.13 1.11 12.33 0 18C2.78 14.03 6.44 12 12 12V18L20 9L12 0Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="button-text">
            <h3>SHARE</h3>
          </div>
        </div>
        <div class="save-button indi-button">
          <div class="button-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
            >
              <path
                d="M20 6H16V10H14V6H10V4H14V0H16V4H20V6ZM12 0H0V1H12V0ZM0 5H8V4H0V5ZM0 9H8V8H0V9Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="button-text">
            <h3>SAVE</h3>
          </div>
        </div>
        <div class="threedots-button indi-button">
          <div class="button-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="4"
              viewBox="0 0 16 4"
              fill="none"
            >
              <path
                d="M3.5 2C3.5 2.83 2.83 3.5 2 3.5C1.17 3.5 0.5 2.83 0.5 2C0.5 1.17 1.17 0.5 2 0.5C2.83 0.5 3.5 1.17 3.5 2ZM8 0.5C7.17 0.5 6.5 1.17 6.5 2C6.5 2.83 7.17 3.5 8 3.5C8.83 3.5 9.5 2.83 9.5 2C9.5 1.17 8.83 0.5 8 0.5ZM14 0.5C13.17 0.5 12.5 1.17 12.5 2C12.5 2.83 13.17 3.5 14 3.5C14.83 3.5 15.5 2.83 15.5 2C15.5 1.17 14.83 0.5 14 0.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

  videoPlayer.appendChild(youtubePlayer);

  const channelInfo = await channelDetails(data.snippet.channelId);

  createChannelThumbnail(channelInfo);

  const description = document.createElement("h3");
  description.className = "desc-text";

  description.innerText = showMoreBefore;

  videoDescText.appendChild(description);

  setCommentsCount(commentCount);

  // console.log(videoData.items[0].snippet.hasOwnProperty("tags"));

  setSecondaryVideos(
    videoData.items[0].snippet.hasOwnProperty("tags")
      ? videoData.items[0].snippet.hasOwnProperty("tags")
      : videoData.items[0].snippet.title
  );

  setTopLevel(
    videoData.items[0].snippet.hasOwnProperty("tags")
      ? videoData.items[0].snippet.tags
      : ""
  );

  setComments(data.id.videoId);
}

function setTopLevel(data) {
  // console.log(data, "setTopLevel");
  if (data === "") {
    const searchFilter = document.createElement("div");
    searchFilter.className = "search-filter";
    searchFilter.innerHTML = `<h3>All</h3>`;
    document.querySelector(".top-level").appendChild(searchFilter);
  } else {
    data.map((item) => {
      const searchFilter = document.createElement("div");
      searchFilter.className = "search-filter";
      searchFilter.innerHTML = `<h3>${item}</h3>`;
      document.querySelector(".top-level").appendChild(searchFilter);
    });
  }
}

async function videoDetailS(videoId) {
  try {
    let url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    // const dataToSend = JSON.stringify(data);
    // console.log(data, "videosDetails");

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function channelDetails(channel_id) {
  try {
    let url = `${BASE_URL}/channels?key=${API_KEY}&part=snippet,statistics,contentOwnerDetails&id=${channel_id}`;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function converViews(data) {
  if (data / 1000 >= 1 && data / 1000 <= 999) {
    return (data / 1000).toFixed(1) + "K";
  }
  if (data / 1000000 >= 1 && data / 1000000 <= 999) {
    return (data / 1000000).toFixed(1) + "M";
  }
  if (data / 1000000000 >= 1 && data / 1000000000 <= 999) {
    return (data / 1000000000).toFixed(1) + "B";
  } else {
    return data;
  }
}

function openShowMore() {
  const descText = document.querySelector(".desc-text");
  if (descText.innerText.includes("...")) {
    descText.innerText = showMoreAfter;
  } else {
    descText.innerText = showMoreBefore;
  }
}

function setCommentsCount(data) {
  const comments = document.createElement("h3");
  comments.innerText = converViews(data) + " Comments";
  // console.log(data, "hi");

  //   //   console.log(document.querySelector("count"));
  document.querySelector(".count").appendChild(comments);
}

function createChannelThumbnail(channelInfo) {
  const channelThumbnail = channelInfo.items[0].snippet.thumbnails.high.url;

  const channelImg = document.createElement("div");

  // console.log(channelImg);

  showMoreAfter = channelInfo.items[0].snippet.description;

  channelImg.className = "channel-img";

  channelImg.innerHTML = `<img
    src=${channelThumbnail};
    alt=""
  />`;

  channelName.appendChild(channelImg);

  //   console.log(channelName);

  const channelTitle = document.createElement("div");
  channelTitle.className = "channel-title";

  channelTitle.innerHTML = `<h3>${channelInfo.items[0].snippet.title}</h3>
    <h4>${converViews(
      channelInfo.items[0].statistics.subscriberCount
    )} subscribers</h4>`;

  channelName.appendChild(channelTitle);
}

function convertTimestamp(videoData) {
  const timestampStr = videoData.items[0].snippet.publishedAt;
  const timestampObj = new Date(timestampStr);

  const options = { month: "short", day: "numeric", year: "numeric" };

  return timestampObj.toLocaleDateString("en-US", options);
}

function displayDate(data) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const start = new Date(data);
  const end = new Date();

  const timeDifference = Math.abs(end - start);

  const years = Math.floor(timeDifference / (365.25 * millisecondsPerDay));
  const months = Math.floor(
    (timeDifference % (365.25 * millisecondsPerDay)) /
      (30.44 * millisecondsPerDay)
  );
  const weeks = Math.floor(timeDifference / (7 * millisecondsPerDay));
  const days = Math.floor(timeDifference / millisecondsPerDay);
  const hours = Math.floor(
    (timeDifference % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (timeDifference % millisecondsPerHour) / millisecondsPerMinute
  );

  if (years !== 0) {
    return years + " years ago";
  }

  if (months !== 0) {
    return months + " months ago";
  }

  if (weeks !== 0) {
    return weeks + " weeks ago";
  }

  if (days !== 0) {
    return days + " days ago";
  }

  if (hours !== 0) {
    return hours + " hours ago";
  }

  if (minutes !== 0) {
    return minutes + " minutes ago";
  }
}

async function searchVideos(searchQuery) {
  try {
    let url = `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&part=snippet&maxResults=30`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data.items);
    return data;

    // displayVideo(data.items);
  } catch (err) {
    console.log(err);
  }
}

function convertVideoDuration(data) {
  let dateTime = "";
  data = data.substring(2);

  if (data.includes("H")) {
    dateTime += data.substring(0, data.indexOf("H")) + ":";
    data = data.substring(data.indexOf("H") + 1);
    // console.log(dateTime)
  }
  if (data.includes("M")) {
    dateTime += data.substring(0, data.indexOf("M")) + ":";
    data = data.substring(data.indexOf("M") + 1);
    // console.log(dateTime)
  } else {
    dateTime += "00:";
  }
  if (data.includes("S")) {
    dateTime += data.substring(0, data.indexOf("S"));
    data = data.substring(data.indexOf("S") + 1);
    // console.log(dateTime)
  } else {
    dateTime += "00";
  }

  return dateTime;
}

async function setSecondaryVideos(data) {
  const getSuggetions = await searchVideos(data);

  getSuggetions.items.map(async (item) => {
    const videosDetails = await videoDetailS(item.id.videoId);
    console.log(videosDetails.items[0]);

    const videoDuration = convertVideoDuration(
      videosDetails.items[0].contentDetails.duration
    );

    const suggetionVideo = document.createElement("div");

    suggetionVideo.className = "suggetion-video";
    // const ii = item;

    suggetionVideo.addEventListener("click", async () => {
      // console.log(searchResult);
      // console.log(item);
      const jsonString = JSON.stringify(item);
      localStorage.setItem("videoToWatch", jsonString);
      window.location.href = './video.html';
    });

    suggetionVideo.innerHTML = `<div class="suggetion-video">
    <div class="thumbnail">
      <div class="thumbnail-img">
        <img
          src=${item.snippet.thumbnails.high.url}
          alt=""
        />
      </div>
      <div class="thumbnail-time"><h3>${videoDuration}</h3></div>
    </div>
    <div class="video-text">
      <div class="video-title">
        <h3>${item.snippet.title}</h3>
      </div>
      <div class="video-channel-name"><h3>${
        item.snippet.channelTitle
      }</h3></div>
      <div class="video-views"><h3>${converViews(
        videosDetails.items[0].statistics.viewCount
      )} views · ${displayDate(item.snippet.publishedAt)}</h3></div>
    </div>
  </div>`;

    // console.log("hi");
    suggetions.appendChild(suggetionVideo);
  });
}

async function setComments(data) {
  const commentsData = await getComments(data);
  console.log(commentsData, "singleComment");
  commentsData.items.map((item) => {
    // console.log(item);

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.innerHTML = `
    <div class="comment">
            <div class="profile-pic">
              <img
                src=${
                  item.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt=""
                width="100%"
                style="border-radius: 50%"
              />
            </div>
            <div class="comment-details">
              <div class="user-name">
                <h3>${
                  item.snippet.topLevelComment.snippet.authorDisplayName
                }</h3>
                <h4>${displayDate(
                  item.snippet.topLevelComment.snippet.publishedAt
                )}</h4>
              </div>
              <div class="actual-comment">
                <h3>${item.snippet.topLevelComment.snippet.textDisplay}</h3>
              </div>
              <div class="likes-and-reply">
                <div class="like-comment">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M10.5133 5.33335H7.69333L8.70667 2.04002C8.92 1.35335 8.36 0.666687 7.58667 0.666687C7.2 0.666687 6.82667 0.826687 6.57333 1.10002L2.66667 5.33335H0V12H2.66667H3.33333H9.62C10.3267 12 10.94 11.5534 11.08 10.9267L11.9733 6.92669C12.1533 6.10002 11.4533 5.33335 10.5133 5.33335ZM2.66667 11.3334H0.666667V6.00002H2.66667V11.3334ZM11.32 6.78002L10.4267 10.78C10.36 11.1 10.02 11.3334 9.62 11.3334H3.33333V5.59335L7.06667 1.55335C7.19333 1.41335 7.38667 1.33335 7.58667 1.33335C7.76 1.33335 7.92 1.40669 8.00667 1.53335C8.05333 1.60002 8.10667 1.70669 8.06667 1.84669L7.05333 5.14002L6.78667 6.00002H7.68667H10.5067C10.78 6.00002 11.04 6.11335 11.1933 6.30669C11.28 6.40669 11.3667 6.57335 11.32 6.78002Z"
                      fill="white"
                    />
                  </svg>
                  <h3>${converViews(
                    item.snippet.topLevelComment.snippet.likeCount
                  )}</h3>
                </div>
                <div class="dislike-comment">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M9.33354 0.666687H8.66687H2.38021C1.66687 0.666687 1.06021 1.11335 0.920208 1.74002L0.0268747 5.74002C-0.153125 6.56669 0.546875 7.33335 1.48687 7.33335H4.30688L3.29354 10.6267C3.08021 11.3134 3.64021 12 4.41354 12C4.80021 12 5.17354 11.84 5.42688 11.5667L9.33354 7.33335H12.0002V0.666687H9.33354ZM4.93354 11.1134C4.80687 11.2534 4.61354 11.3334 4.41354 11.3334C4.24021 11.3334 4.08021 11.26 3.99354 11.1334C3.94687 11.0667 3.89354 10.96 3.93354 10.82L4.94688 7.52669L5.21354 6.66669H4.30688H1.48687C1.21354 6.66669 0.953541 6.55335 0.800208 6.36002C0.720208 6.26002 0.633541 6.09335 0.680208 5.88002L1.57354 1.88002C1.64021 1.56669 1.98021 1.33335 2.38021 1.33335H8.66687V7.07335L4.93354 11.1134ZM11.3335 6.66669H9.33354V1.33335H11.3335V6.66669Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="reply-comment">
                  <h3>REPLY</h3>
                </div>
              </div>
            </div>
          </div>`;

    singleComment.appendChild(comment);
  });
}

async function getComments(videoId) {
  console.log(videoId);
  try {
    let url = `${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet,replies&order=relevance&videoId=${videoId}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

function clickThumbnail(hh) {
  console.log(hh);
}
getDataFromStorage();
console.log("hihhi");

//dark-mode
document.documentElement.style.setProperty("--theme-color", "#0f0f0f");

document.documentElement.style.setProperty("--theme-color-text", "#fff");

document.documentElement.style.setProperty("--theme-color-light", "#292929");

document.documentElement.style.setProperty("--theme-color-light-text", "#aaa");

document.documentElement.style.setProperty("--theme-color-hover", "#292929");

document.documentElement.style.setProperty("--theme-color-logo", "#fff");

//white-mode
// document.documentElement.style.setProperty("--theme-color", "#fff");

// document.documentElement.style.setProperty("--theme-color-text", "#000");

// document.documentElement.style.setProperty("--theme-color-light", "#fff");

// document.documentElement.style.setProperty(
//   "--theme-color-light-text",
//   "#7e7e7e"
// );

// document.documentElement.style.setProperty("--theme-color-hover", "#f2f2f2");

// document.documentElement.style.setProperty("--theme-color-logo", "#000");