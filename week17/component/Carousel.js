import {createElement, Text, Wrapper} from './createElement.js';

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'

import { enableGesture } from './gesture'

import css from './carousel.css';

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
                let dx = event.clientX - event.startX;

                let currentTransformValue = - 570 * currentPosition + offset + dx;
                let lastTransformValue = - 570 - 570 * lastPosition + offset + dx;
                let nextTransformValue = 570 - 570 * nextPosition + offset + dx;

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            }
            let onPanend = event => {
                let direction = 0;
                let dx = event.clientX - event.startX;

                console.log('flick,', event.isFlick);

                if (dx + offset > 285 || (dx > 0 && event.isFlick )) {
                    direction = 1;
                } else if (dx + offset < -285 || (dx < 0 && event.isFlick )) {
                    direction = -1;
                }

                timeline.reset();
                timeline.start();

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', v => `translateX(${v}px)`,
                     - 570 - 570 * lastPosition + offset + dx, - 570 - 570 * lastPosition + direction * 570, 1000, 0, ease);
                let currentAnimation = new Animation(currentElement.style, 'transform', v => `translateX(${v}px)`,
                     - 570 * currentPosition + offset + dx, - 570 * currentPosition + direction * 570, 1000, 0, ease);
                let nextAnimation = new Animation(nextElement.style, 'transform', v => `translateX(${v}px)`,
                     570 - 570 * nextPosition + offset + dx, 570 - 570 * nextPosition + direction * 570 , 1000, 0, ease);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;
                nextPicStopHandler = setTimeout(nexPic, 3000);
            }

            let ele = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />;
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
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}