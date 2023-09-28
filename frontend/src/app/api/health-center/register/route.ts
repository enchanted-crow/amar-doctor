import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const jsonForm = JSON.stringify(Object.fromEntries(formData))
  return NextResponse.json(jsonForm)
}


export async function GET() {
  return new NextResponse("okay!")
}