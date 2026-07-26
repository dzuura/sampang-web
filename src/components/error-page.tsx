import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { RootLayout } from './root-layout'

interface ErrorPageProps {
  title?: string
  description?: string
  statusCode?: number
}

export function ErrorPage({
  title = 'Page Not Found',
  description = 'The page you are looking for does not exist.',
  statusCode = 404,
}: ErrorPageProps) {
  const router = useRouter()

  return (
    <RootLayout>
      <div className="container-page py-40 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold text-primary mb-4">{statusCode}</h1>
          <h2 className="font-display text-3xl text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">{description}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.history.back()} variant="outline">
              Go Back
            </Button>
            <Button onClick={() => router.navigate({ to: '/' })}>Go Home</Button>
          </div>
        </div>
      </div>
    </RootLayout>
  )
}
