export async function onRequest(context) {
  const apiKey = context.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return Response.json(
      { success: false, error: "TWELVE_DATA_API_KEY manke sou Cloudflare" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(context.request.url);
    const symbol = url.searchParams.get("symbol") || "XAU/USD";

    const tdRes = await fetch(
      `https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`
    );
    const data = await tdRes.json();

    if (!tdRes.ok || data.status === "error") {
      return Response.json(
        { success: false, error: data.message || "Erè Twelve Data" },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      name: "Livingston AI",
      symbol,
      price: data.price,
      status: "live"
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || "Erè sèvè" },
      { status: 500 }
    );
  }
}
