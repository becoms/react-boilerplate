import { Tire } from "./type";

const keys = {
  all: () => ["tires"] as const,
  lists: () => [...keys.all(), "list"] as const,
  one: (id: Tire["_id"]) => [...keys.all(), id] as const,
};

export default keys;
