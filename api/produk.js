const fs = require("fs");
const path = require("path");

async function loadProduk(ukuran) {
  try {
    const filePath = path.join(
      process.cwd(),
      "assets",
      "data",
      "jamu",
      `${ukuran}.json`,
    );

    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getAllProduk() {
  const results = await Promise.all([
    loadProduk("60ml"),
    loadProduk("250ml"),
    loadProduk("500ml"),
    loadProduk("1000ml"),
  ]);

  return results.flat();
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const data = await getAllProduk();

    res.status(200).json({
      success: true,
      jamu: { total: data.length, data },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
