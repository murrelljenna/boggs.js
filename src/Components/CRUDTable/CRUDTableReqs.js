const reducer = (obj, item) => {
  obj[item.id] = item;
  return obj;
}

class CRUDTableRequirement {
  constructor(model) {
    this.model = model;
  }

  get(client) {
    return new Promise((resolve, reject) => {
      client.get(this.model).then((res) => {
        resolve(
          res.data.reduce(reducer, {})
        );
      });
    })
  }
}

export default Object.freeze({
  BUILDINGS: new CRUDTableRequirement("buildings"),
  ORGANIZERS: new CRUDTableRequirement("organizers"),
});
