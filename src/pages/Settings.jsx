import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Constants
import { themes } from '../constants/defaultThemes.json'

// Components
import Form from '../components/Forms/Form'

// Contexts
import Account from '../contexts/AccountContext'
import ToastNotif from '../contexts/ToastNotifContext'

// API
import { updateUser, login } from '../api/user'
import validatePassword from '../utils/validatePassword'
import Spinner from '../atoms/Loaders/Spinner'

const Settings = () => {
  const { userData, localAuth, setUserData, AuthLogout } = useContext(Account)
  const SendToast = useContext(ToastNotif)
  const [selectedPage, setSelectedPage] = useState('settings.loading')

  const [newData, setNewData] = useState({ ...userData, password: null })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (userData != null && userData !== 'none') setNewData(userData)
  }, [userData])

  const switchSettingsPage = (e) => {
    setSelectedPage(e.target.id)
  }

  const updateTheme = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        settings: {
          ...prev.settings,
          selectedTheme: e.target.value
        }
      }
    })
    setNewData((prev) => {
      return {
        ...prev,
        settings: {
          ...prev.settings,
          selectedTheme: e.target.value
        }
      }
    })
  }

  const saveUserSettings = () => {
    const SaveUserDataPromise = new Promise(async (resolve, reject) => {
      const {
        email,
        currentPassword,
        newPassword,
        confirmNewPassword,
        ...dataToUpdate
      } = newData

      if (email?.trim() !== userData?.email?.trim())
        if (
          window.confirm(
            'Changing your email will require you to login again, make sure to remember your password!'
          )
        )
          dataToUpdate['email'] = email

      // Attemping to update password
      if (newData?.currentPassword?.trim()) {
        if (
          newData?.newPassword?.trim() &&
          newData?.confirmNewPassword?.trim()
        ) {
          const isCurrentPasswordValid = validatePassword(
            newData.currentPassword
          )
          const isNewPasswordValid = validatePassword(newData.newPassword)
          if (isCurrentPasswordValid === true && isNewPasswordValid === true) {
            const loginResult = await login(
              userData.email,
              newData.currentPassword
            )
            if (loginResult.status === 200) {
              // Correct Password
              if (newPassword?.trim() === confirmNewPassword?.trim()) {
                // Update password
                if (
                  window.confirm(
                    'Updating your password will require you to log in again!'
                  )
                ) {
                  dataToUpdate['currentPassword'] = currentPassword
                  dataToUpdate['newPassword'] = newPassword
                }
              } else {
                // Password does not match
                setErrors((prev) => {
                  return {
                    ...prev,
                    confirmNewPassword: 'Password does not match!'
                  }
                })
              }
            } else {
              // Incorrect Password
              setErrors((prev) => {
                return { ...prev, currentPassword: 'Incorrect password!' }
              })
            }
          } else {
            setErrors((prev) => {
              return {
                ...prev,
                currentPassword:
                  isCurrentPasswordValid === true
                    ? null
                    : isCurrentPasswordValid,
                newPassword:
                  isNewPasswordValid === true ? null : isNewPasswordValid
              }
            })
          }
        } else {
          setErrors((prev) => {
            return {
              ...prev,
              newPassword: !newData?.newPassword
                ? 'Missing new password!'
                : null,
              confirmNewPassword: !newData?.confirmNewPassword
                ? 'Password does not match!'
                : null
            }
          })
        }
      }

      const result = await updateUser(localAuth, dataToUpdate)

      // Request for user data failed
      if (result.isMissing || result?.status !== 200) {
        return reject('Failed to update user data!')
      }

      if (dataToUpdate['email'] || dataToUpdate['newPassword']) {
        AuthLogout()
        return resolve()
      }

      // So I think that im going to make it so when you go to change your password
      // It will ask for your current password, and confirm your new password twice
      // Then I will make it so it ATTEMPTS to log in with your current email/password, and if it succeeds, update your password
      // It will prioritize updating all other items before it updates password, as password/email required a relogin

      setUserData(result.data.newUser)
      resolve('User Found!')
    })

    SendToast(
      {
        promise: SaveUserDataPromise,
        pending: 'Updating your data...',
        error: 'Failed to update!',
        success: 'Successfully updated!'
      },
      'promise'
    )
  }

  const handleTextboxChange = (e) => {
    setNewData((prev) => {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: null }
      })
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <SpacerDiv>
      <SettingsHeader>Settings</SettingsHeader>
      <ContentWrapper>
        <Sidebar>
          <SidebarItem onClick={switchSettingsPage} id="settings.account">
            Account
          </SidebarItem>
          <SidebarItem onClick={switchSettingsPage} id="settings.appearance">
            Appearance
          </SidebarItem>
          <SidebarItem onClick={switchSettingsPage} id="settings.security">
            Security
          </SidebarItem>
        </Sidebar>
        {selectedPage === 'settings.loading' && (
          <SettingsWindow>
            <Spinner height='50px'/>
            {newData?._id && setSelectedPage('settings.account')}
          </SettingsWindow>
        )}
        {selectedPage === 'settings.account' && (
          <SettingsWindow>
            <SettingHeader>Account</SettingHeader>
            <SettingDivider />
            <InputGroup>
              <SettingTitle>Name</SettingTitle>
              <SettingTextbox
                name="name"
                onChange={handleTextboxChange}
                value={newData?.name || ''}
              />
            </InputGroup>
            <InputGroup>
              <SettingTitle>Email</SettingTitle>
              <SettingTextbox
                name="email"
                onChange={handleTextboxChange}
                value={newData?.email || ''}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <UpdateButton onClick={saveUserSettings}>Save</UpdateButton>
            </InputGroup>
            <br />
            <SettingDivider />
            <SettingTitle>
              User ID:{' '}
              <BlurredText
                onClick={() => {
                  // This shows an error in codesandbox, but works fine in a new window
                  // Its the iframe security policy for the Clipboard API, dont worry about
                  navigator.clipboard.writeText(userData._id)
                  SendToast('Copied your ID to clipboard!', 'info')
                }}>
                {userData._id}
              </BlurredText>
            </SettingTitle>
          </SettingsWindow>
        )}
        {selectedPage === 'settings.appearance' && (
          <SettingsWindow>
            <SettingHeader>Appearance</SettingHeader>
            <SettingDivider />
            <InputGroup>
              <SettingTitle>Theme</SettingTitle>
              <ThemeChooser
                onChange={updateTheme}
                value={userData?.settings?.selectedTheme}>
                {themes.map((theme) => {
                  return (
                    <option value={theme.themeID} key={uuidv4()}>
                      {theme.name}
                    </option>
                  )
                })}
              </ThemeChooser>
              <br />
              <InputGroup>
                <UpdateButton onClick={saveUserSettings}>Save</UpdateButton>
              </InputGroup>
            </InputGroup>
          </SettingsWindow>
        )}
        {selectedPage === 'settings.security' && (
          <SettingsWindow>
            <SettingHeader>Security</SettingHeader>
            <SettingDivider />
            <InputGroup>
              <SettingTitle>Current Password</SettingTitle>
              <SettingTextbox
                name="currentPassword"
                type="password"
                onChange={handleTextboxChange}
                value={newData?.currentPassword || ''}
              />
              {errors.currentPassword && (
                <ErrorMessage>{errors.currentPassword}</ErrorMessage>
              )}

              <SettingTitle>New Password</SettingTitle>
              <SettingTextbox
                name="newPassword"
                type="password"
                onChange={handleTextboxChange}
                value={newData?.newPassword || ''}
              />
              {errors.newPassword && (
                <ErrorMessage>{errors.newPassword}</ErrorMessage>
              )}

              <SettingTitle>Confirm New Password</SettingTitle>
              <SettingTextbox
                name="confirmNewPassword"
                type="password"
                onChange={handleTextboxChange}
                value={newData?.confirmNewPassword || ''}
              />
              {errors.confirmNewPassword && (
                <ErrorMessage>{errors.confirmNewPassword}</ErrorMessage>
              )}
            </InputGroup>
            <br />
            <InputGroup>
              <UpdateButton onClick={saveUserSettings}>Save</UpdateButton>
            </InputGroup>
          </SettingsWindow>
        )}
      </ContentWrapper>
    </SpacerDiv>
  )
}

const SpacerDiv = styled.div`
  margin: 4em auto;
  max-width: 1000px;
  width: 80%;

  @media only screen and (max-width: 650px) {
    max-width: auto;
    width: 90%;
  }
`

const SettingsHeader = styled.p`
  font-size: 2em;
  margin: 0;
  text-indent: 0.5em;

  color: ${(props) => props.theme.secondaryForeground};
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

const Sidebar = styled.div`
  margin-top: 1em;
  padding-right: 1em;
  border-right: 2px solid ${(props) => props.theme.tertiaryBackground};
`

const SidebarItem = styled.button`
  border: none;
  background-color: ${(props) => props.theme.tertiaryBackground};
  color: ${(props) => props.theme.secondaryForeground};
  padding: 0.5em 1em;
  width: 100%;
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 0 1px 1px #555;
  cursor: pointer;

  transition: filter 250ms ease-out;

  &:hover {
    filter: brightness(0.9);
  }

  margin-bottom: 5px;
`

const SettingsWindow = styled.div`
  margin: 1em 0 0 1em;
`

const InputGroup = styled.div`
  margin-left: 0.5em;
`

const SettingHeader = styled.p`
  font-size: 1.5em;
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};
`

const SettingDivider = styled.div`
  height: 2px;
  background-color: ${(props) => props.theme.tertiaryBackground};
  filter: blur(1px);
  margin: 0.5em;
`

const SettingTextbox = styled(Form.Text)``

const SettingTitle = styled.p`
  margin: 1em 0 0.3em 0;
  color: ${(props) => props.theme.tertiaryForeground};
`

const UpdateButton = styled(Form.Button)``

const BlurredText = styled.span`
  filter: blur(3px);
  transition: filter 250ms ease-out;
  cursor: pointer;
  &:hover {
    filter: blur(0);
  }
`

const ErrorMessage = styled.p`
  margin-left: 1em;
  margin-top: 0.5em;
  color: ${(props) => props.theme.error};
  font-size: 14px;
`

const ThemeChooser = styled.select`
  display: block;
  max-width: 500px;
  width: 50%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => props.theme.foreground};
  background-color: ${(props) => props.theme.inputBackground};
  appearance: none;
  border-radius: 0.5rem;

  ::placeholder {
    color: ${(props) => props.theme.muted};
  }

  border-width: 0;
  outline: 0;
  margin-left: 7px;
  margin-right: 10px;
`

export default Settings
