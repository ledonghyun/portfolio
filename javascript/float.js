const canvasFloat = document.getElementById('canvas-float');

const skills = [
    'Html', 'Css', 'Scss', 'Javascript', 'Jquery', 'Adobe photoshop', 'Adobe illustrator'
    , 'React', 'Figma', 'Zeplin', 'Github'
];
const counts = [1,2,4,5,4,2,1];

const options = {
  tilt: Math.PI / 9,
  initialVelocityX: 0.7,
  initialVelocityY: 0.7,
  initialRotationX: Math.PI * 0.18,
  initialRotationZ: 0.1
};

sphere(canvasFloat, skills, counts, options);

$(window).resize(sphere(canvasFloat, skills, counts, options));

function sphere(canvas, skills, counts, options) {
    const pi = Math.PI; 
    const boxWid=$('.skill-box').width();
    const {
        width = boxWid/1.2,
        height = 470,
        radius = boxWid/6,
        fontSize = boxWid/38,
        tilt = 0,
        initialVelocityX = 0,
        initialVelocityY = 0,
        initialRotationX = 0,
        initialRotationZ = 0,
    } = options;
  
    let vx = initialVelocityX, vy = initialVelocityY;
    let rx = initialRotationX, rz = initialRotationZ;
  
    // canvas setup
    let ctx = canvas.getContext("2d"); 
    ctx.textAlign = 'center';
    
    // Hi-DPI support
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2,2); 

    // SCROLLING EFFECT
    let clicked = false, lastX, lastY;
    canvas.addEventListener('mousedown', event => {
        clicked = true;
        lastX = event.screenX;
        lastY = event.screenY;
    });
    canvas.addEventListener('mousemove', event => {
        if (!clicked) return;
        [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
        [lastX, lastY] = [event.screenX, event.screenY];

        // ROTATION UPDATE
        rz += -dy * 0.01;
        rx += dx * 0.01;

        // VELOCITY UPDATE
        vx = dx * 0.1;
        vy = dy * 0.1;

        if (!looping) startLoop();
        }
    );
    canvas.addEventListener('mouseup', e => clicked = false);
    canvas.addEventListener('mouseleave', e => clicked = false);
  
    function rot(x,y,t) {
        return [x*Math.cos(t)-y*Math.sin(t), x*Math.sin(t)+y*Math.cos(t)];
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ix = 0, iz = 0, i = 1;
        for (const skill of skills) {
            const degZ = (pi/(counts.length-1)) * iz;
            const degX = (2*pi/counts[iz]) * ix;
        

            let x = radius * Math.sin(degZ) * Math.cos(degX);
            let y = radius * Math.sin(degZ) * Math.sin(degX); 
            let z = radius * Math.cos(degZ) + 8*(ix % 2) /* randomness */;

            // camera transform
            [y,z] = rot(y, z, tilt);
            [x,z] = rot(x, z, rz);
            [x,y] = rot(x, y, rx);

            // convert to cartesian and then draw.
            const size = fontSize + 2 + 5*(x/radius);
            if (true) {
                ctx.fillStyle = `#fff`;
            }
            ctx.font = `${size}px "SF Pro Display", sans-serif`;
            ctx.fillText(skill, y + width/2, -z + height/2);

            ix--;
            if (ix < 0) {
                iz++;
                ix = counts[iz] - 1;
            }
        i++;
        }
    }

    // RENDER
    let looping = false;
    function rendererLoop() {
        if (looping) window.requestAnimationFrame(rendererLoop);
        render();
    
        // DEACCELATION
        if (vx > 0) vx = vx - 0.01;
        if (vy > 0) vy = vy - 0.01;
        if (vx < 0) vx = vx + 0.01;
        if (vy > 0) vy = vy + 0.01;
        if (vx == 0 && vy == 0) stopLoop();
        
        rz += vy * 0.01;
        rx += vx * 0.01;
    }

    function startLoop() {
        looping = true;
        window.requestAnimationFrame(rendererLoop);
    }

    function stopLoop() {
        looping = false;
    }
    startLoop();
}
