export async function POST(request: Request) {
  const body = await request.json()
  // Mock discovery response
  const mockResponse = {
    discoveryId: 'lasrra-discovery-' + Date.now(),
    component: body.component || 'StartPanel',
    status: 'success'
  }
  return Response.json(mockResponse)
}

