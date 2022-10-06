import firebase from "./firebase";

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

const useFirebaseAuth = () => {
  const signInWithGoogle = () =>
    firebase.auth().signInWithPopup(providers.google);

  const signInWithFacebook = () =>
    firebase.auth().signInWithPopup(providers.facebook);

  const signInWithGithub = () =>
    firebase.auth().signInWithPopup(providers.github);

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
  };
};

export default useFirebaseAuth;
