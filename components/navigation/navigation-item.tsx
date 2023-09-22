'use client'
import Image from 'next/image'
import { ActionTooltip } from '@/components/action-tooltip'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavigationItemProps {
  name: string
  imageUrl: string
  id: string
}
const NavigationItem = ({ name, imageUrl, id }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()
  const handleOnClick = () => {
    router.push(`/servers/${id}`)
  }
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={handleOnClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full w-[4px] transition-all',
            params?.serverId !== 'group-hover: h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <div
          className={cn(
            'h-[48px] w-[48px] relative mx-3 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            params?.serverId === id &&
              'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <Image alt="Channel" fill src={imageUrl} />
        </div>
      </button>
    </ActionTooltip>
  )
}

export default NavigationItem
