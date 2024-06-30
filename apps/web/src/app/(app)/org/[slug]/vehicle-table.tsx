import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getVehicles } from '@/http/get-vehicles'

import { VehicleTableRow } from './vehicle-table-row'

export async function VehicleTable() {
  const org = getCurrentOrg()
  if (!org) {
    redirect('/')
  }
  const { vehicles } = await getVehicles(org)
  return (
    <>
      <h1 className="text-2xl font-bold">Vehicles List</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="w-[140px]">Name</TableHead>
              <TableHead className="w-[180px]">License Plate</TableHead>
              <TableHead className="w-[140px]">Updated at</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles &&
              vehicles.map((vehicle) => {
                return <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
              })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
