import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (query === 'count') {
    try {
      const totalVisitors = await prisma.visitors.count()
      return NextResponse.json({
        success: true,
        count: totalVisitors,
        message: 'Total visitor count retrieved successfully'
      })
    } catch (error) {
      console.error('Error fetching visitor count:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch visitor count',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  }

  let ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    '103.52.96.11'

  ip = ip.split(',')[0].trim()

  const existing = await prisma.visitors.findFirst({
    where: { ipAddress: ip },
  })
  const geoRes = await fetch(`https://ipwho.is/${ip}`)
  const geo = await geoRes.json()

  if (geo.success) {
    if (!existing) {
      await prisma.visitors.create({
        data: {
          ipAddress: ip,
          city: geo.city,
          region: geo.region,
          country: geo.country,
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
      })
      return NextResponse.json({ success: true , message: 'New visitor created' })
    } else {
      await prisma.visitors.update({
        where: { id: existing.id },
        data: {
          city: geo.city,
          region: geo.region,
          country: geo.country,
          latitude: geo.latitude,
          longitude: geo.longitude,
          lastVisitedAt: new Date(),
          visitCount: {
            increment: 1,
          },
        },
      })
      return NextResponse.json({ success: true, message: 'Visitor updated' })
    }
  } else {
    return NextResponse.json({ success: false, message: 'Invalid IP address' })
  }
}
