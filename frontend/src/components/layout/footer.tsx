import { Link } from "react-router-dom"
import { PawPrint, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">PetCare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A plataforma mais completa para gerenciar seus animais de estimacao com todo o carinho que eles merecem.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Links Rapidos</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link to="/login" className="hover:text-foreground transition-colors">
                Entrar
              </Link>
              <Link to="/register" className="hover:text-foreground transition-colors">
                Criar Conta
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">
                Central de Ajuda
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Contato
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} PetCare. Todos os direitos reservados.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-4 w-4 text-destructive fill-destructive" /> para os pets
          </p>
        </div>
      </div>
    </footer>
  )
}
