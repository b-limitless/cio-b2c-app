import { febricTypes, febricSeasons, febricColor, threadTypes, waterProof, weaveTypes, materialType } from "./febric";

export const filterData = [
  // {
  //   name: "CATEGORY",
  //   code: "CATEGORY",
  //   type: "text",
  //   childrens: febricTypes,
  // },
  {
    name: "SEASON",
    code: "season",
    type: "text",
    childrens: febricSeasons ,
  },
  {
    name: "Weave",
    code: "weave",
    type: "text",
    childrens: weaveTypes ,
  },
  
  // {
  //   name: "COLORS",
  //   code: "colors",
  //   type: "color",
  //   childrens: febricColor ,
  // },
  {
    name: "Material",
    code: "material",
    type: "text",
    childrens: materialType ,
  },
  // {
  //   name: "WATER PROOF",
  //   code: "water_proof",
  //   type: "text",
  //   childrens: waterProof ,
  // },
  
];
