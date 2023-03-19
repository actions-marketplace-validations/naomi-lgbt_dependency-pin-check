const { join } = require('path');
(async () => {
    let failed = false;
    const path = join(process.cwd(), 'package.json');
    const packageJson = require(path);
    const { devDependencies, dependencies } = packageJson;

    console.log(`Validating the following development dependencies:`)
    console.table(devDependencies);

    for (const [key, value] of Object.entries(devDependencies)) {
        if (/\^/.test(value) || /~/.test(value)) {
            console.warn(`devDependencies ${key} version is not fixed`);
            failed = true;
        }
    }

    console.log(`Validating the following dependencies:`)
    console.table(dependencies);

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