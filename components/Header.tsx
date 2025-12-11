import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='sticky top-0 w-full border-b bg-white/80 backdrop-blur 
      supports-backdrop-filter:bg-white/60 dark:bg-slate-900/80 dark:supports-backdrop-filter:bg-slate-900/60'>
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto h-24'>
        <Link href='/'>
          <h1 className='text-3xl font-bold title-gradient drop-shadow-lg'>NextGame</h1>
        </Link>
        <div className='flex items-center gap-4'>
          <Button>
            <Link href='/login'>
              Connexion
            </Link>
          </Button>
          <Button variant='outline'>
            <Link href='/register'>
              Inscription
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header