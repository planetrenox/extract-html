function downloadPageContent()
{
    const clone = document.documentElement.cloneNode(true);

    // Remove scripts
    const scripts = clone.getElementsByTagName('script');
    while (scripts.length > 0) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }

    // Remove comments
    const comments = clone.querySelectorAll('*');
    comments.forEach(node =>
    {
        node.childNodes.forEach(child =>
        {
            if (child.nodeType === Node.COMMENT_NODE) {
                node.removeChild(child);
            }
        });
    });

    // Remove hidden elements
    const hiddenElements = clone.querySelectorAll('[hidden], [style*="display:none"], [style*="display: none"]');
    hiddenElements.forEach(el => el.remove());

    // // Remove empty elements
    // const emptyElements = clone.querySelectorAll(':empty');
    // emptyElements.forEach(el => el.remove());

    // Remove non-visible elements
    const nonVisibleElements = clone.querySelectorAll('head, meta, link, style, script, noscript, title, base, param, source, track');
    nonVisibleElements.forEach(el => el.remove());

    // Remove data attributes
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el =>
    {
        Array.from(el.attributes).forEach(attr =>
        {
            if (attr.name.startsWith('data-')) {
                el.removeAttribute(attr.name);
            }
        });
    });

    // Remove inline event handlers
    allElements.forEach(el =>
    {
        Array.from(el.attributes).forEach(attr =>
        {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        });
    });

    const html = clone.outerHTML;
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