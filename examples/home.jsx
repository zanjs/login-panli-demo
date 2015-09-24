var React = require('react/addons');
var Login = require('./pages/login/index.jsx');
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
  signUpMessage: ['注册', '注册', '注册', '注册'],
  buttonColor: ['#00BE94', '#69A0FC']
};

var GithubLink = React.createClass({
  render: function () {
    return (<iframe
      className="gh-star" src="https://ghbtns.com/github-btn.html?user=k88hudson&repo=react-formation&type=star&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="160px"
      height="30px"></iframe>);
  }
});

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
        <Login {...this.state.variants} />
      </div>);
  }
});
