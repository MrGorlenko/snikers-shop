import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography";
import { List } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { BasketListItem } from "./basket-list-item";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { ButtonComponent } from "../components/button-component";

interface BasketItem {
  zIndex: string;
  img: string;
  title: string;
  size: string;
  price: number;
  wrapperClassName: string;
  switchOffHandler(): any;
  reject(): any | void;
  deleteFunc(): any | void;
}

export const RemoveGoodModal: FunctionComponent<BasketItem> = ({
  zIndex,
  img,
  title,
  size,
  price,
  wrapperClassName,
  switchOffHandler,
  reject,
  deleteFunc,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [disabledDrag, setDisabledDrag] = useState(false);

  const handleSwitchOffHandler = () => {
    setPosition({ x: 0, y: 20 });
    switchOffHandler();
  };

  const dragHandler: DraggableEventHandler = (e, draggedPosition) => {
    setPosition(draggedPosition);
  };

  const dropDragHandler: DraggableEventHandler = (e, draggedPosition) => {
    if (position.y > 110) {
      switchOffHandler();
    }
  };

  const rejectHandler = () => {
    reject();
  };

  const deleteHandler = () => {
    switchOffHandler();
    deleteFunc();
  };

  const nodeRef = React.useRef(null);

  return (
    <div
      className={`removeGoodModalWrapper ${wrapperClassName}`}
      style={{ zIndex: zIndex }}
    >
      <div
        className="removeGoodModalSwitcher"
        onClick={handleSwitchOffHandler}
      ></div>
      <Draggable
        axis="y"
        disabled={disabledDrag}
        bounds={{ top: 20, left: 0, right: 0 }}
        defaultPosition={position}
        handle=".handle"
        onDrag={dragHandler}
        onStop={dropDragHandler}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={`removeGoodModal pb-5`}>
          <div className="container">
            <div
              className="w-100 d-flex justify-content-center align-items-center  handle"
              style={{ height: 40 }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: "50px",
                  background: "#E8E8E8",
                }}
              ></div>
            </div>
            <Typography
              variant={"h4"}
              component={"h4"}
              sx={{
                fontSize: 18,
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "1em",
              }}
            >
              Вы уверены, <br></br> что хотите удалить данный товар?
            </Typography>
            <Divider></Divider>
            <List>
              <BasketListItem
                img={img}
                title={title}
                size={size}
                price={price}
                discount_price={price}
                childrenCounter={<span></span>}
                childrenDelete={<span></span>}
              ></BasketListItem>
            </List>
            <div className="row pt-4">
              <div className="col-6">
                <ButtonComponent color="gray" onClickHandler={rejectHandler}>
                  Отмена
                </ButtonComponent>
              </div>
              <div className="col-6">
                <ButtonComponent color="red" onClickHandler={deleteHandler}>
                  Удалить
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
