import { Package2, Users } from 'lucide-react'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const galleryMenu = [
    {
      title: 'Gallery Overview',
      link: '/gallery/overview',
      icon: <Users className="size-4" />,
    },
    {
      title: 'Gallery Settings',
      link: '/gallery/settings',
      icon: <Users className="size-4" />,
    },
  ]

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="size-6" />
              <span className="">Pixieset</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {galleryMenu.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  {item.icon} {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col overflow-hidden">
        <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
