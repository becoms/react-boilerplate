import { Location } from "react-router-dom";

function buildStateParameter(location: Location) {
  return {
    returnTo: location.pathname + location.search + location.hash,
  };
}

export default {
  buildStateParameter,
};
