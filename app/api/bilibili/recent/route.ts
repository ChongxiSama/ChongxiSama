export const runtime = 'edge'
export const revalidate = 60

export async function GET() {
  const res = await fetch(
    'https://api.bilibili.com/x/web-interface/history/cursor?ps=1',
    {
      headers: {
        Cookie: `SESSDATA=${process.env.BILIBILI_SESSDATA}; bili_jct=${process.env.BILIBILI_JCT}`,
        'User-Agent': 'Mozilla/5.0',
      },
    }
  )

  const data = await res.json()
  const item = data.data.list[0]

  return Response.json({
    title: item.title,
    progress: item.progress,
    duration: item.duration,
    view_at: new Date(item.view_at * 1000).toISOString(),
    bvid: item.history.bvid,
  })
}
