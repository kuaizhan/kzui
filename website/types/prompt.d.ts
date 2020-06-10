declare const prompt: {
  alert: (msg?: string | React.ReactNode, onConfirm?: () => void, buttonText?: string) => void,
  confirm: (msg?: string | React.ReactNode, onConfirm?: () => void, onCancel?: () => void, confirmText?: string, cancelText?: string) => void
}

export { prompt }