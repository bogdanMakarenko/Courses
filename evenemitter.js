/**
 * Created by Bogdan on 01.11.2017.
 */

'use strict';

class EventEmitter{
    constructor(){
        this.readers = {};
    }

    subscribe(type, fn){
        if(!this.readers[type]){
            this.readers[type] = [];
        }
        this.readers[type].push(fn);
    }

    unsubscribe(type, fn){
        let listeners = this.readers[type];
        let index = listeners.indexOf(fn);
        if(index > -1){
            this.readers[type] = listeners.splice(index, 1);
        }
    }

    notify(type, data){
        let listeners = this.readers[type];
        for(let i = 0; i < listeners.length; i++){
            listeners[i].call(this, data);
        }
    }
}

class Paper extends EventEmitter{
    constructor(title){
        super();
        this.title = title;
    }
}

class NewsReader{
    constructor(name, surname){
        this.name = name;
        this.surname = surname;
    }

    getNewsTitle(smt){
        console.log(` ${smt} `);
    };
}


function subscribeButton(paper, reader, type){
    paper.subscribe(type, reader.getNewsTitle);
}

function unsubscribeButton(paper, reader, type){
    paper.unsubscribe(type, reader.getNewsTitle);
}

// Create news portal and few readers
let times = new Paper('Times');
let kot = new NewsReader('kot', 'matroskin');
let dog = new NewsReader('dog', 'sharik');

subscribeButton(times, kot, 'food');
subscribeButton(times, dog, 'food');
subscribeButton(times, dog, 'hunt');

times.notify('food', 'SALE!!! Meat for 5$/kg ');
times.notify('hunt', 'New gun is know available!');

unsubscribeButton(times, dog, 'food');

times.notify('food', 'Milk only for 2$');