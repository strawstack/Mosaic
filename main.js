(() => {

    function main() {

        const SIZE = 40;

        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");

        const { height, width } = document.body.getBoundingClientRect();

        canvas.height = height;
        canvas.width = width;
        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;

        function getColor() {

        }

        function getCellTopLeft({ x, y }) {
            return {
                x: Math.floor(x / SIZE) * SIZE,
                y: Math.floor(y / SIZE) * SIZE,
            };
        }

        function hash(pos) {
            return JSON.stringify(pos);
        }

        const filled = {};
        function drawBox({ x, y }, hex) {
            const h = hash({x, y});
            if (h in filled) return;
            filled[h] = true;

            ctx.fillStyle = hex;
            ctx.fillRect(x, y, SIZE, SIZE);
        }

        function getAdj(pos) {
            const adj = [
                { x: 0, y: -1},
                { x: 1, y: 0},
                { x: 0, y: 1},
                { x: -1, y: 0}
            ];
            const rtn = [];
            for (let {x, y} of adj) {
                const n = {
                    x: (Math.floor(pos.x / SIZE) + x) * SIZE,
                    y: (Math.floor(pos.y / SIZE) + y) * SIZE,
                };
                rtn.push(n);
            }
            return rtn;
        }

        // Draw adj boxes on click
        function clickEvent({ x, y }) {
            const pos = getCellTopLeft({x, y});
            const adj = getAdj(pos);
            drawBox(pos, getColor());
            for (let a of adj) {
                drawBox(a, getColor());
            }
        }

        // Click event on mouse down
        window.addEventListener("mousedown", e => {
            const m = {
                x: e.clientX,
                y: e.clientY
            };
            clickEvent(m);
        });

        // Init click event
        drawBox({
            x: 2 * SIZE + Math.random() * (width - 4 * SIZE),
            y: 2 * SIZE + Math.random() * (height - 4 * SIZE)
        }, getColor());

    }

    main();

})();