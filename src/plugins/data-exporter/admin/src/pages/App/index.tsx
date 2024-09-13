/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import pluginPermissions from "../../permissions";

const App = () => {
  return (
    <div>
      <CheckPagePermissions permissions={pluginPermissions.read}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={AnErrorOccurred} />
        </Switch>
      </CheckPagePermissions>
    </div>
  );
};

export default App;
