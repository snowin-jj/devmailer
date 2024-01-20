export async function POST(request: Request) {
  try {
    const data = await request.json();
    const res = await fetch(
      `${request.headers.get("origin")}/api/sendmail?apikey=${
        process.env.DEVMAILER_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      return Response.json(
        { message: "Thanks for your feedback" },
        { status: res.status }
      );
    } else if (res.status === 429) {
      return Response.json(
        { error: "Facing too many request! Please try after sometime" },
        { status: res.status }
      );
    } else {
      return Response.json(
        { error: "Something went wrong" },
        { status: res.status }
      );
    }
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
