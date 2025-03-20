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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <p>{JSON.stringify(pedidosList)}</p>
=======
=======
>>>>>>> Stashed changes
      <ul>
        {pedidosList.map((pedido, index) => (
          <li key={index}>{JSON.stringify(pedido)}</li>
        ))}
      </ul>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </>
  )
}

export default App
SHEET ID = "https://docs.google.com/spreadsheets/d/1gLgpkSABsg49X4ZkBj_nxL0Ufu25j1XcPVqAqA-2JlI/edit?gid=366139392#gid=366139392"
RANGE = "A2:J"