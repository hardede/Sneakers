// import Content from "./components/Content";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Favorites from "../src/pages/Favorites";
import Home from "./pages/Home";
import AppContext from "./context";
import Orders from "./pages/Orders";
import Drawer from "./components/Drawer/Drawer";
import { LayoutOne } from "./components/Layout";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponce, favoritesResponce, itemsResponce] =
          await Promise.all([
            axios.get("https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/cart"),
            axios.get("https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/favorites"),
            axios.get("https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/items"),
          ]);

        setIsLoading(false);

        setCartItems(cartResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        console.log("Ошибка 123");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (item) => {
    try {
      const findItem = cartItems.find((cart) => +cart.parentId === +item.id)
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((cartFilter) => +cartFilter.id !== +item.id)
        );
        await axios.delete(
          `https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, item]);
        const {data} = await axios.post(
          "https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/cart",
          item
        );
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onRemoveCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => +item.id !== +id));
      await axios.delete(
        `https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/cart/${id}`
      );
    } catch (error) {
      alert("Ошибка при удалении");
    }
  };

  const onAddToFavotire = async (fav) => {
    try {
      if (favorites.find((favObj) => favObj.id === fav.id)) {
        axios.delete(
          `https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/favorites/${fav.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/favorites",
          fav
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((item) => +item.parentId === +id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavotire,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <Routes>
        {/* <RouteWrapper path="/" element={<Header ></Header>} layout={LayoutOne}></RouteWrapper> */}
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavotire={onAddToFavotire}
              onAddToCart={onAddToCart}
              setCartOpened={setCartOpened}
              cartOpened={cartOpened}
              onRemoveCart={onRemoveCart}
              isLoading={isLoading}
            />
          }
          layout={LayoutOne}
        />
        <Route
          path="/favorites"
          element={
            <Favorites setCartOpened={setCartOpened} cartOpened={cartOpened} />
          }
        />
        <Route
          path="/orders"
          element={
            <Orders setCartOpened={setCartOpened} cartOpened={cartOpened} />
          }
        />
        <Route path="*" element={<Navigate replace to="/"></Navigate>} />
      </Routes>
    </AppContext.Provider>
  );

  // function RouteWrapper({
  //   element: Element,
  //   layout: Layout,
  //   ...rest
  // }) {
  //   return (
  //     <Route {...rest} render={(props) =>
  //       <Layout {...props}>
  //         <Component {...props} />
  //       </Layout>
  //     } />
  //   );
}

export default App;
