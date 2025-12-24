import AdminClient from './AdminClient'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AdminClient />
        </div>
      </div>
    </div>
  )
}

