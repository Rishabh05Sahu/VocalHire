import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import React,{ReactNode} from 'react'
import { redirect } from 'next/navigation'

const layout = async({children}:{children:React.ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className="flex item-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={38} height={32} />
        <h2 className='text-primary-100'>VocalHire</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default layout
