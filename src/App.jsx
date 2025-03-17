import { useEffect, useState } from "react"
import { api } from "./services/api"

function App() {
  const [pedidosList, setPedidosList] = useState([])
  useEffect(() => {
    const getPedidos = async () => {
      const { data } = await api.get()
      if (JSON.stringify(data.values) !== JSON.stringify(pedidosList)) {
        setPedidosList(data.values)
      }
    }

    const intervalId = setInterval(() => {
      getPedidos()
    }, 1000)

    return () => clearInterval(intervalId)
    
  }, [pedidosList])


  return (
    <>
      <p>{JSON.stringify(pedidosList[0])}</p>
    </>
  )
}

export default App
