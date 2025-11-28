import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertDialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext)
  if (!context) {
    throw new Error("AlertDialog components must be used within an AlertDialog")
  }
  return context
}

export interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function AlertDialog({ open = false, onOpenChange, children }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

function AlertDialogTrigger({ children, asChild, ...props }: AlertDialogTriggerProps) {
  const { onOpenChange } = useAlertDialogContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    })
  }

  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useAlertDialogContext()
  if (!open) return null
  return <>{children}</>
}

export interface AlertDialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return <div className={cn("fixed inset-0 z-50 bg-black/50 animate-in fade-in-0", className)} {...props} />
}

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  const { open, onOpenChange } = useAlertDialogContext()

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <>
      <AlertDialogOverlay />
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg rounded-lg",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
}

export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function AlertDialogAction({ className, ...props }: AlertDialogActionProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function AlertDialogCancel({ className, ...props }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialogContext()

  return (
    <button
      onClick={() => onOpenChange(false)}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0",
        className,
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
