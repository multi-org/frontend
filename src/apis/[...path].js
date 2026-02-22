export default async function handler(req, res) {
  const { path } = req.query;

  const backendUrl = `http://77.37.43.4:8083/${path.join("/")}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
}