import React from 'react';

//import React, {Component} from 'react';

// class Like extends Component {
//     render() {
//         let classes = "fa fa-heart";
//         if (!this.props.liked) {
//             classes += "-o";
//         }
//         return <i
//             onClick={this.props.onClick}
//             style={{cursor: "pointer"}}
//             className={classes}
//             aria-hidden="true"
//         />;
//     }
// }


// export default Like;


// or using stateless functional component
const Like = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked) {
        classes += "-o";
    }
    return <i
        onClick={props.onClick}
        style={{cursor: "pointer"}}
        className={classes}
        aria-hidden="true"
    />;
};


export default Like;