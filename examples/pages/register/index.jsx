var React = require('react/addons');
var Formation = require('../../../src/form');

var CreateForm = Formation.CreateForm;
var SubmitButton = Formation.SubmitButton;
var ErrorMessage = Formation.ErrorMessage;

var zxcvbn = require('zxcvbn');
var classnames = require('classnames');

var Form = CreateForm({
  getSchema: function () {
    return {
      username: {
        required: true,
        label: '用户名',
        type: function (val) {
          if (/^[a-zA-Z0-9\-]{3,20}$/.test(val)) return false;
          return '必须是3-20个字符，只能用“ - ”和字母数字符号';
        }
      },
      email: {
        required: true,
        label: '邮箱',
        type: 'email'
      },
      password: {
        required: true,
        label: '密码',
        type: function (val) {
          if (val && zxcvbn(val).score > 0) return false;
          return '密码 不够安全';
        },
      },
      subscribe: {
        type: 'boolean'
      }
    }
  },

  getInitialState: function () {
    return {
      blurred: {}
    };
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  onBlur: function (field) {
    return () => {
      var blurred = this.state.blurred;
      blurred[field] = true;
      this.setState({blurred});
    }
  },
  getPassStrength: function () {
    return this.state.password ? zxcvbn(this.state.password).score : -1;
  },
  passStrengthStrings: ['不够安全', '比较弱', '一般', '很好', '很棒了'],

  render: function () {
    var passStrength = this.getPassStrength();
    return (<form className="login-eg animated fadeInUp">

      <div className="body">
        <div className="form-group">
          <label hidden={!this.props.showLabels}>用户名</label>
          <input placeholder={this.props.showLabels ? '' : '用户名'} type="text" onBlur={this.onBlur('username')} valueLink={this.linkField('username')} />
          <ErrorMessage show={this.state.blurred.username} field="username" />
        </div>

        <div className="form-group">
          <label hidden={!this.props.showLabels}>邮箱</label>
          <input placeholder={this.props.showLabels ? '' : '邮箱'} type="text" onBlur={this.onBlur('email')} valueLink={this.linkField('email')} />
          <ErrorMessage show={this.state.blurred.email} field="email" />
        </div>

        <div className="form-group">
          <label hidden={!this.props.showLabels}>密码</label>
          <input placeholder={this.props.showLabels ? '' : '密码'} type="password" name="password" onBlur={this.onBlur('password')} valueLink={this.linkField('password')} />
          <div className={'password-strength strength-' + passStrength}>
            {passStrength >= 0 && this.passStrengthStrings[passStrength]}
            <span className="indicator" style={{width: ((passStrength + 1) * 20) + '%'}} />
          </div>
          <ErrorMessage show={this.state.blurred.password} field="password" />
        </div>
      </div>

      <div className="submit-footer">
        <SubmitButton style={{backgroundColor: this.props.buttonColor}} >{this.props.signUpMessage || '注册'}</SubmitButton>
      </div>
    </form>);
  }
});

module.exports = Form;
