import {createElement, Text, Wrapper} from './createElement.js';

// import { Timeline, Animation } from './animation'
// import { ease } from './cubicBezier'
// import { enableGesture } from './gesture'


export class ListView {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }
    getAttribute(name, value) { //attribute
        return this[name];
    }

    appendChild(child){
        this.children.push(child);
    }
    render() {
        let data = this.getAttribute('data');
        let root = <div class="list-view" style="border:1px solid purple;">
            {
                data.map(this.children[0])
            }
        </div>;
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}