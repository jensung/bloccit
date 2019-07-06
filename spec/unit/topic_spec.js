const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({ force: true }).then((res) => {

      User.create({ // Create User Object
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
        .then((user) => {
          this.user = user; //store the user

          Topic.create({ // Create a Topic object.
            title: "Expeditions to Alpha Centauri",
            description: "A compilation of reports from recent visits to the star system.",
            posts: [{
              title: "My first visit to Proxima Centauri b",
              body: "I saw some rocks.",
              userId: this.user.id
            }]
          }, {
              include: {
                model: Post,
                as: "posts"
              }
            })
            .then((topic) => {
              this.topic = topic; //store the topic
              this.post = topic.posts[0]; //store the post
              done();
            })
        })
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "The Matrix",
        description: "One of the best movies of the 20th century",
      })
      .then((topic) => {
        expect(topic.title).toBe("The Matrix");
        expect(topic.description).toBe("One of the best movies of the 20th century");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or description", (done) => {
      Topic.create({
        title: "The Matrix"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });

  describe("#getPosts()", () => {

    it("should return an array of posts associated with a given topic", (done) => {
      Post.create({
        title:"Mankind harnesses the power of the atom",
        body: "The first atomic bomb was successfully detonated on July 16th, 1945, Trinity Test in New Mexico as part of the Manhatten Project",
        topicId: this.topic.id,
        userId: this.user.id
      })
      .then((post) => {
        this.topic.getPosts()
        .then((postArray) => {
          let postCheck = false;
          for (i=0; i < postArray.length; i++) {
            if (postArray[i].title === "Mankind harnesses the power of the atom") {
              postCheck = true;
              break;
            }
          }
          expect(postCheck).toBe(true);
          done();
        })
      })
    })
  });

});
