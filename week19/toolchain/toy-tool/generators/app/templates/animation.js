// export class Timeline {
//     constructor() {
//         this.animations = [];
//         this.requestID = null;
//         this.state = 'inited';
//         this.tick = () => {
//             let t = Date.now() - this.startTime;
//             console.log(t)
//             let animations = this.animations.filter(animation => !animation.finished);

//             for (let animation of animations) {
//                 let {object, template, property, start, end, duration, delay, addTime, timingFunction} = animation;
                
//                 if (t < delay + addTime) {
//                     continue;
//                 }
//                 let progression = timingFunction((t - delay - addTime) / duration);    // 0~1之间的数

//                 if (t > duration + delay + addTime) {
//                     progression = 1;
//                     animation.finished = true;
//                 }

//                 let value = animation.valueFromProgression(progression);

//                 object[property] = template(value);
//             }
//             if (true || animations.length)
//                 this.requestID = requestAnimationFrame(this.tick);
//         }
//     }

//     pause() {
//         if (this.state !== 'playing') {
//             return;
//         }
//         this.state = 'paused';
//         this.pauseTime = Date.now();
//         if (this.requestID !== null) {
//             cancelAnimationFrame(this.requestID);
//         }
//     }

//     resume() {
//         if (this.state !== 'paused') {
//             return;
//         }
//         this.state = 'playing';
//         this.startTime += Date.now() - this.pauseTime;
//         this.tick();
//     }

//     start() {
//         if (this.state !== 'inited') {
//             return;
//         }
//         this.state = 'playing';
//         this.startTime = Date.now();
//         this.tick();
//     }

//     restart() {
//         if (this.state === 'playing') {
//             this.pause();
//         }
//         this.animations = [];
//         this.requestID = null;
//         this.state = 'playing';
//         this.startTime = Date.now();
//         this.pauseTime = null;
//         this.tick();
//     }

//     add(animation, addTime) {
//         animation.finished = false;
//         if (this.state === 'playing') {
//             animation.addTime = addTime !== void 0 ? addTime : (Date.now() - this.startTime);
//         } else {
//             animation.addTime = addTime !== void 0 ? addTime : 0;
//         }
//         this.animations.push(animation);
//     }
// }

export class Timeline {
    constructor() {
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        this.requestID = null;
        this.state = 'inited';
        this.tick = () => {
            let t = Date.now() - this.startTime;
            // let animations = this.animations.filter(animation => !animation.finished);

            for (let animation of this.animations) {
                let {object, template, property, start, end, duration, delay, timingFunction} = animation;
                let addTime = this.addTimes.get(animation);

                if (t < delay + addTime) {
                    continue;
                }
                let progression = timingFunction((t - delay - addTime) / duration);    // 0~1之间的数

                if (t > duration + delay + addTime) {
                    progression = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation);
                }

                let value = animation.valueFromProgression(progression);
                object[property] = template(value);
            }
            if (this.animations.size)
                this.requestID = requestAnimationFrame(this.tick);
            else
                this.requestID = null;
        }
    }

    pause() {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused';
        this.pauseTime = Date.now();
        if (this.requestID !== null) {
            cancelAnimationFrame(this.requestID);
            this.requestID = null;
        }
    }

    resume() {
        if (this.state !== 'paused') {
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    start() {
        if (this.state !== 'inited') {
            return;
        }
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    reset() {
        if (this.state === 'playing') {
            this.pause();
        }
        this.animations = new Set;
        this.finishedAnimations = new Set;
        this.addTimes = new Map;
        this.requestID = null;
        this.startTime = Date.now();
        this.pauseTime = null;
        // this.tick();
        this.state = 'inited';
    }

    restart() {
        if (this.state === 'playing') {
            this.pause();
        }
        // this.animations = new Set;
        // this.addTimes = new Map;

        for (let animation of this.finishedAnimations) {
            this.animations.add(animation);
        }
        this.finishedAnimations = new Set;
        this.requestID = null;
        this.state = 'playing';
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add(animation, addTime) {
        if (this.state === 'playing' && this.requestID === null) {
            this.tick();
        }

        if (this.state === 'playing') {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : (Date.now() - this.startTime));
        } else {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
        }
        this.animations.add(animation);
    }
}



export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction || ((start, end) => {
            return (t) => {
                return start + (t / duration) * (end - start)
            }
        })
    }
    valueFromProgression(progression) {
        return this.start + (this.end - this.start) * progression;
    }
}

export class ColorAnimation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction
        // || ((start, end) => {
        //     return (t) => {
        //         return start + (t / duration) * (end - start)
        //     }
        // })
    }
    valueFromProgression(progression) {
        return {
            r: this.start.r + (this.end.r - this.start.r) * progression,
            g: this.start.g + (this.end.g - this.start.g) * progression,
            b: this.start.b + (this.end.b - this.start.b) * progression,
            a: this.start.a + (this.end.a - this.start.a) * progression,
        };
    }
}
