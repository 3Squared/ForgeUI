/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');

const REPORTS_FOLDER = 'coverage/both';
const FINAL_OUTPUT_FOLDER = 'coverage';

const run = (commands) => {
    commands.forEach((command) => execSync(command, { stdio: 'inherit' }));
};

// Create the reports folder and move the reports from cypress and vitest inside it
fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
    'coverage/cypress/coverage-final.json',
    `${REPORTS_FOLDER}/from-cypress.json`
);
fs.copyFileSync(
    'coverage/vitest/coverage-final.json',
    `${REPORTS_FOLDER}/from-vitest.json`
);


// Run "nyc merge" inside the reports folder, merging the two coverage files into one,
// then generate the final report on the coverage folder
run([
    // "nyc merge" will create a "coverage.json" file on the root, we move it to .nyc_output
    `nyc merge ${REPORTS_FOLDER} && ${process.platform === 'linux' ? 'mv' : 'move'} coverage.json .nyc_output/out.json`,
    `nyc report --reporter cobertura --all --report-dir ${FINAL_OUTPUT_FOLDER}`,
]);