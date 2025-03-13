// App Router API route handler
export async function GET(): Promise<Response> {
  // App Router API routes don't have direct access to the underlying HTTP server
  // This is a limitation in the current App Router implementation
  // For Socket.io, you should use the Pages Router API routes instead
  
  // Return a response explaining the situation
  return new Response(
    JSON.stringify({
      message: 'Socket.io server cannot be initialized in App Router API routes. Please use Pages Router API routes instead.',
      documentation: 'https://nextjs.org/docs/pages/building-your-application/routing/api-routes'
    }),
    {
      status: 501,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
} 