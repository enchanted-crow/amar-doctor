import { NextResponse, NextRequest } from 'next/server'

const openAiApiUrl = ''

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const description = searchParams.get('description')

  console.log("baal")

  // const res = await fetch(`openAiApiUrl`, {
  //   headers: <any> {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const reply = await res.json()

  // return Response.json({ reply })

  return NextResponse.json({ "reply": description + " No cures for you. Sorry :(" })
}