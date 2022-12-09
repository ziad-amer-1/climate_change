import { useEffect, useState } from "react"
import "./App.css"
import Graph from "./components/graph/Graph"
import Temperature from "./components/temperature/Temperature"
import Header from "./components/header/Header"

function App() {
  const [data, setData] = useState({})
  const [active, setActive] = useState(false)

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.thingspeak.com/channels/1969267/feeds.json?key=1FJVJJF49C0K9H1Z"
      )
      const data = await response.json()
      setData(data)
    }
    getData()
  }, [])

  console.log(data)

  const temperature = [
    ...new Set(
      data.feeds?.map((feed) => {
        return isNaN(+feed.field1) ? null : Math.ceil(+feed.field1)
      })
    ),
  ].filter((e) => e != null)
  const humidity = [
    ...new Set(
      data.feeds?.map((feed) => {
        return isNaN(+feed.field2) ? null : +feed.field2
      })
    ),
  ].filter((e) => e != null)

  const CFCs = [
    ...new Set(
      data.feeds?.map((feed) => {
        return isNaN(+feed.field3) ? null : Math.ceil(+feed.field3)
      })
    ),
  ].filter((e) => e != null && e <= 1200)
  const soil = [
    ...new Set(
      data.feeds?.map((feed) => {
        return isNaN(+feed.field4) ? null : +feed.field4 * -1
      })
    ),
  ].filter((e) => e != null && e <= 120)

  return (
    <>
      <Header />
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontWeight: 500,
          fontSize: "20px",
        }}
      >
        Monitoring droughts through detection of CFCs , temperature,& humidity
      </div>

      <div className="button-container">
        <button
          className="show-graph"
          onClick={() => setActive((prev) => !prev)}
        >
          show
        </button>
      </div>

      <div className="main-container">
        <Temperature temperature={temperature} active={active} />
        <Graph
          data={humidity}
          title="Humidity"
          color1="#db3702"
          color2="#312e71"
          maxValue={100}
          active={active}
        />
        <Graph
          data={CFCs}
          title="CFCs"
          color1="#936297"
          color2="#f3981b"
          maxValue={1200}
          active={active}
        />
        <Graph
          data={soil}
          title="Soil Moisture"
          color1="#159cb0"
          color2="#51ac9a"
          maxValue={120}
          active={active}
        />
      </div>
    </>
  )
}

export default App
