import React from 'react'

class RegFirst extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      repeatedPassword: '',
      message: '',
      next: false,
      //space should be, because if it is empty in stepper next step is active
      //bad approach in case we have just email filled and no password
      errors: {
        repeatedPassword: '  ',
        email: '  ',
        password: '  '
      }
    }
  }

  componentDidMount () {
    if (this.props.value.email.length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          email: ''
        }
      }))
    }
    if (this.props.value.password.length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: ''
        }
      }))
    }
  }

  //when change in input occure validate data
  //password must be >8 signs whid special letters
  handleChange = event => {
    this.props.onChange(event)
    const { name, value } = event.target
    let errors = this.state.errors
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )

    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value)
          ? ''
          : 'To nie jest poprawny email'
        this.setState({ next: true })

        break
      case 'password':
        this.setState({ next: true })

        errors.password = value.length < 8 ?
            'Hasło musi zawierać conajmniej 8 znaków w tym znaki specjalne'
            : ''
        break
      case 'repeatedPassword':
        this.setState({ next: true })

        errors.repeatedPassword = value !== this.props.value.password ?
            'Podane hasła muszą być identyczne'
            : ''
        break
      default:
        break
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
    this.props.onValidated(this.validate())
  }

  validate = () => {
    return (
      this.state.errors.email.length === 0 &&
      this.state.errors.password.length === 0 &&
      this.state.errors.repeatedPassword.length === 0
    )
  }

  checkPassword = event => {
    if (
      event.target.value &&
      event.target.value !== this.props.value.password
    ) {
      event.target.style.background = 'red'
      event.target.style.border = '1px solid red'
      this.setState({ match: false })
    } else {
      event.target.style.background = 'white'
      this.setState({ match: true })
    }
  }

  render () {
    return (
      <div className='registration-container'>
        <form>
          <div className='registration-container__input u-center-text'>
            <div>
              {this.state.next ? <div>{this.state.errors.email}</div> : ''}
              <input
                className='registration-container__input--data'
                type='email'
                placeholder='email'
                name='email'
                value={this.props.value.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              {this.state.next ? <div>{this.state.errors.password}</div> : ''}
              <input
                className='registration-container__input--data'
                type='password'
                placeholder='hasło'
                name='password'
                onChange={this.handleChange}
                value={this.props.value.password}
                required
              />
            </div>
            <div>
              <input
                className='registration-container__input--data'
                type='password'
                placeholder='powtórz hasło'
                name='repeatedPassword'
                onBlur={this.checkPassword}
                value={this.props.value.repeatedPassword}
                onChange={this.handleChange}
                required
              />
              {this.state.next ? (
                <div>{this.state.errors.repeatedPassword}</div>
              ) : (
                ''
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RegFirst
