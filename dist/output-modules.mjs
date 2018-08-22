const x = input => input * 2;

class Foo {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createTextNode(`Are modules supported?: ${"yes"}`));
});
