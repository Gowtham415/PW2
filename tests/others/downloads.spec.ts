import { test } from '../../fixtures/fixtures'

test.skip('Downloads Example', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Download file').click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('/path/to/save/at/' + download.suggestedFilename());
})


test.skip('Upload files', async ({ page }) => {
    // Select one file
    // await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));

    // // Select multiple files
    // await page.getByLabel('Upload files').setInputFiles([
    //     path.join(__dirname, 'file1.txt'),
    //     path.join(__dirname, 'file2.txt'),
    // ]);

    // // Select a directory
    // await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir'));

    // // Remove all the selected files
    // await page.getByLabel('Upload file').setInputFiles([]);


})

