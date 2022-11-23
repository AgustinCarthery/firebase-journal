import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"

//mock providers
jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('Debe de invocar el checkingCredentials', async () => {

    //retorno promesa
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {
    const loginData = { ok: true, ...demoUser }

    //providers ya mockeados
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))

  })

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
    const wrongData = { ok: false, errorMessage: 'Google error' }

    await signInWithGoogle.mockResolvedValue(wrongData)

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(wrongData.errorMessage))

  })

  test('startLoginWithEmailPassword debe llamar checkingCredentials y login', async () => {

    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));

  })

  test('startLoginWithEmailPassword debe llamar checkingCredentials y logout - Error', async () => {

    const loginData = { ok: false, errorMessage: 'Google error' }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

  })

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login', async () => {
    const signInData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

    await registerUserWithEmailPassword.mockResolvedValue(signInData)

    await startCreatingUserWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));

  })

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})