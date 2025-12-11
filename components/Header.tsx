"use client"

import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { useSession, signOut } from '@/lib/auth/auth-client'
import { LogOut, User, Library } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  // Génère les initiales pour l'avatar fallback
  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur 
      supports-backdrop-filter:bg-white/60 dark:bg-slate-900/80 dark:supports-backdrop-filter:bg-slate-900/60'>
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto h-24 px-4'>
        <Link href='/'>
          <h1 className='text-3xl font-bold title-gradient drop-shadow-lg'>NextGame</h1>
        </Link>
        
        <div className='flex items-center gap-4'>
          {isPending ? (
            // État de chargement - on peut afficher un skeleton ou rien
            <div className='w-8 h-8 rounded-full bg-muted animate-pulse' />
          ) : session?.user ? (
            // Utilisateur connecté
            <>
              <Button variant='ghost' asChild>
                <Link href='/' className='flex items-center gap-2'>
                  <Library className='size-4' />
                  Ma bibliothèque
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full'>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage 
                        src={session.user.image || undefined} 
                        alt={session.user.name || session.user.email || 'Avatar'} 
                      />
                      <AvatarFallback>
                        {getInitials(session.user.name, session.user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {session.user.name || 'Utilisateur'}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/' className='flex items-center gap-2 cursor-pointer'>
                      <User className='size-4' />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className='text-destructive focus:text-destructive cursor-pointer'
                  >
                    <LogOut className='size-4' />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Utilisateur non connecté
            <>
              <Button asChild>
                <Link href='/login'>
                  Connexion
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/register'>
                  Inscription
                </Link>
              </Button>
            </>
          )}
          
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header