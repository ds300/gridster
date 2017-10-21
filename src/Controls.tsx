import * as React from 'react'
import styled from 'styled-components'

const FormElement = styled.input`
  border-radius: 4px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, 0.1);
  height: 33px;
  box-sizing: border-box;
`

const StyledInput = styled(FormElement)`
  border: 1px solid #dadada;
  width: 54px;
  text-align: center;
  font-size: 1em;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 0.85em;
`

class IntegerInput extends React.Component<{
  value: number
  label: string
  onChange(num: number): void
}> {
  onUserInput = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement
    const newValue = target.value as string
    const sanitized = Math.max(
      Math.min(Number((newValue.match(/\d+/) || ['0'])[0]), 20),
      3,
    )
    this.props.onChange(sanitized)
    target.value = String(sanitized)
  }

  render() {
    const { label, value } = this.props
    return (
      <InputWrapper>
        <Label htmlFor={label}>{label}</Label>
        <StyledInput
          type="text"
          name={label}
          defaultValue={String(value)}
          onBlur={this.onUserInput}
        />
      </InputWrapper>
    )
  }
}

const Button = styled(FormElement.withComponent('button'))`
  outline: none;
  border: none;
  color: white;
  background-color: #4a90e2;
  align-self: flex-end;
  font-size: 0.8em;
  margin-left: 25px;
  padding: 0 18px;
  cursor: pointer;

  &:hover {
    background-color: #76b5ff;
  }
  &:active {
    background-color: #235896;
  }
`

const ControlsWrapper = styled.div`
  color: #666;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-bottom: 25px;
  padding: 15px 30px;
  display: flex;
`

const XWrapper = styled.div`
  padding: 15px;
  display: flex;
  height: 33px;
  align-items: center;
  box-sizing: border-box;
  align-self: flex-end;
`

export default class Controls extends React.Component {
  state = {
    rows: 10,
    columns: 10,
  }

  render() {
    return (
      <ControlsWrapper>
        <IntegerInput
          label={'Rows'}
          value={this.state.rows}
          onChange={rows => this.setState({ rows })}
        />
        <XWrapper>x</XWrapper>
        <IntegerInput
          label={'Columns'}
          value={this.state.columns}
          onChange={columns => this.setState({ columns })}
        />
        <Button>Generate</Button>
      </ControlsWrapper>
    )
  }
}
