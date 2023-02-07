import React, { useMemo, useRef, useState } from "react"
import {
  Image,
  ImageStyle,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "../components"
import { colors, spacing } from "../theme"
import { rootReducer, useAppDispatch, useAppSelector } from "../store/store"
import { clearErrors, signUp } from "../store/auth/action"

const coffee = require("../../assets/images/coffe.png")
const google = require("../../assets/images/google.png")
const facebook = require("../../assets/images/facebook.png")

export const SignupScreen = ({ navigation }) => {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")

  const { error } = useAppSelector((state: rootReducer) => state.AuthReducer)

  const dispatch = useAppDispatch()
  const signUpHandler = () => {
    dispatch(signUp({ email: authEmail, password: authPassword }))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const onChangeEmail = (text) => {
    setAuthEmail(text)
    dispatch(clearErrors())
  }

  const onChangePassword = (text) => {
    setAuthPassword(text)
    dispatch(clearErrors())
  }

  return (
    <View style={$screenContentContainer}>

      <View>
        <Text tx={"loginScreen.forBestImpression"} size={"xll"} style={{ textAlign: "center" }} />
        <Text tx={"loginScreen.signIn"} size={"xl"} style={{ textAlign: "center" }} />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text tx={"loginScreen.haveAccount"} size={"md"}
                style={{ textAlign: "center", color: colors.palette.secondary500 }} />
        </TouchableOpacity>

      </View>
      <View>

        <TextField
          value={authEmail}
          onChangeText={onChangeEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error?.emailErrorMsg}
          status={error?.emailErrorMsg ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={onChangePassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          helper={error?.passwordErrorMsg}
          status={error?.passwordErrorMsg ? "error" : undefined}
          onSubmitEditing={signUpHandler}
          RightAccessory={PasswordRightAccessory}
        />

        <Button
          testID="login-button"
          tx="loginScreen.tapToSignUp"
          style={$tapButton}
          preset="reversed"
          onPress={signUpHandler}
        />
      </View>
      <Text tx={"loginScreen.or"} style={{ textAlign: "center", marginTop: 10 }} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity style={$spaces}>
            <Image source={google} style={$icoImage} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={facebook} style={$icoImage} />
          </TouchableOpacity>

        </View>
        <View style={{}}>
          <TouchableOpacity style={$spaces}>
            <Text tx={"loginScreen.signUpGoogle"} size={"sm"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text tx={"loginScreen.signUpFacebook"} size={"sm"} />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={coffee} style={$coffee} />
    </View>
  )
}


const $screenContentContainer: ViewStyle = {
  paddingTop: spacing.massive,
  backgroundColor: colors.palette.neutral100,
  paddingBottom: spacing.massive,
  paddingHorizontal: spacing.large,
  height: "100%",
  width: "100%",
}

const $icoImage: ImageStyle = {
  width: 25, height: 25,
}

const $spaces: ViewStyle = {
  marginBottom: spacing.large,

}

const $coffee: ImageStyle = {
  height: 250,
  width: 250,
  position: "absolute",
  bottom: 0,
  right: 0,
  zIndex: -1,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

