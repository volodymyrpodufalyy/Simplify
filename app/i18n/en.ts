const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    welcome: "Manage time\nmore effectively",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign Up",
    forBestImpression: "For best impression",
    haveAccount: "I have account already",
    or: "or",
    signUpGoogle: "sign up with Google",
    signUpFacebook: "sign up with Facebook",
      emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignUp: "Tap to sign up!",

    welcomeBack:'Welcome back!',
    tapToSignIn: "Tap to sign in!",
    iNotAccount: "I don`t have account yet",
    signInGoogle: "sign in with Google",
    signInFacebook: "sign in with Facebook",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  HomeScreen:{
    upcoming: 'Upcoming'
  },
  NewEventScreen: {
    newActivity: 'New activity',
    timeRange: 'Time range',
    attach: 'Attach a file',

  }
}

export default en
export type Translations = typeof en
