import firebase from "./firebase";

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

const useFirebaseAuth = () => {
  const redirectToApp = () => console.log("redirectToApp");

  const signInWithGoogle = () =>
    firebase.auth().signInWithPopup(providers.google).then(redirectToApp);

  const signInWithFacebook = () =>
    firebase.auth().signInWithPopup(providers.facebook).then(redirectToApp);

  const signInWithGithub = () =>
    firebase.auth().signInWithPopup(providers.github).then(redirectToApp);

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
  };
};

export default useFirebaseAuth;
