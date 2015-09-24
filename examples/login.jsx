var React = require('react/addons');
var Register = require('./pages/login/index.jsx');
var {Link} = require('react-router');

function generateVariant(propsets) {
  var props = Object.keys(propsets);
  var variation = {};
  props.forEach(prop => {
    var variants = propsets[prop];
    variation[prop] = variants[Math.floor(Math.random() * (variants.length))];
  });
  return variation;
}

var variants = {
  showLabels: [true, false],
  signUpMessage: ['登录', '登录', '登录', '登录'],
  buttonColor: ['#00BE94', '#69A0FC']
};



module.exports = React.createClass({

  getInitialState: function () {
    return {
      variants: generateVariant(variants)
    };
  },

  refreshTest: function (e) {
    e.preventDefault();
    this.setState({variants: generateVariant(variants)});
  },

  render: function () {
    return (
      <div className="home">
        <Register {...this.state.variants} />
      </div>);
  }
});
