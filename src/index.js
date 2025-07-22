export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname !== "/farm-token.txt") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "GET") {
      const token = await env.FARM_TOKENS.get("farm-token");
      return new Response(token ?? "", {
        headers: { "Content-Type": "text/plain" },
        status: 200,
      });
    }

    if (request.method === "POST") {
      const apiKey = url.searchParams.get("api_key") ||
        request.headers.get("Authorization")?.replace("Bearer ", "");

      if (apiKey !== env.API_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }

      const body = await request.text();

      // Optional: validate token format
      if (!/^[\w\-+=\/]{10,500}$/.test(body)) {
        return new Response("Invalid token format", { status: 400 });
      }

      await env.FARM_TOKENS.put("farm-token", body);
      return new Response("Stored", { status: 200 });
    }

    return new Response("Method Not Allowed", { status: 405 });
  }
};
