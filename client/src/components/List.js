import React from 'react';

class List extends React.Component {
  constructor(props) {
    // console. : log('construc', props);
    super(props);
    this.state = {
      auth: {},
      global: {},
    };
  }

  componentDidMount() {
    this.props.global.getItems();
    console.log('mount', this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.global.items !== this.props.global.items) {
      console.log('pokemons state has changed.');
      this.setState({ global: this.props.global });
    }
  }
  render() {
    const { items } = this.state.global;

    console.log('render', this.state.global);
    return <>{items ? items.map((item) => <p>{item.name}</p>) : null}</>;
  }
}

export default List;
