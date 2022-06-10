import {createContext, useContext} from "react";

export enum CURSA_STATUS{
    ON_TIME,
    DELAYED,
    POSTPONED,
    CANCELED
}

export interface ICursa{
    title: string,
    status: CURSA_STATUS
}

export interface ICursaContext{
    addCursa: (data: ICursa)=>void;

}

const CursaContext=createContext<ICursaContext>({
    addCursa: ()=>{ },
});

export const useCursaContext= () : ICursaContext =>useContext(CursaContext);

export default CursaContext;