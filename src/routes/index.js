import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Store from '../pages/menu';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Orders from '../pages/Order';
import Order from '../pages/Order/OrderView';

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route exact path="/" component={Store}/>
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/items/:order_id" component={Order} />
          <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}

export default Routes;