import {createElement, Text, Wrapper} from './createElement.js';

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'

import { enableGesture } from './gesture'


export class Panel {
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
        let root = <div class="panel">
            <h1 style="background-color:lightgreen;width:300px;">{this.title}</h1>
            <div>
                {this.children}
            </div>
        </div>;
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}