import { toast as toastify, type ToastOptions } from "react-toastify"

interface ToastParams {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function showToast({ title, description, variant = "default" }: ToastParams) {
  const message = title ? `${title}${description ? ` - ${description}` : ""}` : description || ""

  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  if (variant === "destructive") {
    toastify.error(message, options)
  } else {
    toastify.success(message, options)
  }
}

export { toastify as toast }
