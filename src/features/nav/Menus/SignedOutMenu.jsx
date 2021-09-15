import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

const SignedOutMenu = ({signIn, register}) => {
  return (
    <Menu.Item position="right">
    <Button color="green" onClick={signIn}  content="Login" />
    <Button
      color="green"
      onClick={register}
      content="Register"
      style={{ marginLeft: '0.5em' }}
    />
  </Menu.Item>
  )
}

export default SignedOutMenu
