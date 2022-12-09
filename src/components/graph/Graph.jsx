import React, { useState } from "react"
import "./Graph.css"

function Graph({ data, title, color1, color2, maxValue, active }) {


  return (
    <div>
      <h3>{title}</h3>
      <div className="graph-container">
        <div className="columns-container">
          {data.map((e, index) => {
            if (e === 0) return
            return (
              <div
                key={index}
                className="column"
                style={{
                  height: `${active ? (e / maxValue * 100 + '%') : '0%'}`,
                  backgroundColor: (index + 1) % 2 === 0 ? color2 : color1,
                  marginRight: (index + 1) % 2 === 0 ? "0px" : "10px",
                }}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Graph
