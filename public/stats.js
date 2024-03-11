addEventListener("load", () => {
  Promise.all([
    fetch("/analytics?token=quLYkE5qpZzigafjrh1zrEN8aSUcz86U8vxP5wR3&zoneId=3ace6ae0587033b37c79e168cf60c234")
      .then((res) => res.json())
      .then((json) => ["yuuk1.tk", "rgb(255, 182, 193)", "rgba(255, 182, 193, 0.2)", json]),

    fetch("/analytics?token=quLYkE5qpZzigafjrh1zrEN8aSUcz86U8vxP5wR3&zoneId=068e85c0bc67ef053660c7d2ceca7b89")
      .then((res) => res.json())
      .then((json) => ["yuuk1.uk", "rgb(173, 216, 230)","rgba(173, 216, 230, 0.2)", json]),

    fetch("/analytics?token=quLYkE5qpZzigafjrh1zrEN8aSUcz86U8vxP5wR3&zoneId=176677a44c89b3aa8ab0a33f2d7108c3")
      .then((res) => res.json())
      .then((json) => ["taikoapp.uk", "rgb(152, 255, 152)", "rgba(152, 255, 152, 0.2)", json]),
  ])
    .then((results) => {
      const ctxUsers = document.getElementById("users").getContext("2d");

      new Chart(ctxUsers, {
        data: {
          labels: results[0][3]["data"]["viewer"]["zones"][0]["httpRequests1dGroups"].map((g) => g["dimensions"]["date"]),
          datasets: results.map((r) => {
            return {
              type: "line",
              label: r[0],
              data: r[3]["data"]["viewer"]["zones"][0]["httpRequests1dGroups"].map((g) => g["uniq"]["uniques"]),
              borderColor: r[1],
              borderWidth: 1,
              fill: "origin",
              backgroundColor: r[2],
              pointStyle: "star",
            };
          }),
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "過去30日のユーザー数の推移",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const ctxBytes = document.getElementById("bytes").getContext("2d");

      new Chart(ctxBytes, {
        data: {
          labels: results[0][3]["data"]["viewer"]["zones"][0]["httpRequests1dGroups"].map((g) => g["dimensions"]["date"]),
          datasets: results.map((r) => {
            return {
              type: "line",
              label: r[0],
              data: r[3]["data"]["viewer"]["zones"][0]["httpRequests1dGroups"].map((g) => g["sum"]["bytes"] / 1000 ** 3),
              borderColor: r[1],
              borderWidth: 1,
              fill: "origin",
              backgroundColor: r[2],
              pointStyle: "star",
            };
          }),
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "過去30日の送受信データ量(GB)の推移",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
});
