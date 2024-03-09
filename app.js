import express from "express";

const app = express();

app.get("/analytics", (req, res) => {
  const query = `
{
  viewer {
    zones(filter: {
      zoneTag: $zoneTag
    }) {
      httpRequests1dGroups(
        orderBy: [date_DESC],
        limit: $limit,
        filter: {
          date_gt: $from,
          date_leq: $to
        }
      ) {
        dimensions {
          date
        }
        sum {
          bytes
          cachedBytes
        }
        uniq {
          uniques
        }
      }
    }
  }
}
`

  const today = new Date();
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const variables = {
    "zoneTag": req.query.zoneId,
    "from": lastMonth.toISOString().slice(0, 10),
    "to": today.toISOString().slice(0, 10),
    "limit": 30,
  };

  fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${req.query.token}`,
    },
    body: JSON.stringify({ query, variables })
  })
    .then((result) => {
      if (result.ok) {
        (async () => {
          const json = await result.json();
          res.set({
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=60, s-maxage=60",
            "CDN-Cache-Control": "max-age=60",
          });
          res.json(json);
        })();
      } else {
        res.status(500).send("えらー");
      }
    });
});

app.use(express.static("public", {
  setHeaders: (res) => {
    res.set({
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "CDN-Cache-Control": "max-age=3600",
    });
  }
}));

app.listen(3000, () => {
  console.log("ポート 3000 でサーバーが起動しました！");
});
