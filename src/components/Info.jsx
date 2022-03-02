import React, { useContext } from 'react'
import AppContext from '../context'

const Info = ({title, image, description}) => {
  const { setCartOpened,} = useContext(AppContext)

  return (
    <div className="emptyDrawer d-flex align-center justify-center flex-column flex">
            <img
              className="emptyBox"
              width={120}
              height={120}
              src={image}
              alt="box"
            />
            <h3 className="emptyText">{title}</h3>
            <h5 className="sub-title">
              {description}
            </h5>
            <button className="greenButton" onClick={() => setCartOpened(false)}>
              <img src="/image/arrow.svg" alt="arrow" /> Вернуться назад
            </button>
          </div>
  )
}

export default Info