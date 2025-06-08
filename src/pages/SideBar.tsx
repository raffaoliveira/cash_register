import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'

export function SideBar() {
  return (
    <div className="h-screen bg-zinc-200 px-5">
      <header className="flex flex-col gap-6 p-6 bg-zinc-200">
        <h1 className="text-4xl font-bold">Controle de Caixa</h1>
        <nav className="col-span-2 space-y-4">
          <nav className="flex justify-center gap-6">
            <Link to="/cash">
              <Button className="w-34" variant="outline">
                Caixas
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-34" variant="outline">
                Movimento
              </Button>
            </Link>
            <Link to="/about">
              <Button className="w-34" variant="outline">
                Sobre
              </Button>
            </Link>
          </nav>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
