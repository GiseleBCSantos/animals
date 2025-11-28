import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/utils/toast";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { PawPrint, ArrowLeft, Mail } from "lucide-react";

interface ForgotPasswordValues {
  email: string;
}

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const initialValues: ForgotPasswordValues = {
    email: "",
  };

  const handleSubmit = async (
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmittedEmail(values.email);
      setIsSubmitted(true);
      showToast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada.",
      });
    } catch {
      showToast({
        title: "Erro",
        description: "Nao foi possivel enviar o email.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center">
              <Mail className="h-7 w-7 text-accent-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Verifique seu email</CardTitle>
            <CardDescription className="mt-2">
              Enviamos instrucoes de recuperacao para{" "}
              <strong>{submittedEmail}</strong>. Verifique sua caixa de entrada
              e spam.
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          <Link to="/login" className="w-full">
            <Button
              variant="outline"
              className="w-full h-12 text-base rounded-xl bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
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
          <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
          <CardDescription>
            Informe seu email e enviaremos instrucoes para redefinir sua senha
          </CardDescription>
        </div>
      </CardHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-12 text-base rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner className="mr-2" />}
                Enviar Instrucoes
              </Button>

              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o login
              </Link>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
