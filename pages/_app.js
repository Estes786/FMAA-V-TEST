import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="fmaa-ui-theme">
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  )
}