import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'

export function SideBar() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="flex flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold">Controle de Caixa</h1>
        <nav aria-label="Menu principal" className="flex justify-center gap-6">
          <Link to="/cash">
            <Button className="w-34" variant="default">
              Caixas
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-34" variant="default">
              Movimento
            </Button>
          </Link>
          <Link to="/about">
            <Button className="w-34" variant="default">
              Sobre
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full px-2 max-w-6xl mx-auto">
        <Outlet />
      </main>
      <footer className="px-4 py-2 text-xs text-muted-foreground flex justify-center items-center max-w-6xl mx-auto w-full">
        <p>Desenvolvido por Rafael Oliveira</p>
      </footer>
    </div>
  )
}
