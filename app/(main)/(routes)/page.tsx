import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <p className="text-3xl text-indigo-500 font-bold">Discord Clone</p>
      <Button className="bg-indigo-500">Click me</Button>
    </div>
  )
}
