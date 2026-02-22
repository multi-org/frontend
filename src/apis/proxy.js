export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://77.37.43.4:8083${req.url.replace("/api", "")}`,
      {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
        body:
          req.method !== "GET" && req.method !== "HEAD"
            ? JSON.stringify(req.body)
            : undefined,
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
}