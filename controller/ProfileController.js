import CommunicationController from "./CommunicationController";

export let handleEditProfileNamePress = async (userName, sid) => {
  if (userName && userName.length > 0) {
    if (userName.length < 20) {
      let cc = new CommunicationController();
      cc.setProfile({ sid: sid, name: userName })
        .then(() => {
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    } else console.log("User entered a too long name");
  } else console.log("User entered an empty name");
};
