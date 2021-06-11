import React from 'react';
import catLogo from './manx-cat.svg';


class Cat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseX: 0,
            mouseY: 0,
            trailingX: 0,
            trailingY: 0,
        };
        this.cursor = React.createRef();
        this.cursorTrailing = React.createRef();
        this.animationFrame = null;
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        this.moveCursor();
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove)
        cancelAnimationFrame(this.animationFrame);
        alert("eat me")
    }

    onMouseMove = (evt) => {
        const { clientX, clientY } = evt;
        this.setState({
            mouseX: clientX,
            mouseY: clientY,
        });

    }

    moveCursor = () => {
        const { mouseX, mouseY, trailingX, trailingY } = this.state;
        const diffX = mouseX - trailingX;
        const diffY = mouseY - trailingY;
        //  speed animation
        this.setState({
                trailingX: trailingX + diffX / 35,
                trailingY: trailingY + diffY / 35,
            },
            () => {
                this.cursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                this.cursorTrailing.current.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
                this.animationFrame = requestAnimationFrame(this.moveCursor);
            });
    }

    render = () => {
        return (
            <div className="container">
                <div className="cursors">
                    <div
                        className="cursor"
                        ref={this.cursor}
                    />
                    <div
                        className='cursor'
                        ref={this.cursorTrailing}
                    >   <img src={catLogo} alt="cat"/>
                    </div>
                </div>
            </div>
        );
    };
}


export default Cat