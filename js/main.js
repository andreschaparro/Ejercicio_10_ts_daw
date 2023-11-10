class ViewMainPage {
    constructor(myf) {
        this._myf = myf;
    }
    showDevices(list) {
        let devicesUl = this._myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1") {
                checkedStr = "checked";
            }
            switch (list[i].type) {
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
class Main {
    constructor() {
        this._counter = 0;
    }
    handleEvent(evt) {
        this._counter++;
        let btn = this._myf.getElementByEvent(evt);
        btn.textContent = `click: ${this._counter}`;
    }
    handleGETResponse(status, response) {
        console.log(`Llego status ${status} response: ${response}`);
        if (status == 200) {
            let data = JSON.parse(response);
            this.view.showDevices(data);
        }
    }
    main() {
        this._myf = new MyFramework();
        this.view = new ViewMainPage(this._myf);
        let b = this._myf.getElementById("boton");
        console.log(b);
        b.textContent = "Haceme click!";
        b.addEventListener("click", this);
        this._myf.requestGET("Devices.txt", this);
    }
}
window.onload = () => {
    let m = new Main();
    m.main();
};
