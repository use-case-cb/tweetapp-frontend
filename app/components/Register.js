import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"

function Register(props) {
  const nav = useNavigate()

  async function postRegister(e) {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:8080/register", {
        username: formValues.username,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        number: formValues.number,
        password: formValues.password
      })
      console.log("User created")
    } catch (e) {
      console.log("Error creating user")
      console.log(e)
    }
  }

  const initialValues = { username: "", firstName: "", lastName: "", email: "", number: "", password: "", confirmPassword: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = e => {
    setFormErrors(validate(formValues))
    setIsSubmit(true)
    postRegister(e)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors])

  const validate = values => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format"
    }
    if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters"
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match"
      console.log("passwords did not match")
    }
    return errors
  }

  return (
    <Page>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1">
            <small>
              Username <small className="text-danger">{formErrors.username}</small>
            </small>
          </label>
          <input onChange={handleChange} id="username-register" name="username" className="form-control" type="text" placeholder="Create a username" autoComplete="off" required />
        </div>

        <div className="form-group">
          <label htmlFor="firstName-register" className="text-muted mb-1">
            <small>
              First Name <small className="text-danger">{formErrors.firstName}</small>
            </small>
          </label>
          <input onChange={handleChange} id="firstName-register" name="firstName" className="form-control" type="text" placeholder="Enter first name" autoComplete="off" required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName-register" className="text-muted mb-1">
            <small>Last Name</small>
          </label>
          <input onChange={handleChange} id="lastName-register" name="lastName" className="form-control" type="text" placeholder="Enter last name" autoComplete="off" required />
        </div>

        <div className="form-group">
          <label htmlFor="email-register" className="text-muted mb-1">
            <small>Email</small>
          </label>
          <input onChange={handleChange} id="email-register" name="email" className="form-control" type="text" placeholder="Enter an email" autoComplete="off" required />
        </div>

        <div className="form-group">
          <label htmlFor="number-register" className="text-muted mb-1">
            <small>Contact Number</small>
          </label>
          <input onChange={handleChange} id="number-register" name="number" className="form-control" type="text" placeholder="Enter a contact number" required />
        </div>

        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input onChange={handleChange} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password-register" className="text-muted mb-1">
            <small>
              Confirm Password <small className="text-danger">{formErrors.confirmPassword}</small>
            </small>
          </label>
          <input onChange={handleChange} id="confirmPassword-register" name="confirmPassword" className="form-control" type="password" placeholder="Create a password" required />
        </div>
        <button type="submit" onClick={() => nav(-1)} className="py-3 mt-4 btn btn-lg btn-success btn-block">
          Sign up
        </button>
      </form>
    </Page>
  )
}

export default Register
