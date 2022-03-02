import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

const Card = ({
  name,
  price,
  imgUrl,
  id,
  onClickFavorite,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFav, setIsFav] = useState(favorited);
  const obj = { name, price, imgUrl, id, parentId: id }

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFav = () => {
    onFavorite(obj);
    setIsFav(!isFav);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={205}
          viewBox="0 0 160 205"
          backgroundColor="#dad7d7"
          foregroundColor="#555353"
        >
          <rect x="1" y="0" rx="10" ry="10" width="160" height="112" />
          <rect x="0" y="127" rx="3" ry="3" width="160" height="15" />
          <rect x="0" y="149" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="181" rx="6" ry="6" width="80" height="24" />
          <rect x="128" y="173" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                onClick={onClickFav}
                src={isFav ? "/image/heart_liked.svg" : "/image/heart.svg"}
                alt="heart"
              />
            </div>
          )}
          <img width="100%" height={112} src={imgUrl} alt="sneakers1" />
          <h5 className={styles.sneakers__title}>{name}</h5>
          <div className={styles.sneakersBottom}>
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <p>{price} грн.</p>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id)
                    ? "/image/btn-cheked.svg"
                    : "/image/btnplus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
