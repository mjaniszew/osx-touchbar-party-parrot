const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');

const {TouchBarButton} = TouchBar;

const numOfParrotsToDisplay = 4;
const parrots = [];

const initParrots = () => {
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        parrots.push(new TouchBarButton({
            icon: path.join(__dirname, '/parrot/congaparrot000.png'),
            backgroundColor: '#000'
        }));
    }
    return parrots;
};

const touchBar = new TouchBar(initParrots());

let parrotFrame = 0;

const updateParrotsFrames = () => {
    if (parrotFrame > 9) {
        parrotFrame = 0;
    } else {
        parrotFrame += 1;
    }

    const parrotPath = path.join(__dirname, `/parrot/congaparrot00${parrotFrame}.png`);
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        parrots[x].icon = parrotPath;
    }
}

const animateParrots = () => {
    setInterval(updateParrotsFrames, 30)
};

let window;

app.once('ready', () => {
    window = new BrowserWindow({
        width: 200,
        height: 200
    });
    window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
    window.setTouchBar(touchBar);
    animateParrots();
})

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
    app.quit();
});
