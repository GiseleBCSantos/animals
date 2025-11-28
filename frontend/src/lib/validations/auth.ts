import * as Yup from "yup"

export const loginSchema = Yup.object({
  username: Yup.string().required("Usuario e obrigatorio").min(3, "Usuario deve ter no minimo 3 caracteres"),
  password: Yup.string().required("Senha e obrigatoria").min(6, "Senha deve ter no minimo 6 caracteres"),
})

export const registerSchema = Yup.object({
  username: Yup.string().required("Usuario e obrigatorio").min(3, "Usuario deve ter no minimo 3 caracteres"),
  email: Yup.string().required("Email e obrigatorio").email("Email invalido"),
  name: Yup.string(),
  password: Yup.string()
    .required("Senha e obrigatoria")
    .min(8, "Senha deve ter no minimo 8 caracteres")
    .matches(/[a-zA-Z]/, "Senha deve conter letras")
    .matches(/[0-9]/, "Senha deve conter numeros"),
  confirmPassword: Yup.string()
    .required("Confirmacao de senha e obrigatoria")
    .oneOf([Yup.ref("password")], "Senhas devem coincidir"),
})

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().required("Email e obrigatorio").email("Email invalido"),
})

export const animalSchema = Yup.object({
  name: Yup.string().required("Nome e obrigatorio").min(2, "Nome deve ter no minimo 2 caracteres"),
  species: Yup.string().required("Especie e obrigatoria"),
  breed: Yup.string(),
  age: Yup.number().nullable().min(0, "Idade deve ser positiva").max(100, "Idade deve ser menor que 100"),
})
