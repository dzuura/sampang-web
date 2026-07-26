import { Router, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { ErrorPage } from '@/components/error-page'
import { RootLayout } from '@/components/root-layout'

// Import all pages
import { HomePage } from '@/pages/index'
import { EventsPage } from '@/pages/events'
import { EventDetailPage } from '@/pages/event-detail'
import { DancesPage } from '@/pages/dances'
import { DanceDetailPage } from '@/pages/dance-detail'
import { NewsPage } from '@/pages/news'
import { NewsDetailPage } from '@/pages/news-detail'
import { AboutPage } from '@/pages/about'
import { ContactPage } from '@/pages/contact'
import { GalleryPage } from '@/pages/gallery'


// Root layout component for TanStack Router
function RootRouteComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

// Root route
const rootRoute = createRootRoute({
  component: RootRouteComponent,
  errorComponent: () => (
    <RootLayout>
      <ErrorPage title="Error" description="An error occurred while loading the page." />
    </RootLayout>
  ),
  notFoundComponent: () => (
    <RootLayout>
      <ErrorPage title="Page Not Found" description="The page you are looking for does not exist." statusCode={404} />
    </RootLayout>
  ),
})

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: EventsPage,
})

const eventDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events/$slug',
  component: EventDetailPage,
})

const dancesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dances',
  component: DancesPage,
})

const danceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dances/$slug',
  component: DanceDetailPage,
})

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: NewsPage,
})

const newsDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news/$slug',
  component: NewsDetailPage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
})





// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  eventsRoute,
  eventDetailRoute,
  dancesRoute,
  danceDetailRoute,
  newsRoute,
  newsDetailRoute,
  aboutRoute,
  contactRoute,
  galleryRoute,
])

// Create and export router
export const router = new Router({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
