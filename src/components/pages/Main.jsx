import React from 'react'



const Main = (props) => {
  return (
    <div className="main-container">

      <main>
        {props.child}
      </main>

    </div>
  )
}

export default Main