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
import { registerSchema } from "@/lib/validations/auth";
import { PawPrint, Eye, EyeOff, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RegisterValues {
  username: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const initialValues: RegisterValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        name: values.name,
        password: values.password,
      });
      showToast({
        title: t("accountCreated"),
        description: t("nowYouCanLogin"),
      });
      navigate("/login");
    } catch (error) {
      console.error("[v0] Register error:", error);
      showToast({
        title: t("errorCreatingAccount"),
        description: t("checkYourData"),
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
          <CardTitle className="text-2xl">{t("registerTitle")}</CardTitle>
          <CardDescription>{t("registerDescription")}</CardDescription>
        </div>
      </CardHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, isValid }) => {
          const passwordRequirements = [
            { text: t("min8characters"), met: values.password.length >= 8 },
            {
              text: t("lettersAndNumbers"),
              met:
                /[a-zA-Z]/.test(values.password) &&
                /[0-9]/.test(values.password),
            },
            {
              text: t("passwordsMatch"),
              met:
                values.password === values.confirmPassword &&
                values.password.length > 0,
            },
          ];

          return (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t("usernameLabel")}</Label>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    placeholder={t("usernameRegisterPlaceholder")}
                    autoComplete="username"
                  />
                  {errors.username && touched.username && (
                    <p className="text-sm text-destructive">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{t("nameLabel")}</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("passwordLabel")}</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordRegisterPlaceholder")}
                      autoComplete="new-password"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("confirmPasswordLabel")}
                  </Label>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("confirmPasswordPlaceholder")}
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.text}
                      className={`flex items-center gap-2 text-sm ${
                        req.met ? "text-accent" : "text-muted-foreground"
                      }`}
                    >
                      <Check
                        className={`h-4 w-4 ${
                          req.met ? "opacity-100" : "opacity-30"
                        }`}
                      />
                      {req.text}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base rounded-xl"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting && <Spinner className="mr-2" />}
                  {t("registerTitle")}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    to="/login"
                    className="text-primary font-medium hover:underline"
                  >
                    {t("loginAction")}
                  </Link>
                </p>
              </CardFooter>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
}
