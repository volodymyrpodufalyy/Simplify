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

const welcome = require("../../assets/images/WelcomeBack.png")
const google = require("../../assets/images/google.png")
const book = require("../../assets/images/book.png")
const facebook = require("../../assets/images/facebook.png")

export const SignInScreen = ({ navigation }) => {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")

  function login() {
    console.log("login")
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


  return (
    <View style={$screenContentContainer}>


      <View style={{ alignItems:'center'}}>
        <Image source={welcome} style={$welcomeImage}/>
        <Text tx={"loginScreen.welcomeBack"} size={"xll"} style={{ textAlign: "center" }} />
      </View>
      <View>

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          // helper={errors?.authEmail}
          // status={errors?.authEmail ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          // helper={errors?.authPassword}
          // status={errors?.authPassword ? "error" : undefined}
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />

        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />
      </View>
      <Text tx={"loginScreen.or"} style={{ textAlign: "center", marginTop: 10 }} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity style={$spaces}>
            <Image source={google} style={$icoImage} />
          </TouchableOpacity>
          <TouchableOpacity style={$spaces}>
            <Image source={facebook} style={$icoImage} />
          </TouchableOpacity>

        </View>
        <View style={{}}>
          <TouchableOpacity style={$spaces}>
            <Text tx={"loginScreen.signInGoogle"} size={"sm"} />
          </TouchableOpacity>
          <TouchableOpacity style={$spaces}>
            <Text tx={"loginScreen.signInFacebook"} size={"sm"} />
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity  onPress={() => navigation.navigate("SignUp")}>
        <Text tx={"loginScreen.iNotAccount"} size={"md"}
              style={{ textAlign: "center", color: colors.palette.secondary500 }} />
      </TouchableOpacity>
      <Image source={book} style={$coffee} />
    </View>
  )
}


const $screenContentContainer: ViewStyle = {
  paddingTop: 0,
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
  marginBottom: spacing.medium,

}

const $coffee: ImageStyle = {
  height: 150,
  width: 150,
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: -1,
}
const $welcomeImage: ImageStyle = {
  height: 200,
  width: 300,

  zIndex: -1,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

