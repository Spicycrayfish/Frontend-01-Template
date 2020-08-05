import {createElement, Text, Wrapper} from './createElement.js';

export class TabPanel {
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

    select(i) {
        for (let view of this.childViews) {
            view.style.display = 'none';
        }
        this.childViews[i].style.display = '';

        for (let view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
        // this.titleView.innerText = this.children[i].title;
    }

    render(){
        this.childViews = this.children.map(child => <div style="width:300px;min-height:100px;">{child}</div>);
        this.titleViews = this.children.map((child, i) => <span onClick={() => this.select(i)} 
            style="background-color:lightgreen;width:300px;min-height:100px;margin:5px;">{child.getAttribute('title')}</span>);

        setTimeout(() => this.select(0), 16);

        let root = <div class="tab-panel" style="border:1px solid purple; width:300px">
            <h1 style="margin:0;width:300px;">{this.titleViews}</h1>
            <div style="border:1px solid lightgreen;">
                {this.childViews}
            </div>
        </div>;
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}