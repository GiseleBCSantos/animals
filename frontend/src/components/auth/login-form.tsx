import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import { useAuth } from "@/hooks/use-auth";
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
import { loginSchema } from "@/lib/validations/auth";
import { PawPrint, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LoginValues {
  username: string;
  password: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      await login(values);
      showToast({
        title: t("welcomeBack"),
        description: t("loginSuccess"),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("[v0] Login error:", error);
      showToast({
        title: t("loginError"),
        description: t("incorrectUsernameOrPassword"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-2 shadow-xl">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center">
            <PawPrint className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl">{t("login")}</CardTitle>
          <CardDescription>{t("loginDescription")}</CardDescription>
        </div>
      </CardHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t("username")}</Label>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t("usernameRegisterPlaceholder")}
                  autoComplete="username"
                />
                {errors.username && touched.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordRegisterPlaceholder")}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-12 text-base rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner className="mr-2" />}
                {t("login")}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {t("alreadyHaveAccount")}{" "}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:underline"
                >
                  {t("createAccount")}
                </Link>
              </p>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
