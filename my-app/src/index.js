import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);

//元素渲染
function tick() {
    const timeEle = (
        <div>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(timeEle, document.getElementById('time'));
}

setInterval(tick, 1000);

//自定义组件
function Welcome(props) {
    return <h1>欢迎你, {props.name}</h1>;
}

const diyEle = <Welcome name="小官" />;
ReactDOM.render(
    diyEle,
    document.getElementById('diyComponent')
);

//组件的组合嵌套
function ShowName(props) {
    return <h1>Hello, {props.name}</h1>;
}

function InClass() {
    return (
        <div>
            <ShowName name="光头强" />
            <ShowName name="熊大" />
            <ShowName name="熊二" />
        </div>
    );
}

ReactDOM.render(
    <InClass />,
    document.getElementById('xiongChuMo')
);

//用ES6定义类的方式创建组件，好处是ES6可以有更多的操作 State & 生命周期
class Clock extends React.Component {
    //constructor 是一个类构造函数 固定格式
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1>ES6封装的Clock类</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('clock')
);
