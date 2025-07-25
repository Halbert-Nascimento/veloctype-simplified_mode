import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      memory: process.memoryUsage(),
      services: {
        api: 'healthy',
        cache: 'healthy'
      }
    }, 
    { status: 200 }
  )
}
