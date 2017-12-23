let h = 0;
for (let i = 0; i <= 1000; i++) {
    const b = 105700 + i * 17;

    let f = 1;

    for (let d = 2; d <= b; d++) {
        for (let e = Math.floor(b / d); d * e <= b; e++) {
            if (e < 2) continue;
            if (d * e === b) f = 0;
        }
    }

    if (f === 0) h++;
}

console.log(h);