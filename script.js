const videoPage = document.querySelector(".video-page");

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-actual-input");

const themeChanger = document.getElementById("theme-changer");

const customNav = document.querySelector("custom-navbar");
// console.log(videoPage);

const API_KEY = "AIzaSyDijmeEgM8AIsrm8BlNzMSLySkfJ4antY0";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function searchVideos(searchQuery) {
  console.log(searchQuery);
  if (searchQuery == "" || searchQuery == undefined) {
    document.title = "Youtube";
  } else {
    document.title = `${searchQuery} - Youtube`;
  }
  try {
    let url = `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&part=snippet&maxResults=30`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.items);
    videoPage.innerHTML = "";
    displayVideo(data.items);
  } catch (err) {
    console.log(err);
  }
}

function displayVideo(data) {
  data.map(async (item) => {
    // console.log(item.snippet.channelId);

    const channedInfo = await channelDetails(item.snippet.channelId);

    const channelThumbnail = channedInfo.items[0].snippet.thumbnails.high.url;

    const videoInfo = await videoDetailS(item.id.videoId);

    const publishDate = displayDate(videoInfo.items[0].snippet.publishedAt);

    const viewsData = converViews(videoInfo.items[0].statistics.viewCount);

    const videoDiv = document.createElement("div");
    videoDiv.className = "video";
    videoDiv.addEventListener("click", () => {
      openVideo(item);
    });
    videoDiv.innerHTML = `<div class="thumbnail">
    <img
      src= ${item.snippet.thumbnails.high.url}
      alt=""
      width="100%"
      
    />
  </div>
  <div class="title">
    <div class="channel-profile">
      <div class="channel">
        <img
          src=${channelThumbnail}
          alt=""
          width="100%"
          style="border-radius: 50%"
        />
      </div>
    </div>
    <div class="video-desc">
      <div class="video-info">
        ${item.snippet.title}
      </div>

      <div class="channel-name">
        <h3>${item.snippet.channelTitle}</h3>
        <h2>${viewsData} views · ${publishDate}</h2>
      </div>`;

    videoPage.appendChild(videoDiv);
  });
}

async function videoDetailS(videoId) {
  try {
    let url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    // const dataToSend = JSON.stringify(data);

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

searchVideos(localStorage.getItem("searchFromVideo"));

// videoDetailS("IIuRc8IiSuE");

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

searchButton.addEventListener("click", () => {
  // console.log(searchInput.value);

  searchVideos(searchInput.value);
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") searchVideos(searchInput.value);
});

function searchFilters(event) {
  searchVideos(event.target.innerText);
}

function openVideo(item) {
  const jsonString = JSON.stringify(item);
  localStorage.setItem("videoToWatch", jsonString);
  window.location.href = "./video.html";
}

// themeChanger.addEventListener("click", () => {
//   document.getElementById("theme").classList.toggle("white-mode");
//   // customNav.classList.toggle("white-mode");
//   console.log(customNav);
// });

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