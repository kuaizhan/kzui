declare const notification: {
    success: (
        config: {content: string, duration?: number} | string,
        duration?: number
     ) => void,
    warn:  (
        config: {content: string, duration?: number} | string,
        duration?: number
     ) => void,
    error:  (
        config: {content: string, duration?: number} | string,
        duration?: number
     ) => void,
}
  
  export { notification }