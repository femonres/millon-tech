addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  const params = url.searchParams
  const width = params.get('width') || 300
  const height = params.get('height') || 300

  const imageURL = 'https://million-app.com' + url.pathname

  const res = await fetch(imageURL)
  const imageBuffer = await res.arrayBuffer()

  const resizedImage = await resizeImage(imageBuffer, width, height)

  return new Response(resizedImage, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}

async function resizeImage(imageBuffer, width, height) {
  const sharp = require('sharp')

  return await sharp(imageBuffer)
    .resize(parseInt(width), parseInt(height))
    .toBuffer()
}
