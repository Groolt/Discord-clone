'use client'
import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
interface FileUploadProps {
  onChange: (file: string) => void
  value: string
  endpoint: 'serverImage' | 'messageFile'
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className="relative w-20 h-20">
        <Image fill alt="Upload" src={value} className="rounded-full" />
        <button
          type="button"
          className="bg-rose-500 text-white p-1 absolute top-0 right-0 rounded-full shadow-sm"
          onClick={() => onChange('')}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url || '')
      }}
      onUploadError={(err: Error) => {
        console.error(err)
      }}
    />
  )
}

export default FileUpload
