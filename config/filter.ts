import { febricTypes, febricSeasons, febricColor, threadTypes, waterProof } from "./febric";

export const filterData = [
  {
    name: "CATEGORY",
    code: "CATEGORY",
    type: "text",
    childrens: febricTypes,
  },
  {
    name: "SEASON",
    code: "season",
    type: "text",
    childrens: febricSeasons ,
  },
  {
    name: "COLORS",
    code: "colors",
    type: "color",
    childrens: febricColor ,
  },
  {
    name: "THREAD",
    code: "thread",
    type: "text",
    childrens: threadTypes ,
  },
  {
    name: "WATER PROOF",
    code: "water_proof",
    type: "text",
    childrens: waterProof ,
  },
  
];
