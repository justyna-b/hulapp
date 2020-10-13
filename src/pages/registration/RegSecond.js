import React from 'react'
import AutoComplete from '../../components/Autocomplete'

class RegSecond extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      country: '',
      city: '',
      isCityName: false,
      isCountryName: false,
      errors: {
        name: 'nie może być puste',
        surname: 'nie może być puste'
      }
    }
  }

  componentDidMount () {
    if (this.props.value.name.length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          name: ''
        }
      }))
    }
    if (this.props.value.surname.length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          surname: ''
        }
      }))
    }

    if (
      this.props.value.name.length > 0 &&
      this.props.value.surname.length > 0
    ) {
      this.props.onValidated(true)
    } else {
      this.props.onValidated(false)
    }
  }

  handleChange = event => {
    this.props.onChange(event)
    const { name, value } = event.target
    let errors = this.state.errors
    switch (name) {
      case 'name':
        errors.name = value.length > 0 ? '' : 'Uzupełnij to pole!'
        break
      case 'surname':
        errors.surname = value.length > 0 ? '' : 'Uzupełnij to pole'
        break
      default:
        break
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
    this.props.onValidated(this.validate())
  }

  handleCityChange = val => {
    this.setState({
      city: val,
      isCityName: true
    })
  }

  handleCountryChange = val => {
    this.setState({
      country: val,
      isCountryName: true
    })
  }

  handleSelect = event => {
    this.props.onSelect(event)
  }

  validate = () => {
    return (
      this.state.errors.name.length === 0 &&
      this.state.errors.surname.length === 0
    )
  }
  render () {
    return (
      <div>
        <div className='registration-container u-center-text'>
          <form>
            <div>
              <input
                className='registration-container__input--data'
                placeholder='imię'
                name='name'
                onChange={this.handleChange}
                value={this.props.value.name}
                required
              />
            </div>
            <div>
              <input
                className='registration-container__input--data'
                placeholder='nazwisko'
                name='surname'
                onChange={this.handleChange}
                value={this.props.value.surname}
                required
              />
            </div>
            <div className='registration-container__input--select'>
              <AutoComplete
                controlId='formBasicCity'
                label='miasto'
                dest='cities'
                name='city'
                required='true'
                onSelect={this.handleSelect}
                value={
                  this.props.value.cityName > 0
                    ? this.props.value.cityName
                    : 'miasto'
                }
                defVal='miasto'
                
              />
            </div>
            <div className='registration-container__input--select'>
              <AutoComplete
                controlId='formBasicCountry'
                label='Kraj'
                dest='countries'
                name='countryId'
                required='true'
                value={this.props.value.country}
                defVal={
                  this.state.countryName > 0
                    ? this.props.value.countryName
                    : 'kraj'
                }
                onSelect={this.handleSelect}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegSecond
