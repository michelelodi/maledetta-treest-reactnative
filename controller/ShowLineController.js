import CommunicationController from "./CommunicationController";
import StorageManager from "../model/StorageManager";

export default class ShowLineController {
  async setUpPosts(requestBody) {
    let sm = new StorageManager();
    let posts = await new CommunicationController().getPosts(requestBody);
    let users = {};
    posts.map((el) => {
      if (!users[el.author] && parseInt(el.pversion) > 0)
        users[el.author] = el.pversion;
    });
    if (Object.keys(users).length) {
      let updatedPosts = await Promise.all(
        Object.keys(users).map(async (uid) => {
          let userPicture = await sm.getUserPicture(uid);

          if (!userPicture) {
            userPicture = await new CommunicationController().getUserPicture({
              sid: requestBody.sid,
              uid: uid,
            });
            console.log("Storing userPicture in db");
            await sm.storeUserPicture(
              userPicture.uid,
              userPicture.pversion,
              userPicture.picture
            );
          } else if (parseInt(userPicture.pversion) !== parseInt(users[uid])) {
            userPicture = await new CommunicationController().getUserPicture({
              sid: requestBody.sid,
              uid: uid,
            });
            console.log("Replacing userPicture in db");
            await sm.storeUserPicture(
              userPicture.uid,
              userPicture.pversion,
              userPicture.picture
            );
          } else {
            console.log("Loaded userPicture from db");
          }

          return posts.map((post) => {
            if (
              post.author === uid &&
              parseInt(post.pversion) === parseInt(userPicture.pversion)
            ) {
              post.upicture = userPicture.picture;
            }
            return post;
          });
        })
      );
      return updatedPosts[updatedPosts.length - 1];
    }
    return posts;
  }
}
