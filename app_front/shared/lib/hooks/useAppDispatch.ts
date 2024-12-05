import { useDispatch } from "react-redux";
import {AppDispatch} from "../../providers/StoreProvider/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();