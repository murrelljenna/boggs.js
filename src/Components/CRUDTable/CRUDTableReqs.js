const reducer = (obj, item) => {
  obj[item.id] = item;
  return obj;
}


export default {
  buildings: {
    model: "buildings",
    get: (client) => new Promise((resolve, reject) => {
      client.get("buildings").then((res) => {
        resolve(
          res.data.reduce(reducer, {})
        );
      });
    })
  },

  organizers: {
    model: "organizers",
    get: (client) => new Promise((resolve, reject) => {
      client.get("organizers").then((res) => {
        resolve(
          res.data.reduce(reducer, {})
        );
      });
    })
  }
}
