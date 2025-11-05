function vkConvert() {
  const input = document.getElementById("vk-date").value;
  const output = document.getElementById("vk-output");
  if (!input) {
    output.innerHTML = "";
    return;
  }

  const date = new Date(input + "T00:00:00Z");
  const year = date.getUTCFullYear();

  const startOfYear = Date.UTC(year, 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000) + 1;

  const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const vulkanTagDOY = isLeap ? 230 : 229;

  let vulkanYear = year - 1642;

  if (dayOfYear === vulkanTagDOY) {
    output.innerHTML = `🔥 <strong>Vulkantag</strong> – Vulkanistisches Neujahr ${vulkanYear}`;
    return;
  }

  let offset = dayOfYear - vulkanTagDOY;
  if (offset < 0) {
    offset += isLeap ? 366 : 365;
    vulkanYear -= 1;
  }

  const monthIndex = Math.floor(offset / 91);
  const dayInMonth = (offset % 91) + 1;
  const monthNames = ["Sobek", "Piez", "Frinek", "Arpol"];
  const month = monthNames[monthIndex] || "Unbekannt";

  output.innerHTML = `➡️ <strong>${dayInMonth}. ${month} ${vulkanYear}</strong>`;
}


function scrollFunction(header, toppos) {
  if (window.pageYOffset > toppos) {
    header.classList.add("sticky");
    document.body.style.paddingTop = "100px";
  } else {
    header.classList.remove("sticky");
    document.body.style.paddingTop = "0";
  }
}


window.onload=function() {


  const header = document.getElementById("myHeader");
  const toppos = header.offsetTop;

  window.onscroll = function() { scrollFunction(header, toppos); };

  document.getElementById("vk-button").addEventListener("click", vkConvert);

};