export const runtime = 'edge'
export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch(
      'https://api.bilibili.com/x/web-interface/history/cursor?ps=1',
      {
        headers: {
  Cookie: `SESSDATA=${process.env.BILIBILI_SESSDATA}; bili_jct=${process.env.BILIBILI_JCT}`,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://www.bilibili.com',
  Origin: 'https://www.bilibili.com',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9',
      }
    )

    const data = await res.json()
    
    if (data.code !== 0) {
      return Response.json({ error: data.message, code: data.code }, { status: 400 })
    }

    const item = data.data.list[0]
    
    if (!item) {
      return Response.json({ error: 'no history' }, { status: 404 })
    }

    return Response.json({
      title: item.title,
      progress: item.progress,
      duration: item.duration,
      view_at: new Date(item.view_at * 1000).toISOString(),
      bvid: item.history.bvid,
    })
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 })
  }
}
