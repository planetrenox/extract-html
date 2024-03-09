function downloadPageContent()
{
    const html = document.documentElement.outerHTML;
    const css = Array.from(document.styleSheets).map(sheet =>
    {
        try {
            return Array.from(sheet.cssRules).map(rule => rule.cssText).join('');
        }
        catch (e) {
            console.warn('Error accessing cssRules for stylesheet:', sheet.href);
            return '';
        }
    }).join('');

    const blob = new Blob([html, '<style>', css, '</style>'], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    a.click();
    URL.revokeObjectURL(url);
}

downloadPageContent();