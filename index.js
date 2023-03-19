(async () => {
    let failed = false;
    const packageJson = require('./package.json');
    const { devDependencies, dependencies } = packageJson;

    for (const [key, value] of Object.entries(devDependencies)) {
        if (/"^/.test(value) || /"~/.test(value)) {
            console.warn(`devDependencies ${key} version is not fixed`);
            failed = true;
        }
    }

    for (const [key, value] of Object.entries(dependencies)) {
        if (/"^/.test(value) || /"~/.test(value)) {
            console.warn(`dependencies ${key} version is not fixed`);
            failed = true;
        }
    }

    if (failed) {
        process.exit(1);
    }
})();