import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

interface ServerSidebarProps {
  serverId: string
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()
  if (!profile) return redirect('/')
  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createAt: 'asc'
        }
      },
      members: {
        include: {
          profile: true
        }
      }
    }
  })
  return <div>hello</div>
}

export default ServerSidebar
