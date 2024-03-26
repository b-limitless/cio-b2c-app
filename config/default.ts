import { ThreadColor } from "pages/customize/Select/Styles/ProductStyles/Items";

export const defaultFebric = `/img/febric-6.jpg`;
export const defaultCuffModel = `/models/cuffs/cuff-single-button.glb`;
export const defaultCollarModel = `/models/collars/collar-1-draco.glb`;
export const buttonThreadBaseURI = '/img/button-threads';

export const defaultContrastButtonThread:ThreadColor = {
  id: '1',
  title: 'Black',
  febric: `${buttonThreadBaseURI}/thread-black.png`,
  price:0
};

export const defaultButtonColor = {
  id: '1',
  title: 'Black',
  texture: `/img/buttons/texture/blue.png`,
  price: 0,
  febric: `/img/buttons/icon/blue.png`
}
//?timestamp=${Date.now()}
