export async function GET() {
  const res = await fetch(
    'https://api.bilibili.com/x/web-interface/history/cursor?ps=20',
    {
      headers: {
        Cookie: `SESSDATA=${process.env.BILIBILI_SESSDATA}; bili_jct=${process.env.BILIBILI_JCT}`,
        'User-Agent': 'Mozilla/5.0',
      },
    }
  )

  const data = await res.json()
  return Response.json(data.data.list)
}
