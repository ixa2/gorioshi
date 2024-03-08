// yuuk1.tk:
// 3ace6ae0587033b37c79e168cf60c234

// yuuk1.uk:
// 068e85c0bc67ef053660c7d2ceca7b89

// taikoapp.uk:
// 176677a44c89b3aa8ab0a33f2d7108c3

addEventListener("load", () => {
  fetch("/analytics?token=quLYkE5qpZzigafjrh1zrEN8aSUcz86U8vxP5wR3&zoneId=176677a44c89b3aa8ab0a33f2d7108c3")
    .then((res) => res.json())
    .then((json) => {
      const firstGroup = json["data"]["viewer"]["zones"][0]["httpRequests1hGroups"][0];

      document.getElementById("time").textContent = new Date(firstGroup["dimensions"]["datetime"]).toLocaleString();
      document.getElementById("uniq").textContent = firstGroup["uniq"]["uniques"];
      document.getElementById("gb").textContent = parseInt(firstGroup["sum"]["bytes"], 10) / 1024 ** 3;
    });
});
