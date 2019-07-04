module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const flairRoutes = require("../routes/flairs");
    const postRoutes = require("../routes/posts")
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisements");

    app.use(staticRoutes);
    app.use(flairRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
  }
}
