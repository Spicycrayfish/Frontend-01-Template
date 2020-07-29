import {createElement, Text, Wrapper} from './createElement.js';

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'

import { enableGesture } from './gesture'


export class Carousel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        let timeline = new Timeline;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;


        let children = this.data.map((url, currentPosition) => {
            let nextPosition = (currentPosition + 1) % this.data.length;
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;

            
            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];

                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 570 * currentPosition;
                
            }
            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let currentTransformValue = - 570 * currentPosition + offset;
                let lastTransformValue = - 570 - 570 * lastPosition + offset;
                let nextTransformValue = 570 - 570 * nextPosition + offset;

                let dx = event.clientX - event.startX;
                lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`;
            }

            let ele = <img src={url} onStart={onStart} onPan={onPan} enableGesture={true} />;
            ele.style.transform = 'translateX(0px)';
            ele.addEventListener('dragstart', e => e.preventDefault());
            return ele;
        });
        let root = <div class="carousel">
            {children}
        </div>;


        let nexPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            // 这里不能有 node 操作，只能改 CSS
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', 
                v => `translateX(${v * 5.7}px)`, - 100 * position, - 100 - 100 * position, 1000, 0, ease);
            let nextAnimation = new Animation(next.style, 'transform', 
                v => `translateX(${v * 5.7}px)`, 100 - 100 * nextPosition, - 100 * nextPosition, 1000, 0, ease);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            position = nextPosition;
            nextPicStopHandler = setTimeout(nexPic, 3000);
        }
        nextPicStopHandler = setTimeout(nexPic, 3000);


        // root.addEventListener("mousedown", event => {
        //     let startX = event.clientX, startY = event.clientY;
        //     let nextPosition = (position + 1) % this.data.length;
        //     let lastPosition = (position - 1 + this.data.length) % this.data.length;

        //     let current = children[position];
        //     let next = children[nextPosition];
        //     let last = children[lastPosition];

        //     current.style.transition = 'ease 0s';
        //     next.style.transition = 'ease 0s';
        //     last.style.transition = 'ease 0s';

        //     current.style.transform = `translateX(${- 570 * position}px)`;
        //     next.style.transform = `translateX(${570 - 570 * nextPosition}px)`;
        //     last.style.transform = `translateX(${- 570 - 570 * lastPosition}px)`;


        //     let move = event => {
        //         current.style.transform = `translateX(${event.clientX - startX - 570 * position}px)`;
        //         next.style.transform = `translateX(${event.clientX - startX + 570 - 570 * nextPosition}px)`;
        //         last.style.transform = `translateX(${event.clientX - startX - 570 - 570 * lastPosition}px)`;
        //     };
        //     let up = event => {
        //         let offset = 0;

        //         if (event.clientX - startX > 285) {
        //             offset = 1;
        //         } else if (event.clientX - startX < -285) {
        //             offset = -1;
        //         }

        //         // 将 transition 打开
        //         current.style.transition = '';
        //         next.style.transition = '';
        //         last.style.transition = '';

        //         current.style.transform = `translateX(${(offset * 570) - 570 * position}px)`;
        //         next.style.transform = `translateX(${(offset * 570) + 570 - 570 * nextPosition}px)`;
        //         last.style.transform = `translateX(${(offset * 570) - 570 - 570 * lastPosition}px)`;


        //         position = (position - offset + this.data.length) % this.data.length;

        //         document.removeEventListener("mousemove", move);
        //         document.removeEventListener("mouseup", up);
        //     };
        //     document.addEventListener("mousemove", move);
        //     document.addEventListener("mouseup", up);
        // })

        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }


}