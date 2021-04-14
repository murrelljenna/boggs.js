class ReferenceResource {
  constructor(model, reducer = (obj, item) => {
    obj[item.id] = item;
    return obj;
  }) {
    this.reducer = reducer;
    this.model = model;
  }

  async get(client) {
    const res = await client.get(this.model);
    return res.data.reduce(this.reducer, {});
  }
}

export default Object.freeze({
  BUILDINGS: new ReferenceResource("buildings/"),
  ORGANIZERS: new ReferenceResource("organizers/"),
  CONTACTS: new ReferenceResource("contacts/"),
  ACTIVITYCODES: new ReferenceResource("activities/codes/"),
});
