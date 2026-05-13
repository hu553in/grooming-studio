(function () {
  function buildSrc(type, options) {
    const proto = window.location.protocol === 'https:' ? 'https:' : 'http:';
    return (
      proto +
      '//widgets.2gis.com/widget?type=' +
      type +
      '&options=' +
      encodeURIComponent(JSON.stringify(options))
    );
  }

  function createIframe(opts) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.width = opts.width;
    iframe.height = opts.height;
    iframe.src = opts.src;
    return iframe;
  }

  window.DGWidgetLoader = function (config) {
    config.containerNode.innerHTML = '';
    config.containerNode.appendChild(
      createIframe({
        width: config.width.toString(),
        height: config.height.toString(),
        src: buildSrc('firmsonmap', {
          pos: config.pos,
          opt: config.opt,
          org: config.org.join(','),
        }),
      })
    );
  };
})();
