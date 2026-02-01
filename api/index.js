export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  const API_NAME = "CyberX API";
  const DEVELOPER = "@osint_seller";

  const VALID_KEYS = ["cyberx_free", "cyberx_pro"];
  const API_ON = true; // false karoge to API band

  const { apikey, rc } = req.query;

  // API OFF
  if (!API_ON) {
    return res.json({
      api: API_NAME,
      developer: DEVELOPER,
      status: false,
      message: "API under maintenance"
    });
  }

  // API key check
  if (!apikey || !VALID_KEYS.includes(apikey)) {
    return res.status(401).json({
      api: API_NAME,
      developer: DEVELOPER,
      status: false,
      message: "Invalid API key"
    });
  }

  // RC check
  if (!rc) {
    return res.json({
      api: API_NAME,
      developer: DEVELOPER,
      status: false,
      message: "RC number required"
    });
  }

  try {
    const url =
      "https://vehicle-api-theta.vercel.app/vehicle-info?apikey=sam&rc_number=" +
      encodeURIComponent(rc);

    const response = await fetch(url);
    const data = await response.json();

    return res.json({
      api: API_NAME,
      developer: DEVELOPER,
      status: true,
      data
    });

  } catch (err) {
    return res.json({
      api: API_NAME,
      developer: DEVELOPER,
      status: false,
      message: "Service temporarily unavailable"
    });
  }
    }
