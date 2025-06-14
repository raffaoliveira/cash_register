import { MovementCashRegisterClosed } from '@/pages/MovementCashRegisterClosed'
import { useParams } from 'react-router-dom'

export function MovementCashRegisterClosedWrapper() {
  const { cashRegisterId } = useParams<{ cashRegisterId: string }>()
  return <MovementCashRegisterClosed cashRegisterId={cashRegisterId!} />
}
