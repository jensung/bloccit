const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "The History of Man's Best Friend",
        description: "A brief history of dog's evolution to pets."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "Evolution from wolves",
          body: "It was originally believed that the first signs of domesticated wolves appeared around 15,000 years ago in the Middle East.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Marshall",
        description: "Best good boy doggy out there.",
      })
      .then((topic) => {
        expect(topic.title).toBe("Mashall");
        expect(topic.description).toBe("Best good boy doggy out there.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or description", (done) => {
      Topic.create({
        title: "Marshall"
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
        title:"Hydration is the key to a healthy body.",
        body: "The Harvard Health Letter recommends drinking 30 to 50 ounces of water a day, which is four to six glasses!",
        topicId: this.topic.id
      })
      .then((post) => {
        this.topic.getPosts()
        .then((postArray) => {
          let postCheck = false;
          for (i=0; i < postArray.length; i++) {
            if (postArray[i].title === "Hydration is the key to a healthy body.") {
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
