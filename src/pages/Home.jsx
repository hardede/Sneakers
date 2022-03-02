import React from "react";
import Card from "../components/Card/Card";
import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavotire,
  onAddToCart,
  setCartOpened,
  cartOpened,
  cartItems,
  onRemoveCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(4)] : filteredItems).map((card, index) => (
      <Card
        key={index}
        onFavorite={(item) => onAddToFavotire(item)}
        onPlus={(item) => onAddToCart(item)}
        loading={isLoading}
        {...card}
      />
    ));
  };

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
          <h1 className="">
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссвки"}
          </h1>
          <div className="search-block">
            <img src="/image/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear removeBtn"
                src="/image/btn-remove.svg"
                alt="remove"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск ..."
            />
          </div>
        </div>
        <div className="sneakers">{renderItems()}</div>
      </div>
    </div>
  );
};

export default Home;
