'use client'
import React, { useState } from 'react'
import qs from 'query-string'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/user-avatar'
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { MemberRole } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }
  const router = useRouter()
  const isModalOpen = isOpen && type === 'members'
  const [isLoadingID, setIsLoadingID] = useState('')
  const roleIconMap = {
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
    MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    GUEST: null
  }
  const onKick = async (memberId: string) => {
    try {
      setIsLoadingID(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      })
      const res = await axios.delete(url)
      router.refresh()
      onOpen('members', { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingID('')
    }
  }
  const onRoleChange = async (role: MemberRole, memberId: string) => {
    try {
      setIsLoadingID(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      })
      const res = await axios.patch(url, { role })
      router.refresh()
      onOpen('members', { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingID('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-5 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="font-semibold text-xs flex items-center gap-x-2">
                  {member.profile?.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                isLoadingID !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(MemberRole.GUEST, member.id)
                                }
                                disabled={member.role === MemberRole.GUEST}
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member.role === MemberRole.GUEST && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(MemberRole.MODERATOR, member.id)
                                }
                                disabled={member.role === MemberRole.MODERATOR}
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role === MemberRole.MODERATOR && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {isLoadingID === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default MembersModal
