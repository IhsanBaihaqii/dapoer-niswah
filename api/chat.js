const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const text = req.query.text;

  try {
    const response = await axios.post(
      "https://feelbetterbot.com/",
      {
        text,
      },
      {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
          origin: "https://feelbetterbot.com",
          referer: "https://feelbetterbot.com/",
        },
      },
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
