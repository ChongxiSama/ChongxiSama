export const runtime = 'edge'
export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch('https://apibili.chongxi.us/recent')
    const data = await res.json()
    return Response.json(data)
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 })
  }
}
