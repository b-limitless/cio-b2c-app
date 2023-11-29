// Basically it will store the different part of 
// Model which is febric customizable 
// For example in accent we have collor defualt, all, inner 
import { defaultFebric } from "config/default";

type TCollarAccent = 'default' | 'all' | 'innerFebric';
type TBase = {
    id: number | string;
    meshName: string[];
    febric: string;
}
type TCollar = {
    type: TCollarAccent
} & TBase; 


interface IAccentGlobal {
    collar: TCollar;
}
const accentProperties: IAccentGlobal = {
    collar: {
      id: 12,
      // Iterate through the mesh name and apply the selected febric to that mesh 
      meshName: [], //'because it can be combining all or inner',
      febric: defaultFebric,
      type: 'default'
    },
}