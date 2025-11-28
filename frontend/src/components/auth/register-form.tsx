import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Formik, Form, Field, type FormikHelpers } from "formik"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { showToast } from "@/lib/utils/toast"
import { registerSchema } from "@/lib/validations/auth"
import { PawPrint, Eye, EyeOff, Check } from "lucide-react"

interface RegisterValues {
  username: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const initialValues: RegisterValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  }

  const handleSubmit = async (values: RegisterValues, { setSubmitting }: FormikHelpers<RegisterValues>) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        name: values.name,
        password: values.password,
      })
      showToast({
        title: "Conta criada!",
        description: "Agora voce pode fazer login.",
      })
      navigate("/login")
    } catch (error) {
      console.error("[v0] Register error:", error)
      showToast({
        title: "Erro ao criar conta",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-2 shadow-xl">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center">
            <PawPrint className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>Cadastre-se para comecar a gerenciar seus pets</CardDescription>
        </div>
      </CardHeader>

      <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, isSubmitting, isValid }) => {
          const passwordRequirements = [
            { text: "Minimo 8 caracteres", met: values.password.length >= 8 },
            { text: "Letras e numeros", met: /[a-zA-Z]/.test(values.password) && /[0-9]/.test(values.password) },
            { text: "Senhas coincidem", met: values.password === values.confirmPassword && values.password.length > 0 },
          ]

          return (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario *</Label>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Escolha um nome de usuario"
                    autoComplete="username"
                  />
                  {errors.username && touched.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && touched.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha forte"
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.text}
                      className={`flex items-center gap-2 text-sm ${req.met ? "text-accent" : "text-muted-foreground"}`}
                    >
                      <Check className={`h-4 w-4 ${req.met ? "opacity-100" : "opacity-30"}`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-12 text-base rounded-xl" disabled={isSubmitting || !isValid}>
                  {isSubmitting && <Spinner className="mr-2" />}
                  Criar Conta
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Ja tem uma conta?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Fazer login
                  </Link>
                </p>
              </CardFooter>
            </Form>
          )
        }}
      </Formik>
    </Card>
  )
}
