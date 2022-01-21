import CommunicationController from "./CommunicationController";
import StorageManager from "../model/StorageManager";

export default class ShowLineController {
  cc = new CommunicationController();

  async setUpPosts(requestBody) {
    let sm = new StorageManager();
    let posts = await this.cc.getPosts(requestBody);
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
            userPicture = await this.cc.getUserPicture({
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
            userPicture = await this.cc.getUserPicture({
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

  async handleStationsToShow(requestBody, stations) {
    if (stations[requestBody.did]) return false;
    requestedStations = await this.cc.getStations(requestBody);
    stations[requestBody.did] = requestedStations["stations"];
    return stations;
  }
}
