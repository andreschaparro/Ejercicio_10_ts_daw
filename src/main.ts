interface DeviceInt {
    id: string;
    name: string;
    description: string;
    state: string;
    type: string;
}

class ViewMainPage {
    private _myf:MyFramework;

    constructor(myf:MyFramework) {
        this._myf = myf;
    }

    showDevices(list: DeviceInt[]):void {
        let devicesUl:HTMLElement = this._myf.getElementById("devicesList");
        let items:string = "";
        for(let i in list) {
            let checkedStr:string = "";
            if(list[i].state == "1") {
                checkedStr = "checked";
            }
            switch(list[i].type)
            {
                case "0":
                    items += `<li class="collection-item avatar">
                                <img src="images/lightbulb.png" alt="" class="circle">
                                <span class="title">${list[i].name}</span>
                                <p>${list[i].description}</p>
                                <div class="secondary-content switch">
                                    <label>
                                        Off
                                        <input type="checkbox" id="dev_${list[i].id}" ${checkedStr}>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                </div>
                            </li>`;
                    break;
                case "1":
                    items += `<li class="collection-item avatar">
                                <img src="images/window.png" alt="" class="circle">
                                <span class="title">${list[i].name}</span>
                                <p>${list[i].description}</p>
                                <div class="secondary-content switch">
                                    <label>
                                        Off
                                        <input type="checkbox" id="dev_${list[i].id}" ${checkedStr}>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                </div>
                            </li>`;
                    break;
                default:
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
}

class Main implements EventListenerObject, GETResponseListener {
    private _myf:MyFramework;
    private _counter:number = 0;
    private view:ViewMainPage;

    handleEvent(evt:Event): void {
        this._counter++;
        let btn:HTMLElement = this._myf.getElementByEvent(evt);
        btn.textContent = `click: ${this._counter}`;
    }

    handleGETResponse(status:number, response:string): void {
        console.log(`Llego status ${status} response: ${response}`);
        if(status == 200) {
            let data:DeviceInt[] = JSON.parse(response);
            this.view.showDevices(data);
        }
    }

    main(): void {
        this._myf = new MyFramework();
        this.view = new ViewMainPage(this._myf);
        let b:HTMLElement = this._myf.getElementById("boton");
        console.log(b);
        b.textContent = "Haceme click!";
        b.addEventListener("click", this);
        this._myf.requestGET("Devices.txt", this);
    }
}

window.onload = () => {
    let m:Main = new Main();
    m.main();
};