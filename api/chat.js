const axios = require("axios");

import prompt from "./prompt.js";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const text = req.query.text || "Halo AI";
    const finalPrompt = await prompt(text);

    const response = await axios.post(
      "https://feelbetterbot.com/",
      {
        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],
      },
      {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
          origin: "https://feelbetterbot.com",
          referer: "https://feelbetterbot.com/",
          "user-agent": "Mozilla/5.0",
        },
      },
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      response: err.response?.data,
    });
  }
};
