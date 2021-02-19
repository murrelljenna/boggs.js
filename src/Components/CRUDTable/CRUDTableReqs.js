const reducer = (obj, item) => {
  obj[item.id] = item;
  return obj;
}

class CRUDTableRequirement {
  constructor(model) {
    this.model = model;
  }

  async get(client) {
    const res = await client.get(this.model);
    return res.data.reduce(reducer, {});
  }
}

export default Object.freeze({
  BUILDINGS: new CRUDTableRequirement("buildings"),
  ORGANIZERS: new CRUDTableRequirement("organizers"),
});
