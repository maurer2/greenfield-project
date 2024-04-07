export async function POST(request: Request) {
  const payload = await request.formData();

  console.log(payload);

  return Response.json({ data: 'OK' });
}
