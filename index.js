const { join } = require('path');
(async () => {
    let failed = false;
    const path = join(process.cwd(), 'package.json');
    const packageJson = require(path);
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