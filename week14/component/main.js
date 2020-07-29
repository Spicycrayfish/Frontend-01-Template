import {createElement, Text, Wrapper} from './createElement.js';
import {Carousel} from "./carousel.view";


class Carousel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
        // this.attributes.set(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        let children = this.data.map(url => {
            let ele = <img src={url} />;
            ele.addEventListener('dragstart', e => e.preventDefault());
            return ele;
        });
        let root = <div class="carousel">
            {children}
        </div>;

        let position = 0;

        let nexPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            // 这里不能有 node 操作，只能改 CSS
            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';

            // 起始位置
            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

            setTimeout(function() {
                current.style.transition = '';      // '' means use css rule
                next.style.transition = '';     // '' means use css rule

                // 终止位置
                current.style.transform = `translateX(${- 100 - 100 * position}%)`;
                next.style.transform = `translateX(${- 100 * nextPosition}%)`;

                position = nextPosition;
            }, 16);
            
            setTimeout(nexPic, 3000);
        }
        setTimeout(nexPic, 3000);


        root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;
            let nextPosition = (position + 1) % this.data.length;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];
            let last = children[lastPosition];

            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';
            last.style.transition = 'ease 0s';

            current.style.transform = `translateX(${- 570 * position}px)`;
            next.style.transform = `translateX(${570 - 570 * nextPosition}px)`;
            last.style.transform = `translateX(${- 570 - 570 * lastPosition}px)`;


            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 570 * position}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 570 - 570 * nextPosition}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 570 - 570 * lastPosition}px)`;
            };
            let up = event => {
                let offset = 0;

                if (event.clientX - startX > 285) {
                    offset = 1;
                } else if (event.clientX - startX < -285) {
                    offset = -1;
                }

                // 将 transition 打开
                current.style.transition = '';
                next.style.transition = '';
                last.style.transition = '';

                current.style.transform = `translateX(${(offset * 570) - 570 * position}px)`;
                next.style.transform = `translateX(${(offset * 570) + 570 - 570 * nextPosition}px)`;
                last.style.transform = `translateX(${(offset * 570) - 570 - 570 * lastPosition}px)`;


                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })

        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }


}


let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.mountTo(document.body);

