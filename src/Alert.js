import {React, Component} from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            background: this.background
            
            
        };
    }
    render() {
        return (
            <div className="alert">
                <p style={this.getStyle()}>{this.props.text} </p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#03045e';
        this.background = '#caf0f8'
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = '#7c193d';
      this.background = '#fad2e1';
    }
  }


class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ff892f';
        this.background = '#ffe6d3'
    }
}

export {InfoAlert, ErrorAlert, OfflineAlert};
