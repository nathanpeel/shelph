'use client'

import { Provider } from "react-redux";

//import store
import { store } from "./redux/store";

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}