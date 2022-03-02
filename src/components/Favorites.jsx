import React from "react";

const Favorites = ({ onClose, items = [], onRemove }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between">
          Избранное{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/image/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="cartItem" key={index}>
              <img
                className="mr-20"
                width={70}
                height={70}
                src={item.imgUrl}
                alt="Sneakers"
              />
              <div>
                <p className="sneakers-name">{item.name}</p>
                <p className="price">{item.price}</p>
              </div>
              <img
                onClick={() => onRemove(item.id)}
                className="removeBtn"
                src="/image/btn-remove.svg"
                alt="Remove"
              />
            </div>
          ))
        ) : (
          <div className="emptyDrawer">
            <img
              className="emptyBox"
              width={200}
              height={200}
              src="/image/emptyBox2.jpg"
              alt="box"
            />
            <h3 className="emptyText">В избанном ничего нет...</h3>
            <button className="greenButton" onClick={onClose}>
              <img src="/image/arrow.svg" alt="arrow" /> Вернуться назад
            </button>
          </div>
        )}
        <div className="items"></div>
        <div className="cartTotalBlock">
          {/* <ul>
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <p className="price">21 498 руб.</p>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <p className="price">1074 руб. </p>
            </li>
          </ul> */}
          <button className="greenButton">
            Добавить в корзину
            <img src="/image/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
