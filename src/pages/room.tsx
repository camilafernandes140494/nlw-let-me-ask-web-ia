import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
  roomId: string
}
export function Room() {
  const { roomId } = useParams<RoomParams>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="mb-4 font-bold text-3xl text-white">Room Page</h1>
      <p className="text-white">{roomId}</p>
    </div>
  )
}
