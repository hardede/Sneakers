import React from "react";
import Card from "../components/Card/Card";
import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header";
import AppContext from "../context";

const Favorites = ({ setCartOpened, cartOpened, cartItems, onRemoveCart }) => {
  const { favorites, onAddToFavotire } = React.useContext(AppContext);

  return (
    <div className="wrapper clear">
      <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveCart}
        opened={cartOpened}
      />
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="d-flex align-center space-between justify-between mb-40">
          <h1 className="">Мои закладки</h1>
        </div>
        <div className="sneakers">
          {favorites.map((card, index) => (
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddToFavotire}
              {...card}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
