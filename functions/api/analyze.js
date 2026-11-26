
export async function onRequest() {
  return new Response(
    JSON.stringify({
      success: true,
      name: "Livingston AI",
      message: "Backend opérationnel",
      status: "ready"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
