export function enableGesture(element) {
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol('mouse');

    if (document.ontouchstart !== null) {
        element.addEventListener('mousedown', (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseend);
            }
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseend);
        });
    }


    element.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    });
    element.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    });
    element.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });
    // 屏幕弹窗 手指被识别为系统手势之类的系统导致touch结束的监听事件
    element.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });


    // tap 
    // pan - panstart panmove panend 
    // flick 
    // press - pressstart pressend


    let start = (point, context) => {
        element.dispatchEvent(Object.assign(new CustomEvent('start'), {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }));
        context.startX = point.clientX, context.startY = point.clientY;
        context.moves = [];
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;

        context.timeoutHandler = setTimeout(() => {
            // pan 的优先级较 press 高
            if (context.isPan) {
                return;
            }
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;

            // console.log('press start');
            element.dispatchEvent(new CustomEvent('pressstart', {}));
        }, 500);
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        
        if (context.isPan) {
            // console.log('pan move');
            let e = new CustomEvent('pan', );
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            });
            element.dispatchEvent(e);

            context.moves.push({
                dx, dy,
                t: Date.now()
            });
            context.moves = context.moves.filter(record => Date.now() - record.t < 300);
        } else if (dx**2 + dy**2 > 100) {
            if (context.isPress) {
                // console.log('press cancel');
                element.dispatchEvent(new CustomEvent('presscancel', {}));
            }
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;

            // console.log('pan start');
            element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }));
        }
    }

    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX;
            let dy = point.clientY - context.startY;
            let lastPoint = context.moves[0];
            let speed = Math.sqrt((lastPoint.dx - dx) ** 2 + (lastPoint.dy - dy) ** 2) / (Date.now() - lastPoint.t);
            let isFlick = speed > 2.5;

            if (isFlick) {
                // console.log('flick',speed);
                element.dispatchEvent(Object.assign(new CustomEvent('flick'), {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed,
                }));
            }
            // console.log('pan end');
            element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed,
            }));
        }
        if (context.isTap) {
            // console.log('tap');
            element.dispatchEvent(new CustomEvent('tap', {}));
        }
        if (context.isPress) {
            // console.log('press')
            element.dispatchEvent(new CustomEvent('pressend', {}));
        }
        clearTimeout(context.timeoutHandler);
    }

    let cancel = (point, context) => {
        element.dispatchEvent(new CustomEvent('canceled', {}));
        // console.log('cancel')
        clearTimeout(context.timeoutHandler);
    }
}