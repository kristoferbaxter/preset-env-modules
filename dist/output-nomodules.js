var x = function x(input) {
  return input * 2;
};

var Foo =
/*#__PURE__*/
function () {
  function Foo(text) {
    this.text = text;
  }

  var _proto = Foo.prototype;

  _proto.print = function print() {
    console.log(this.text);
  };

  return Foo;
}();
