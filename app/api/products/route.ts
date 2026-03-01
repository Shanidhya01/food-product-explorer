export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const PAGE_SIZE = 15;

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&page=${page}&page_size=${PAGE_SIZE}&json=true`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "food-product-explorer (student project)",
      },

      next: { revalidate: 600 }, 
    });

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
