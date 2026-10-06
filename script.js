const quotes = [
  { text: "시작이 반이다.", author: "한국 속담" },
  { text: "성공은 매일 반복되는 작은 노력의 합이다.", author: "Robert Collier" },
  { text: "배움에는 끝이 없다.", author: "전통 격언" },
  { text: "할 수 있다고 믿는 순간, 이미 절반은 이룬 것이다.", author: "Theodore Roosevelt" }
];

function showRandomQuote() {
  const item = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteText").textContent = `“${item.text}”`;
  document.getElementById("quoteAuthor").textContent = `— ${item.author}`;
}

document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
showRandomQuote();

document.getElementById("today").textContent =
  new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" }).format(new Date());

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const q = document.getElementById("searchInput").value.trim();
  if (!q) return;
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
});

function weatherCodeText(code) {
  if (code === 0) return "맑음";
  if ([1, 2].includes(code)) return "대체로 맑음";
  if (code === 3) return "흐림";
  if ([45, 48].includes(code)) return "안개";
  if ([51, 53, 55, 56, 57].includes(code)) return "이슬비";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "비";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "눈";
  if ([95, 96, 99].includes(code)) return "뇌우";
  return "날씨 정보";
}

async function loadWeather(elementId, latitude, longitude) {
  const el = document.getElementById(elementId);
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
      `&longitude=${longitude}&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("weather request failed");

    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    const state = weatherCodeText(data.current.weather_code);
    el.innerHTML = `<div>${temp}℃</div><div>${state}</div>`;
  } catch (error) {
    el.textContent = "날씨를 불러오지 못했습니다.";
  }
}

loadWeather("seoulWeather", 37.5665, 126.9780);
loadWeather("jejuWeather", 33.4996, 126.5312);
