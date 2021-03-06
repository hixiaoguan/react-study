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
    //ES6 生命周期方法->挂载 componentDidMount 是 组件第一次加载到DOM中的时候执行
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick2(),
            1000
        );
    }
    //ES6 生命周期方法->卸载 componentWillUnmount 是 组件从DOM中移除的时候执行
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    //类中的方法
    tick2() {
        //使用 this.setState() 来更新组件局部状态
        this.setState({
            date: new Date()
        });
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

//React 的事件绑定 注意与普通JS的区别
function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        alert('你点击了我');
    }

    return (
        <a onClick={handleClick}>
           React 点击事件绑定 Click me
    </a>
    );
}

ReactDOM.render(
    <ActionLink />,
    document.getElementById('actionLink')
);

//React 事件又一个复杂一点的栗子
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        // 回调用法 这样可以将点击事件事 传递 参数 this 给handleClick方法
        // 这里有点像加了个监听addEventListener的感觉
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('toggle')
);

//React 条件渲染
function UserGreeting(props) {
    return <h1>欢迎回来!</h1>;
}

function GuestGreeting(props) {
    return <h1>请先登录.</h1>;
}
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('greet')
);

//元素变量
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
    </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
    </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('loginControl')
);

/**
 * 与运算符 && 更简洁的 条件判断
 * 在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。
 */
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>与运算符 && 更简洁的 条件判断!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
        </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('messages')
);

//阻止组件渲染
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('page')
);
//React 多组件渲染
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('moreCompoent')
);

//React 表单
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('nameForm')
);
//状态提升
function BoilingVerdict(props) {
    var openNum = 100;
    var sName = '摄氏度';
    var red = '#ff0000';
    var dushu = props.celsius;
    if (!props.celsius){
        dushu = 0;
    }
    if (props.scale === 'f'){
        openNum = 212;
        sName = '华氏度';
    }
    if (props.celsius >= openNum) {
        return <p>{props.celsius} {sName}水<span style={{color:red}}>会</span>烧开</p>;
    }
    return <p>{dushu} {sName}水<span style={{ color: red }}>不会</span>烧开</p>;
}
//抽离出来的子组件
const scaleNames = {
    c: '摄氏度',
    f: '华氏度'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' };
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>请输入 {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict
                    celsius={parseFloat(temperature)} 
                    scale={scale}
                    />
            </fieldset>
        );
    }
}
//被提升为父组件
class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('statusUp')
);
/**
 * 组合 vs 继承
 * React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。
 */
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="red">
            <h1 className="Dialog-title">
                Welcome
      </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
      </p>
        </FancyBorder>
    );
}

ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('dialog')
);

// 常用用法
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog2() {
    return (
        <Dialog
            title="Welcome2"
            message="Thank you for visiting our spacecraft2!" />

    );
}

ReactDOM.render(
    <WelcomeDialog2 />,
    document.getElementById('dialog2')
);

/**
 * 布局组件化 - 实例
 */
function Contacts() {
    return <div className="Contacts" > Left </div>;
}

function Chat() {
    return <div className="Chat"> Right </div>;
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Layout() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}

ReactDOM.render(
    <Layout />,
    document.getElementById('layout')
);
