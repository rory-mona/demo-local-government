export async function GET() {
  // Mock login response
  const mockResponse = {
    success: true,
    token: 'mock-lasrra-token-' + Date.now(),
    user: {
      id: 'user-456',
      name: 'John Doe',
      email: 'john.doe@example.com',
      lasrraId: 'LASRRA123456789',
      phone: '+2348012345678'
    }
  }
  return Response.json(mockResponse)
}
