'use client'
import { Dialog } from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Vehicle } from '@/http/get-vehicles'

interface VehicleTableRowProps {
  vehicle: Vehicle
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size={'icon'}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Vehicle Details</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Vehicle: {vehicle.name} - {vehicle.id}
              </DialogTitle>
              <DialogDescription>Vehicle details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>Name: {vehicle.name}</p>
              <p>LicensePlate: {vehicle.licensePlate}</p>
              <div className="flex size-24 items-center justify-center">
                TODO Map
              </div>
              <p className="text-end text-xs text-muted-foreground">
                {formatDistanceToNow(vehicle.updatedAt, {
                  addSuffix: true,
                })}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">{vehicle.name}</TableCell>
      <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(vehicle.updatedAt, {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>Todo vehicle actions</TableCell>
    </TableRow>
  )
}
