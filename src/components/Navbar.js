import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div>
      <Menu
      inverted
      borderless
      attached
      style={{padding:"0.4rem"}}>
        <Container>
            <MenuItem>
                <h2>React Firebase</h2>  
            </MenuItem>
            <MenuItem position='right'>
                <Button size='mini' primary onClick={()=>
                    navigate("/add")
                }>Add User</Button>
            </MenuItem>
        </Container>
      </Menu>
    </div>
  )
}

export default Navbar
