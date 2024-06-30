import { ability } from '@/auth/auth'
import { Header } from '@/components/header'

import { VehicleTable } from './vehicle-table'

export default async function Vehicles() {
  const permissions = await ability()
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        {permissions?.can('get', 'Vehicle') && <VehicleTable />}
      </main>
    </div>
  )
}
